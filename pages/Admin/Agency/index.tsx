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
import { getAgencyInfoApi,  getRealEstateApi,
  getCityApi,
  getCityAreaByIdApi,
  getAgencyOwnerApi,
  creatAagencyApi,
  removeAagencyApi
   } from '../../../api';

   import {
    requestStatus,
  } from "../../../lib/enum-converter";
import moment from 'jalali-moment'

export default () => {

  const { setShowLoading } = useContext(context);
  const [agencyList, setAgencyList] = useState([]);
  const [cityList,setCityList] = useState([]);
  const [cityAreaList,setCityAreaList] = useState([]);
  const [agencyOwnerList,setAgencyOwnerList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
 
  const [agencyImage, setAgencyImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [cityArea, setCityArea] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [status, setStatus] = useState("pending");
  const [isActive, setIsActive] = useState(0);
  const [idAg, setIdAg] = useState("");
  const [isActiveOn, setIsActiveOn] = useState(false);


  const onSwitchAction = () => {
    setIsActiveOn(!isActiveOn);
  };

  useEffect(() => {
    getAgencyInfo();
  }, []);

  useEffect(() => {
    getCityArea();
  }, [city]);

  function getAgencyInfo() {
    setShowLoading(true);
    axios
      .get(getAgencyInfoApi)
      .then((res) => {
        setAgencyList(res.data);
        
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
  function getAgencyOwner() {
    setShowLoading(true);
    axios
      .get(getAgencyOwnerApi)
      .then((res) => {
        setAgencyOwnerList(res.data);
        
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

  function getCity() {
    setShowLoading(true);
    axios
      .get(getCityApi)
      .then((res) => {
        setCityList(res.data);
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

  function getCityArea() {
    setShowLoading(true);
    axios
      .get(`${getCityAreaByIdApi}?cityId=${city}`)
      .then((res) => {
        setCityAreaList(res.data);
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
    axios.delete(removeAagencyApi+"?id=" + data.id).then((res) => {
      getAgencyInfo();
    });
  }

  function upsert() {
    if (name == "") {
      return toast.error("لطفا نام آژانس را وارد کنید!");
    }
    if (ownerId == "") {
      return toast.error("لطفا نام مدیر را انتخاب کنید!");
    }
    if (city == "") {
      return toast.error("لطفا شهر را انتخاب کنید!");
    }
    if (cityArea == "") {
      return toast.error("لطفا محله را انتخاب کنید!");
    }
    if (phoneNumber == "") {
      return toast.error("شماره تماس را وارد کنید!");
    }
    if (phoneNumber.length != 11) {
      return toast.error("لطفا شماره صحیح را وارد کنید!");
    }
    if (selectedImage == "") {
      return toast.error(" تصویر مقاله را انتخاب کنید!");
    }
    let object = {
      name,
      ownerId: ownerId,
      cityId:city,
      cityAreaId:cityArea,
      phoneNumber,
      media: agencyImage,
      status,
      isActive : isActiveOn
  

    };
    if (idAg != 0) {
      object = { ...object, id: idAg };
    }
    axios
      .post(creatAagencyApi, object, {
        headers: {
          Authorization: `${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
          "Content-Type": "multipart/form-data",
        },
      })
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
    setName("");
    setOwnerId("");
    // setAgencyImage<File>();
    setCity("");
    setCityArea("");
    setIdAg("");
    setPhoneNumber("");
    setIsActiveOn(false);
    setStatus("pending");
  }



  function openDialoge(obj) {
    if (obj) {
      getAgencyOwner() 
      getCityArea()
      getCity()
      setName(obj.name);
      setPhoneNumber(obj.phoneNumber);
      // setOwnerId(obj.owner.firstName+""+obj.owner.lastName);
      // setCityArea(obj.cityArea.name);
      // setCity(obj.cityArea.name);
      setIsActiveOn(obj.isActive);
      setIdAg(obj.id);
      setStatus(obj.status)
    }
    setModalShow(true);
  }

  function createNewAd() {
    getAgencyOwner();
    getCity();
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
            onClick={() => createNewAd()}
          >
            +
          </button>
        </h2>
      </div>
      <FormModal
        show={modalShow}
        onCancel={() => closeDialoge()}
        func={upsert}
        title="آژانس"
      >
        <Form dir="rtl" name="submitForm" >
          <Form.Group className="mb-3">
            <Form.Label>نام آژانس</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>نام و نام خانوادگی مدیر آژانس</Form.Label>

            <Form.Select onChange={(e) => setOwnerId(e.target.value)} value={ownerId}>
            <option>---
                  </option>
              {agencyOwnerList?.map((data, i) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.firstName + " " + data.lastName}
              
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label>شهر</Form.Label>

            <Form.Select onChange={(e) => setCity(e.target.value)} value={city}>
            <option>---
                  </option>
              {cityList?.map((data, i) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>محدوده</Form.Label>

            <Form.Select onChange={(e) => setCityArea(e.target.value)} value={cityArea}>
              <option>---</option>
              {cityAreaList?.map((data, i) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>شماره تماس</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>وضعیت</Form.Label>

            <Form.Select onChange={(e) => setStatus(e.target.value)} value={status}>
                  <option  value="pending"> در حال بررسی</option>
                  <option  value="denied">رد شده</option>
                  <option  value="accepted">تایید شده</option>
                    
              
             
             
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="status">
          <Form.Check
            className="d-flex flex-column-reverse"
            type="switch"
            onChange={onSwitchAction}
            checked={isActiveOn}
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
                    setAgencyImage(file);
                  }
                }}
      
                multiple
                accept="image/*"
                type="file"
                hidden={true}
              />

              <div className="d-flex justify-content-center">
                {!agencyImage?(
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
                      {/* <th>امیتاز</th> */}
                      <th>شماره تماس</th>
                      {/* <th>نقشه</th> */}
                     
                      <th className="text-center">وضعیت</th>
                      <th>احراز هویت</th>
                      <th>زمان ایجاد</th>
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
                          <td>{data.name}</td>
                          <td>
                            <img src={"/uploads/agency/" +  data.agencyImage}  width={120} />
                          </td>
                 
                          <td>
                            <p>
                              {data.owner.firstName} {data.owner.lastName}
                            </p>
                          </td>
                          <td>{data.cityArea.name}</td>
                          <td>{data.agents.length}</td>
                          <td>{data.RealEstate.length}</td>
                        
                          <td>{data?.phoneNumber}</td>
           
                       
                          <td className="text-center">{requestStatus(data.status)}</td>
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
