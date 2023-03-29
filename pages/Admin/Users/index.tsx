import { useState, useEffect, useContext, useCallback } from "react";
import { AdminLayout } from "../../../layout";
import axios from "axios";
import { context } from "../../../context";
import FormModal from "../../../components/modal";
import PromptModal from "../../../components/PromptModal";
import { Form, Card, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faUsers,
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { getUsersApi, upsertUser,removeUser } from "../../../api";
import {
  property,
  room,
  meterage,
  assignment,
  advertisingStatus,
  roleFun
} from "../../../lib/enum-converter";
import moment from 'jalali-moment';
export default () => {
  const { setShowLoading } = useContext(context);
  const [userList, setuserList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrompt, setModalShowPrompt] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [address, setAddress] = useState("");
  const [userImage, setUserImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");
  const [role, setRole] = useState("normal");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [userId, setUserId] = useState("");
  const [delId, setDelId] = useState("");
  const [delName, setDelName] = useState("کاربر انتخابی");

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    setShowLoading(true);
    axios
      .get(getUsersApi)
      .then((res) => {
        setuserList(res.data);
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

  function remove() {
    axios.delete(`${removeUser}?id=` + delId).then((res) => {
      setModalShowPrompt(false)
      getUsers();
      setDelId("")
    });
  }

  function upsert() {
    if (firstName == "") {
      return toast.error("لطفا نام را وارد کنید!");
    }
    if (lastName == "") {
      return toast.error("لطفا نام خانوادگی را وارد کنید!");
    }
    if (name == "") {
      return toast.error("لطفا نام کاربری را وارد کنید!");
    }
    if (email == "") {
      return toast.error("لطفا  ایمیل را وارد کنید!");
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
      return toast.error("لطفا ایمیل صحیح را وارد کنید!")
    }
    if (phoneNumber == "") {
      return toast.error("لطفا شماره موبایل را وارد کنید!");
    }
    if (phoneNumber.length != 11) {
      return toast.error("لطفا شماره صحیح  وارد کنید!");
    }
    if (selectedImage == "") {
      return toast.error(" تصویر مقاله را انتخاب کنید!");
    }
    
      let object = {
        firstName,
        lastName,
        name,
        email,
        phoneNumber,
        nationalCode,
        address,
        role,
        media: userImage,
        isActive: isSwitchOn,
      };
      if (userId != "") {
        object = { ...object, id: userId };
      }
      axios.post(upsertUser, object, {
        headers: {
          Authorization: `${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        setModalShow(false);
        getUsers();
        reset();
      });
    
  }

  function reset() {
    setFirstName(""),
    setLastName(""),
    setName(""),
    setEmail(""),
    setPhoneNumber("");
    setNationalCode("");
    setAddress(""),
    setRole("normal"),
    setUserId("");
     setUserImage<File>();
    setSelectedImage("");
  }

  function openDialoge(obj) {
    if (obj) {
        setFirstName(obj.firstName),
        setLastName(obj.lastName),
        setName(obj.name),
        setEmail(obj.email),
        setPhoneNumber(obj.phoneNumber);
        setNationalCode(obj.nationalCode);
        setAddress(obj.address),
         setRole(obj.role),
      setUserId(obj.id);
    }
    setModalShow(true);
  }
  function closeDialoge() {
    reset();
    setModalShow(false);
  }
  function openModalPrompt(){
    setModalShowPrompt(true)
  }
  function closeModalPrompt(){
    setModalShowPrompt(false);

  }

  return (
    <AdminLayout>
      <div className="p-2 pt-5">
        <h2>
          کاربران
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
        title="کاربران"
      >
        <Form.Group className="mb-3">
          <Form.Label>نام</Form.Label>
          <Form.Control
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>نام‌خانوادگی</Form.Label>
          <Form.Control
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>نام‌کاربری</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>
 
        <Form.Group className="mb-3">
          <Form.Label>نقش</Form.Label>

          <Form.Select
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="normal">کاربر عادی</option>
            <option value="agencyAgent">کارشناس املاک</option>
            <option value="agencyOwner">مدیراملاک</option>
            <option value="admin">مدیر وب سابت</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>شماره تماس</Form.Label>
          <Form.Control
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            type="number"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>کدپستی</Form.Label>
          <Form.Control
            onChange={(e) => setNationalCode(parseInt(e.target.value))}
            value={nationalCode}
            type="number"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>آدرس</Form.Label>
          <Form.Control
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            as="textarea" rows={2}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            className="d-flex flex-column-reverse"
            type="switch"
            onChange={onSwitchAction}
            checked={isSwitchOn}
            label="وضعیت"
          />
        </Form.Group>
        <Form.Group className="mb-3 text-center">
            <p className="f-14 text-right">پروفایل</p>
            <Form.Label className="w-50">
              <Form.Control
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setUserImage(file);
                  }
                }}
      
                multiple
                accept="image/*"
                type="file"
                hidden={true}
              />

              <div className="d-flex justify-content-center">
                {!userImage?(
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
                    <img src={"/uploads/articles/" + userImage} value={selectedImage} width={200} />
                  )
                )
                
              }
         
              </div>
            </Form.Label>
          
          </Form.Group>
      </FormModal>


        <PromptModal
        show={modalShowPrompt}
        onCancel={() => closeModalPrompt()}
        func={remove}
        title="حذف کاربر"
        >
        <p>آیا <span className="badge bg-danger">{delName}</span> انتخابی  حذف گردد؟</p>
        </PromptModal>
      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>کاربرها</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">
                        <FontAwesomeIcon icon={faUsers} fixedWidth />
                      </th>
                      <th>نام</th>
                      <th>نام خانوادگی</th>
                      <th>پروفایل</th>
                      <th>نام کاربری</th>
                      <th>ایمیل</th>
                      <th>شماره تماس</th>
                      <th>کدپستی</th>
                      <th>آدرس</th>
                      <th>نقش</th>
                      <th className="text-center">وضعیت</th>
                      <th>زمان ایجاد</th>
                      <th className="text-start ps-3">اقدامات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList?.map((data, i) => {
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
                          <td className="text-center">{++i}</td>
                          <td>
                            <p>{data.firstName}</p>
                          </td>
                          <td>
                            <p>{data.lastName}</p>
                          </td>
                          <td>
                            <img
                              src={"/uploads/users/" + data.userImage}
                              width={120}
                            />
                          </td>
                          <td>
                            <p>{data.name}</p>
                          </td>
                          <td>
                            <p>{data.email}</p>
                          </td>
                          <td>
                            <p>{data.phoneNumber}</p>
                          </td>
                          <td>
                            <p>{data.nationalCode}</p>
                          </td>
                          <td>
                            <p>{data.address}</p>
                          </td>
                          <td>
                            <p>{roleFun(data.role)}</p>
                          </td>

                          <td className="text-center">{active}</td>
                          <td>
                            <span>{moment(data.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span>
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
                                    setDelId(data.id);
                                    setDelName(((data.firstName !== "" || data.lastName !== "")?data.firstName+" "+data.lastName : "کاربر انتخابی") )
                                    openModalPrompt()
                                   
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
