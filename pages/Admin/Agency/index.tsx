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
import {
  faEllipsisVertical,
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getAgencyInfoApi } from '../../../api';

export default () => {

  const { setShowLoading } = useContext(context);
  const [agencyList, setAgencyList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agencyImage, setAgencyImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cityArea, setCityArea] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [realEstate, setRealEstate] = useState(0);
  const [agents, setAgents] = useState(0);
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const [idForm, setIdForm] = useState(0);
  const [isActiveOn, setIsActiveOn] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(false);

  const onSwitchAction = () => {
    setIsActiveOn(!isActiveOn);
  };

  useEffect(() => {
    getAgencyInfo();
  }, []);


  function getAgencyInfo() {
    setShowLoading(true);
    axios
      .get(getAgencyInfoApi)
      .then((res) => {
        setAgencyList(res.data);
        console.log(res.data);
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
      getAgencyInfo();
    });
  }

  function upsert() {
    let object = {
      title,
      name,
      email,
  

    };
    if (idForm != 0) {
      object = { ...object, id: idForm };
    }
    axios
      .post("/api/contactForm/post", object)
      .then((res) => {
        setModalShow(false);
        getAgencyInfo();
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
    setName("");
    setEmail("");
    setIdForm(0);
  }



  function openDialoge(obj) {
    if (obj) {
      setTitle(obj.title);
      setName(obj.name);
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
           آژانس ها
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
            <Form.Label>نام آژانس</Form.Label>
            <Form.Control
              onChange={(e) => setٔName(e.target.value)}
              value={title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>نام مدیر</Form.Label>
            <Form.Control
              onChange={(e) => setFirstName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>نام‌خانوادگی مدیر</Form.Label>
            <Form.Control
              onChange={(e) => setLastName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>نام محله</Form.Label>
            <Form.Control
              onChange={(e) => setCityArea(e.target.value)}
              value={name}
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
                      <th>نام آزانس</th>
                      <th>عکس</th>
                      <th>نام مدیر</th>
                      <th>محله</th>
                      <th>تعداد کارشناس</th>
                      <th>تعداد املاک</th>
                      <th>امیتاز</th>
                      <th>شماره تماس</th>
                      <th>نقشه</th>
                      <th>زمان ایجاد</th>
                      <th className="text-center">وضعیت</th>
                      <th>احراز هویت</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agencyList?.map((data,i) => {
                                let active = (
                                  <FontAwesomeIcon
                                    icon={faXmarkCircle}
                                    className="text-danger"
                                    fixedWidth
                                  />
                                );
                                let status = active;
          
                                if (data.status == true)
                                  active = (
                                    <FontAwesomeIcon
                                      icon={faCheckCircle}
                                      className="text-success"
                                      fixedWidth
                                    />
                                  );
                                if (data.isActive == true)
                                status = (
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
                          <td>{data.name}</td>
                          <td>
                            <img src={"/uploads/articles/" +  data.agencyImage} />
                          </td>
                 
                          <td>
                            <p>
                              {data.owner.firstName} {data.owner.lastName}
                            </p>
                          </td>
                          {/* <td>{data.agents}</td>
                          <td>{data.RealEstate}</td>
                          <td>{data.rate}</td>
                          <td>{data.phoneNumber}</td> */}
                          <td className="text-center">{active}</td>
                          <td className="text-center">{status}</td>
                      
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
