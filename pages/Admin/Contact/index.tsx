import { useState, useEffect, useContext } from "react";
import { AdminLayout } from "../../../layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { context } from "../../../context";
import FormModal from "../../../components/modal";
import { Form, Card, Dropdown } from "react-bootstrap";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default () => {

  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  const { setShowLoading } = useContext(context);
  const [messageList, setMessageList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [idForm, setIdForm] = useState(0);


  useEffect(() => {
    getContactForm();
  }, []);


  function getContactForm() {
    setShowLoading(true);
    axios
      .get("/api/contactForm")
      .then((res) => {
        setMessageList(res.data);
        if (res.status === 200) {
          setShowLoading(false);
        
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
    axios.delete("/api/contactForm/remove?id=" + data.id).then((res) => {
      getContactForm();
    });
  }

  function upsert() {
    let object = {
      title,
      fullName,
      email,
      description,

    };
    if (idForm != 0) {
      object = { ...object, id: idForm };
    }
    axios
      .post("/api/contactForm/post", object)
      .then((res) => {
        setModalShow(false);
        getContactForm();
        reset();
      })
      .catch((err) => {
        if (err.response) {
          toast.error("مشکلی پیش آمده است !");
        } else {
          toast.error("مشکلی پیش آمده است !");
        }
      });
  }

  function reset() {
    setTitle("");
    setFullName("");
    setDescription("");
    setEmail("");
    setIdForm(0);
  }



  function openDialoge(obj) {
    if (obj) {
      setTitle(obj.title);
      setFullName(obj.fullName);
      setDescription(obj.description);
      setEmail(obj.email);
      setIdForm(obj.id);
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
           پیام‌ها
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
        title="پیام"
      >
        <Form dir="rtl" name="submitForm" id="submitForm">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>عنوان</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>نام و نام‌خانوادگی</Form.Label>
            <Form.Control
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>توضیحات</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              as="textarea"
              rows={5}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> ایمیل</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
          </Form.Group>

        </Form>
      </FormModal>

      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>پیام‌ها</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center"></th>
                      <th>عنوان</th>
                      <th>نام و نام‌خانوادگی</th>
                      <th>توضیحات</th>
                      <th>ایمیل</th>
                      <th>زمان ایجاد</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messageList?.map((data,i) => {
                      return (
                        <tr key={data.id} className="align-middle">
                          <td className="d-none">{data.id}</td>

                          <td className="text-center">{++i}</td>
                          <td>
                            <p>{data.title}</p>
                          </td>
                          <td>
                            <p>
                              {data.fullName}
                            </p>
                          </td>
                          <td>
                            <p>
                              {data.description}
                            </p>
                          </td>
                          <td>
                            <p>
                              {data.email}
                            </p>
                          </td>
                      
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
