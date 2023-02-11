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
import { getRealEstateApi, getCityApi, getCityAreaApi, getCityAreaByIdApi,createRealEstateApi } from "../../../api";
import {
  property,
  room,
  meterage,
  assignment,
  advertisingStatus,
} from "../../../lib/enum-converter";
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
  const [areaName, setAreaName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [estateImage, setEstateImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [idEs, setIdEs] = useState(0);
  const [cityList, setCityList] = useState([]);
  const [cityAreaList, setCityAreaList] = useState([]);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  let searchTimeOut = null;

  useEffect(() => {
    getRealEstate();
  }, []);

  useEffect(() => {
    getCityArea();
  }, [city]);

  function getRealEstate() {
    setShowLoading(true);
    axios
      .get(getRealEstateApi)
      .then((res) => {
        setRealEstateList(res.data);
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
      .get( `${getCityAreaByIdApi}?cityId=${city}`)
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
    axios.delete("/api/article?id=" + data.id).then((res) => {
      getRealEstate();
    });
  }

  function upsert() {
    // if (title == "") {
    //   return toast.error("لطفا عنوان را وارد کنید!");
    // }
    // if (!editorState.getCurrentContent().hasText()) {
    //   return toast.error("لطفا محتوا را وارد کنید!");
    // }
    // if (selectedImage == "") {
    //   return toast.error(" تصویر مقاله را انتخاب کنید!");
    // }
    let object = {
      name,
      phoneNumber,
      description: convertedContent,
      roomCount,
      meter,
      assignmentType,
      type: propertyType,
      price,
      areaName,
      cityAreaId: area,
      latitude,
      longitude,
      // isActive: false,
      AdStatus,
      // cityName:city,
      media: estateImage,
    };

    console.log(object)
    if (idEs != 0) {
      object = { ...object, id: idEs };
    }
    axios
      .post(createRealEstateApi, object, {
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
    setEstateImage(null);
    setSelectedImage("");
    setIdEs(0);
    setCityList([])
  }


  function openDialoge(obj) {
    if (obj) {
      // console.log(obj)
      console.log(selectedImage);
      setTitle(obj.title);
      setSummary(obj.summary);
      setCity(obj.city);
      setEstateImage(obj.estateImage);
      setSelectedImage(obj.selectedImage);
      setEditorState(EditorState.createWithContent(convertFromHTML(obj.text)));
      setIdEs(obj.id);
    }
    setModalShow(true);
  }
  function createNewAd(){
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
          آگهی‌ها
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
          <Form.Group className="mb-3">
            <Form.Label>شهر</Form.Label>

            <Form.Select
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
             
              {cityList?.map((data, i) => {
                return(
                  <option key={data.id} value={data.id}>{data.name}</option>
                );
              })}

            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>محدوده</Form.Label>

            <Form.Select
              onChange={(e) => setArea(e.target.value)}
              value={area}
            >
               <option >---</option>
              {cityAreaList?.map((data, i) => {
                return(
                  <option key={data.id} value={data.id}>{data.name}</option>
                );
              })}

            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>نوع ملک</Form.Label>

            <Form.Select
              onChange={(e) => setPropertyType(e.target.value)}
              value={propertyType}
            >
               <option value="c" >اداری / تجاری</option>
               <option value="a" >آپارتمان</option>
               <option value="v" >ویلایی / باغ و باغچه</option>
               <option value="l" >زمین / کلنگی</option>
               <option value="i" >مستقلات / پنت هاوس</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>تعداد اتاف</Form.Label>

            <Form.Select
              onChange={(e) => setRoomCount(e.target.value)}
              value={roomCount}
            >
               <option value="one" >۱</option>
               <option value="two" >۲</option>
               <option value="three" >۳</option>
               <option value="four" >۴</option>
               <option value="five" >۵</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>متراژ</Form.Label>

            <Form.Select
              onChange={(e) => setMeter(e.target.value)}
              value={meter}
            >
               <option value="m10" >۱۰ تا ۹۰ متر</option>
               <option value="m90" >۹۰ تا ۱۵۰ متر</option>
               <option value="m150" >۱۵۰ تا ۲۲۰ متر</option>
               <option value="m220" >۲۲۰ متر به بالا</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>نوع واگذاری</Form.Label>

            <Form.Select
              onChange={(e) => setAssignmentType(e.target.value)}
              value={assignmentType}
            >
              <option value="rental">رهن و اجاره</option>
              <option value="forSale">خرید</option>
              <option value="fastSale">فروش فوری</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>قیمت</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>آٔدرس</Form.Label>
            <Form.Control
              onChange={(e) => setAreaName(e.target.value)}
              value={areaName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>شماره تماس</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </Form.Group>
        

          <Form.Group className="mb-3" controlId="text">
            <Form.Label>توضیحات</Form.Label>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>وضعیت آگهی</Form.Label>

            <Form.Select
              onChange={(e) => setAdStatus(e.target.value)}
              value={AdStatus}
            >
              <option value="awaitingPayment">در انتظار پرداخت</option>
              <option value="awaitingConfirmation">در انتظار تایید</option>
              <option value="active">منتشر شده</option>
              <option value="expired">منقضی شده</option>
              <option value="Deleted">حذف شده</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 text-center">
            <p className="f-14 text-right">تصویر اصلی</p>
            <Form.Label className="w-50">
              <Form.Control
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setEstateImage(file);
                  }
                }}
                // value={estateImage}
                multiple
                accept="image/*"
                type="file"
                hidden={true}
              />

              <div className="d-flex justify-content-center">
                {!estateImage ? (
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
                    src={"/uploads/articles/" + estateImage}
                    value={selectedImage}
                    width={200}
                  />
                )}
              </div>
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Check
              className="d-flex flex-column-reverse"
              type="switch"
              onChange={onSwitchAction}
              checked={isSwitchOn}
              label="وضعیت"
            />
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

                          <td>{data.name}</td>
                          <td>{data.cityArea.name}</td>
                          <td>{data.areaName}</td>
                          <td>{property(data.type)}</td>
                          <td>{room(data.roomCount)}</td>
                          <td>{meterage(data.meter)}</td>
                          <td>{assignment(data.assignmentType)}</td>
                          <td>{data.price}</td>
                          <td>{data.phoneNumber}</td>
                          <td>{data.description}</td>
                          <td>{active}</td>
                          <td>{advertisingStatus(data.AdStatus)}</td>

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
