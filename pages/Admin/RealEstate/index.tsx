import { useState, useEffect, useContext } from "react";
import { AdminLayout } from "../../../layout";
import axios from "axios";
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
  faUsers,
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getRealEstateApi } from "../../../api";
import { property, room,meterage,assignment,advertisingStatus } from "../../../lib/enum-converter"
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
  const [realEstateList, setRealEstateList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalObj, setModalObj] = useState(null);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [meter, setMeter] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [AdStatus, setAdStatus] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [articleImage, setArticleImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [idA, setIdA] = useState(0);

  let searchTimeOut = null;

  useEffect(() => {
    getRealEstate();
  }, []);

  function getRealEstate() {
    setShowLoading(true);
    axios.get(getRealEstateApi).then((res) => {
        setRealEstateList(res.data);
        if (res.status === 200) {
          setShowLoading(false);
          console.log(realEstateList);
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
      getRealEstate();
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
      city,
      media: articleImage,
    };
    if (idA != 0) {
      object = { ...object, id: idA };
    }
    axios
      .post("/api/article", object, {
        headers: {
          Authorization: `${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setModalShow(false);
        getRealEstate();
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
    setCity("");
    setArticleImage(null);
    setSelectedImage("");
    setIdA(0);
  }

  function search(value, field, searchTableName) {
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(() => {
      axios
        .getRealEstate(`/api/${searchTableName}/search?text=` + value)
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
      console.log(selectedImage);
      setTitle(obj.title);
      setSummary(obj.summary);
      setCity(obj.city);
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
  return (
    <AdminLayout>
      <div className="p-2 pt-5">
        <h2>
          آگهی‌ها
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
          <Form.Group className="mb-3">
            <Form.Label>عنوان</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="summary">
            <Form.Label>شهر</Form.Label>
            <Form.Control
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="summary">
            <Form.Label>محدوده</Form.Label>
            <Form.Control
              onChange={(e) => setArea(e.target.value)}
              value={area}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="summary">
            <Form.Label>تعداد اتاق</Form.Label>
            <Form.Control
              onChange={(e) => setRoomCount(e.target.value)}
              value={roomCount}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="summary">
            <Form.Label>تعداد اتاق</Form.Label>
            <Form.Control
              onChange={(e) => setRoomCount(e.target.value)}
              value={roomCount}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="text">
            <Form.Label>شماره تماس</Form.Label>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>تعداد اتاق</Form.Label>
            <Form.Control
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder="نام را وارد کنید..."
            />
          </Form.Group>

          <Form.Group className="mb-3 text-center">
            <p className="f-14 text-right">تصویر اصلی</p>
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
                {!articleImage ? (
                  selectedImage ? (
                    <img
                      src={selectedImage}
                      value={selectedImage}
                      width={200}
                    />
                  ) : (
                    <div className="border border-rounded p-5 text-center">
                      <span>آپلود عکس</span>
                    </div>
                  )
                ) : selectedImage ? (
                  <img src={selectedImage} value={selectedImage} width={200} />
                ) : (
                  <img
                    src={"/uploads/articles/" + articleImage}
                    value={selectedImage}
                    width={200}
                  />
                )}
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
                      <th>شهر</th>
                      <th>محدوده</th>
                      <th>نوع ملک</th>
                      <th>تعداد اتاق</th>
                      <th>متراژ</th>
                      <th>نوع واگذاری</th>
                      <th>قیمت</th>
                      <th>شماره تماس</th>
                      <th>توضیحات</th>
                      <th>نمایش</th>
                      <th>وضعیت آگهی</th>
                      <th>تصویر اصلی</th>
                      <th>زمان ایجاد</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {realEstateList?.map((data, i) => {
                      let active = (
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          className="text-danger"
                          fixedWidth
                        />
                      );

                      if (data.isActive == true)
                        active = (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-success"
                            fixedWidth
                          />
                        );

                      return (
                        <tr key={data.id} className="align-middle">
                          <td className="d-none">{data.id}</td>

                          <td className="text-center">{++i}</td>
                         
                          <td>
                          {data.name}
                          </td>
                          <td>
                          {data.cityArea.name}
                          </td>
                          <td>
                          {data.areaName}
                          </td>
                          <td>
                          { property(data.type)}
                          </td>
                          <td>
                          {room(data.roomCount)}
                          </td>
                          <td>
                          {meterage(data.meter)}
                          </td>
                          <td>
                          {assignment(data.assignmentType)}
                          </td>
                          <td>
                          {data.price}
                          </td>
                          <td>
                          {data.phoneNumber}
                          </td>
                          <td>
                          {data.description}
                          </td>
                          <td>
                          {active}
                          </td>
                          <td>
                          {advertisingStatus(data.AdStatus)}
                          </td>

                          <td>
                            <img
                              src={"/uploads/articles/" + data}
                              width={120}
                            />
                 
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
