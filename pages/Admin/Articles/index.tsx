import { useState, useEffect, useContext } from "react";
import { AdminLayout } from "../../../layout";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { context } from "../../../context";
import FormModal from "../../../components/modal";
import { Form, Card, Dropdown } from "react-bootstrap";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

export default () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  const { setShowLoading } = useContext(context);
  const [articleList, setarticleList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalObj, setModalObj] = useState(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [normalName, setNormalName] = useState("");
  const [articleImage, setArticleImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [idA, setIdA] = useState("");

  let searchTimeOut = null;

  useEffect(() => {
    getArticle({});
  }, []);

  function getFilters() {
    return "";
  }

  function getArticle(filters) {
    setShowLoading(true);
    axios
      .get("/api/article" + getFilters())
      .then((res) => {
        setarticleList(res.data);
        if (res.status === 200) {
          setShowLoading(false);
          // setPageCount(res.data.count / itemsPerPage)
        }
      })
      .catch((err) => {
        if (err.response?.data) {
          err?.response?.data?.errors?.map((issue) => toast.error(issue));
        } else {
          toast.error("مشکلی پیش آمده است !");
        }
        setShowLoading(false);
      });
  }

  function remove(data) {
    axios.delete("/api/article?id=" + data.id).then((res) => {
      getArticle({});
    });
  }

  function upsert() {
    if (title == "") {
      return toast.error("لطفا عنوان را وارد کنید!");
    }
    if (!editorState.getCurrentContent().hasText()) {
      return toast.error("لطفا محتوا را وارد کنید!");
    }
    if (selectedImage == "") {
      return toast.error(" تصویر مقاله را انتخاب کنید!");
    }
    let object = {
      title,
      summary,
      text: convertedContent,
      normalName,
      media: articleImage,
    };
    if (idA != 0) {
      object = { ...object, id: idA };
    }
    axios
      .post("/api/article", object, {
        headers: {
          'Authorization': `${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
          Accept: 'application/json',
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setModalShow(false);
        getArticle({});
        reset();
      })
      .catch((err) => {
        if (err.response) {
          // err?.response?.data?.errors?.map((issue) => toast.error(issue));
          toast.error("مشکلی پیش آمده است !");
          console.log(err.response);
        } else {
          toast.error("مشکلی پیش آمده است !");
        }
      });
  }

  function reset() {
    setTitle("");
    setSummary("");
    setEditorState(EditorState.createEmpty());
    setNormalName("");
    setArticleImage(null);
    setSelectedImage("");
    setIdA("");
  }

  function search(value, field, searchTableName) {
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(() => {
      axios
        .getArticle(`/api/${searchTableName}/search?text=` + value)
        .then((res) => {
          console.log(res.data);
          eval(`
                    set${field}SearchList(res.data)
                `);
        });
    }, 1000);
  }


  function openDialoge(obj) {
    if (obj) {
      // console.log(obj)
      console.log(selectedImage)
      setTitle(obj.title);
      setSummary(obj.summary);
      setNormalName(obj.normalName);
      setArticleImage(obj.articleImage);
      setSelectedImage(obj.selectedImage);
       setEditorState(EditorState.createWithContent(convertFromHTML(obj.text)));
      setIdA(obj.id);
    }
    setModalShow(true);
  }
  function closeDialoge() {
    reset();
    setModalShow(false);
  }
  

  // const uploadCallback = (file, callback) => {
  //   console.log(file);
  //   return new Promise((resolve, reject) => {
  //     const reader = new window.FileReader();
  //     console.log(reader);
  //     reader.onloadend = async () => {
  //       const form_data = new FormData();
  //       form_data.append("file", file);
  //       const res = await uploadFile(form_data);
  //       setValue("thumbnail", res.data);
  //       resolve({ data: { link: process.env.REACT_APP_API + res.data } });
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const config = {
  //   image: { uploadCallback: uploadCallback },
  // };

  return (
    <AdminLayout>
      <div className="p-2 pt-5">
        <h2>
          مقاله ها
          <button
            className="btn btn-success me-3 f-20 fw-bold"
            onClick={() => openDialoge()}
          >
            +
          </button>
        </h2>
      </div>
      <FormModal
        show={modalShow}
        onCancel={() => closeDialoge()}
        func={upsert}
        title="مقاله"
      >
        <Form dir="rtl" name="submitForm" id="submitForm">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>عنوان</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="عنوان را وارد کنید..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="summary">
            <Form.Label>خلاصه (توضیحات)</Form.Label>
            <Form.Control
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
              as="textarea"
              rows={2}
              placeholder="خلاصه را وارد کنید..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="text">
            <Form.Label>محتوا</Form.Label>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              // toolbar={config}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="normalName">
            <Form.Label>نرمال نیم</Form.Label>
            <Form.Control
              onChange={(e) => setNormalName(e.target.value)}
              value={normalName}
              placeholder="نام را وارد کنید..."
            />
          </Form.Group>

          <Form.Group className="mb-3 text-center">
            <p className="f-14 text-right">تصویر مقاله</p>
            <Form.Label className="w-50">
              <Form.Control
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setArticleImage(file);
                  }
                }}
                // value={articleImage}
                multiple
                accept="image/*"
                type="file"
                hidden={true}
              />

              <div className="d-flex justify-content-center">
                {!articleImage?(
                       selectedImage ? (
                        <img src={selectedImage} value={selectedImage} width={200} />
                      ) : (
                        <div className="border border-rounded p-5 text-center">
                          <span>آپلود عکس</span>
                        </div>
                      )
                ):(
                  selectedImage ? (
                    <img src={selectedImage} value={selectedImage} width={200} />
                    
                  ) : (
                    <img src={"/uploads/articles/" + articleImage} value={selectedImage} width={200} />
                  )
               
                   
                    
                
                )
                
           
              
              }
         
              </div>
            </Form.Label>
          
          </Form.Group>
        </Form>
      </FormModal>

      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>مقالات</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center"></th>
                      <th>عنوان</th>
                      <th>خلاصه</th>
                      <th>تصویر مقاله</th>
                      <th>محتوا</th>
                      
                      <th>زمان ایجاد</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articleList?.map((data, i) => {
                      // let active = (
                      //   <FontAwesomeIcon
                      //     icon={faXmarkCircle}
                      //     className="text-danger"
                      //     fixedWidth
                      //   />
                      // );

                      // if (data.status == true)
                      //   active = (
                      //     <FontAwesomeIcon
                      //       icon={faCheckCircle}
                      //       className="text-success"
                      //       fixedWidth
                      //     />
                      //   );

                      return (
                        <tr key={data.id} className="align-middle">
                          <td className="d-none">{data.userId}</td>

                          <td className="text-center">{++i}</td>
                          <td>
                            <p>{data.title}</p>
                          </td>
                          <td>
                            <p>{data.summary.split(' ').slice(0, 10).join(' ')}</p>
                          </td>

                         

                          <td>
                          <Image
                            width={128}
                            height={128}
                              src={"/uploads/articles/" + data.articleImage}
                            alt="user@email.com"
                          />
                           {/* <img
                              src={"/uploads/articles/" + data.articleImage}
                              width={120}
                              alt={data.title}
                            /> */}
                          </td>
                          <td dangerouslySetInnerHTML={{ __html: data.text.split(' ').slice(0, 20).join(' ') }} />
                          <td>
                            <span>{data.createdAt}</span>
                          </td>
                          <td className="text-start">
                            <Dropdown align="end">
                              <Dropdown.Toggle
                                as="button"
                                bsPrefix="btn"
                                className="btn-link rounded-0 text-black-50 shadow-none p-0"
                                id="action-user1"
                              >
                                <FontAwesomeIcon
                                  fixedWidth
                                  icon={faEllipsisVertical}
                                />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  className="text-success text-end"
                                  onClick={() => {
                                    openDialoge(data);
                                  }}
                                >
                                  ویرایش
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="text-danger text-end"
                                  href="#/action-3"
                                  onClick={() => {
                                    remove(data);
                                  }}
                                >
                                  حذف
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <ToastContainer position="top-left" rtl={true} theme="colored" />
    </AdminLayout>
  );
};
