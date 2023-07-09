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
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  getRealEstateApi,
  getCityApi,
  getCityAreaApi,
  getCityAreaByIdApi,
  createRealEstateApi,
  createAdvertise
} from "../../../api";
import {
  property,
  room,
  meterage,
  assignment,
  advertisingStatus,
} from "../../../lib/enum-converter";
import moment from 'jalali-moment'
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

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("c");
  const [roomCount, setRoomCount] = useState("one");
  const [meter, setMeter] = useState("m10");
  const [assignmentType, setAssignmentType] = useState("special");
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
  const [image1, setImage1] = useState();
  const [selectedImage1, setSelectedImage1] = useState("");
  const [image2, setImage2] = useState();
  const [selectedImage2, setSelectedImage2] = useState("");
  const [image3, setImage3] = useState();
  const [selectedImage3, setSelectedImage3] = useState("");
  const [image4, setImage4] = useState();
  const [selectedImage4, setSelectedImage4] = useState("");

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
    axios.delete(`${getRealEstateApi}?id=` + data.id).then((res) => {
      getRealEstate();
    });
  }

  function upsert() {
    const RealStateRegistration = new FormData();

    RealStateRegistration.append("cityId", city);
    RealStateRegistration.append("cityAreaId", area);
    RealStateRegistration.append("type", propertyType);
    RealStateRegistration.append("price", price);
    RealStateRegistration.append("meter", meter);
    RealStateRegistration.append("assignmentType", assignmentType);
    RealStateRegistration.append("roomCount", roomCount);
    RealStateRegistration.append("phoneNumber", phoneNumber);
    RealStateRegistration.append("name", name);
    RealStateRegistration.append("description", convertedContent);

    // if(lat != ""){
    //   RealStateRegistration.append("latitude", lat);
    // }

    // if(lang != ""){
    //   RealStateRegistration.append("longitude", lang);
    // }

    RealStateRegistration.append("media", estateImage);
    if (selectedImage1 != "") {
      RealStateRegistration.append("media", image1);
    }
    if (selectedImage2 != "") {
      RealStateRegistration.append("media", image2);
    }
    if (selectedImage3 != "") {
      RealStateRegistration.append("media", image3);
    }
    if (selectedImage4 != "") {
      RealStateRegistration.append("media", image4);
    }












    if (name == "") {
      return toast.error("لطفا عنوان را وارد کنید!");
    }
    if (city == "") {
      return toast.error("لطفا شهر را انتخاب کنید!");
    }
    if (area == "") {
      return toast.error("لطفا محله را انتخاب کنید!");
    }
    if (price == "") {
      return toast.error("لطفا قیمت را وارد کنید!");
    }
    if (phoneNumber == "") {
      return toast.error("شماره تماس را وارد کنید!");
    }
    if (phoneNumber.length != 11) {
      return toast.error("لطفا شماره صحیح را وارد کنید!");
    }
    if (!editorState.getCurrentContent().hasText()) {
      return toast.error("لطفا توضیحات را وارد کنید!");
    }
    if (selectedImage == "") {
      return toast.error(" تصویر مقاله را انتخاب کنید!");
    }
    let object = {
      name,
      phoneNumber,
      description: convertedContent,
      roomCount,
      meter,
      assignmentType,
      type: propertyType,
      price,
      cityAreaId: area,
      cityId: city,
      latitude,
      longitude,
      isActive: isSwitchOn,
      AdStatus,
      // cityName:city,
      media: estateImage,
    };


    if (idEs != 0) {
      RealStateRegistration.append("id", idEs);
    }
    axios
      .post(createAdvertise, RealStateRegistration, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
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
        } else {
          toast.error("مشکلی پیش آمده است !");
        }
      });
  }

  function reset() {
    setPropertyType("c");
    setRoomCount("one");
    setMeter("m10");
    setAssignmentType("rental");
    setEditorState(EditorState.createEmpty());
    setCity("");
    setSelectedImage("");
    setIdEs(0);
    // setCityList([]);
    setName("");
    setArea("");
    setPrice("");
    setPhoneNumber("");
    setAdStatus("");
    setAreaName("");
    setLatitude(0);
    setLongitude(0);
    setEstateImage<File>();
    setIsSwitchOn(false);
    setIdEs(0);
    // setCityAreaList([]);
  }

  function openDialoge(obj) {
    getCity()
    if (obj) {
      setPropertyType(obj.propertyType);
      setRoomCount(obj.roomCount);
      setMeter(obj.meter);
      setAssignmentType(obj.assignmentType);
      setName(obj.name);
      // setArea(obj.cityArea.area);
      setPrice(obj.price);
      setPhoneNumber(obj.phoneNumber);
      setAdStatus(obj.AdStatus);
      setAreaName(obj.areaName);
      setLatitude(obj.latitude);
      setLongitude(obj.longitude);
      setIsSwitchOn(obj.isSwitchOn);
      // setCity(obj.city.name);
      setEstateImage(obj.estateImage);
      setSelectedImage(obj.selectedImage);
      setEditorState(EditorState.createWithContent(convertFromHTML(obj.description)));
      setIdEs(obj.id);
    }
    setModalShow(true);
  }
  function createNewAd() {
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
        title="آگهی"
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

            <Form.Select onChange={(e) => setArea(e.target.value)} value={area}>
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

          <Form.Group className="mb-3">
            <Form.Label>نوع ملک</Form.Label>

            <Form.Select
              onChange={(e) => setPropertyType(e.target.value)}
              value={propertyType}
            >
              <option value="c">اداری / تجاری</option>
              <option value="a">آپارتمان</option>
              <option value="v">ویلایی / باغ و باغچه</option>
              <option value="l">زمین / کلنگی</option>
              <option value="i">مستقلات / پنت هاوس</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>تعداد اتاف</Form.Label>

            <Form.Select
              onChange={(e) => setRoomCount(e.target.value)}
              value={roomCount}
            >
              <option value="one">۱</option>
              <option value="two">۲</option>
              <option value="three">۳</option>
              <option value="four">۴</option>
              <option value="five">۵</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>متراژ</Form.Label>

            <Form.Select
              onChange={(e) => setMeter(e.target.value)}
              value={meter}
            >
              <option value="m10">۱۰ تا ۹۰ متر</option>
              <option value="m90">۹۰ تا ۱۵۰ متر</option>
              <option value="m150">۱۵۰ تا ۲۲۰ متر</option>
              <option value="m220">۲۲۰ متر به بالا</option>
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
            <Form.Label>شماره تماس</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder="Example: 09170000000"
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
          {/* <Form.Group className="mb-3 text-center">
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
          </Form.Group> */}

          <Form.Group className="mb-3 text-center">
            <p className="f-14 text-right">افزودن تصاویر آگهی</p>
            <Form.Label className="w-100">
              <Form.Control
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setEstateImage(file);
                  }
                }}
                multiple
                accept="image/*"
                type="file"
                hidden={true}
              />

              <div className="d-flex justify-content-center">
                {!estateImage ? (
                  selectedImage ? (
                    <img src={selectedImage} value={selectedImage} width={250} />
                  ) : (
                    <div className="border-upload shadow-es rounded-3 p-5 d-flex justify-content-center  align-items-center col-lg-5 col-md-6 col-sm-6 col-7 h-250">

                      <div>
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="text-secandery f-25 d-block mx-auto mb-2 text-muted"
                          fixedWidth
                        />
                        <span className="text-muted">آپلود عکس اصلی</span>

                      </div>
                    </div>
                  )
                ) : selectedImage ? (
                  <img src={selectedImage} value={selectedImage} width={250} />
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
          <div className="col-12">
            <div className="row">
              <Form.Group className="col-lg-3  col-6 mx-auto mb-4">
                <Form.Label className="w-100">
                  <Form.Control
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImage3(URL.createObjectURL(file));
                        setImage3(file);
                      }
                    }}
                    multiple
                    accept="image/*"
                    type="file"
                    hidden={true}
                  />

                  <div className="">
                    {!image3 ? (
                      selectedImage3 ? (
                        <img
                          src={selectedImage3}
                          value={selectedImage3}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <div className="rounded-3 border-upload h-150 d-flex justify-content-center align-items-center">
                          <div>
                            <FontAwesomeIcon
                              icon={faUpload}
                              className="text-secandery f-25 d-block mx-auto mb-2 text-muted"
                              fixedWidth
                            />
                            <span className="text-muted">آپلود عکس اول</span>
                          </div>
                        </div>
                      )
                    ) : selectedImage3 ? (
                      <img
                        src={selectedImage3}
                        value={selectedImage3}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    ) : (
                      <img
                        src={"/uploads/users/" + image3}
                        value={selectedImage3}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    )}
                  </div>
                </Form.Label>
              </Form.Group>
              <Form.Group className="col-lg-3 col-6 mx-auto mb-4">
                <Form.Label className="w-100">
                  <Form.Control
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImage1(URL.createObjectURL(file));
                        setImage1(file);
                      }
                    }}
                    multiple
                    accept="image/*"
                    type="file"
                    hidden={true}
                  />

                  <div className="">
                    {!image1 ? (
                      selectedImage1 ? (
                        <img
                          src={selectedImage1}
                          value={selectedImage1}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <div className=" rounded-3 border-upload h-150 d-flex justify-content-center align-items-center">
                          <div>
                            <FontAwesomeIcon
                              icon={faUpload}
                              className="text-secandery f-25 d-block mx-auto mb-2 text-muted"
                              fixedWidth
                            />
                            <span className="text-muted">آپلود عکس دوم</span>
                          </div>
                        </div>
                      )
                    ) : selectedImage1 ? (
                      <img
                        src={selectedImage1}
                        value={selectedImage1}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    ) : (
                      <img
                        src={"/uploads/articles/" + image1}
                        value={selectedImage1}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    )}
                  </div>
                </Form.Label>
              </Form.Group>

              <Form.Group className="col-lg-3 col-6 mx-auto mb-4">
                <Form.Label className="w-100">
                  <Form.Control
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImage4(URL.createObjectURL(file));
                        setImage4(file);
                      }
                    }}
                    multiple
                    accept="image/*"
                    type="file"
                    hidden={true}
                  />

                  <div className="">
                    {!image4 ? (
                      selectedImage4 ? (
                        <img
                          src={selectedImage4}
                          value={selectedImage4}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <div className="rounded-3  border-upload h-150 d-flex justify-content-center align-items-center">
                          <div>
                            <FontAwesomeIcon
                              icon={faUpload}
                              className="text-secandery f-25 d-block mx-auto mb-2 text-muted"
                              fixedWidth
                            />
                            <span className="text-muted">آپلود عکس سوم</span>
                          </div>
                        </div>
                      )
                    ) : selectedImage4 ? (
                      <img
                        src={selectedImage4}
                        value={selectedImage4}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    ) : (
                      <img
                        src={"/uploads/users/" + image4}
                        value={selectedImage4}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    )}
                  </div>
                </Form.Label>
              </Form.Group>
              <Form.Group className="col-lg-3 col-6 mx-auto mb-4">
                <Form.Label className="w-100">
                  <Form.Control
                    onChange={({ target }) => {
                      if (target.files) {
                        const file = target.files[0];
                        setSelectedImage2(URL.createObjectURL(file));
                        setImage2(file);
                      }
                    }}
                    multiple
                    accept="image/*"
                    type="file"
                    hidden={true}
                  />

                  <div className="">
                    {!image2 ? (
                      selectedImage2 ? (
                        <img
                          src={selectedImage2}
                          value={selectedImage2}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <div className="rounded-3  border-upload h-150 d-flex justify-content-center align-items-center">
                          <div>
                            <FontAwesomeIcon
                              icon={faUpload}
                              className="text-secandery f-25 d-block mx-auto mb-2 text-muted"
                              fixedWidth
                            />
                            <span className="text-muted">آپلود عکس چهارم</span>
                          </div>
                        </div>
                      )
                    ) : selectedImage2 ? (
                      <img
                        src={selectedImage2}
                        value={selectedImage2}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    ) : (
                      <img
                        src={"/uploads/users/" + image2}
                        value={selectedImage2}
                        height={150}
                        className="w-100 rounded-3"
                      />
                    )}
                  </div>
                </Form.Label>
              </Form.Group>
            </div>
          </div>
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
                          <td>{data.city.name}</td>
                          <td>{data.cityArea.name}</td>
                          <td>{property(data.type)}</td>
                          <td>{room(data.roomCount)}</td>
                          <td>{meterage(data.meter)}</td>
                          <td>{assignment(data.assignmentType)}</td>
                          <td>{data.price.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}</td>
                          <td>{data.phoneNumber}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: data.description,
                            }}
                          />
                          <td>{active}</td>
                          <td>{advertisingStatus(data.AdStatus)}</td>

                          <td>
                            <img
                              src={"/uploads/advertising/" + data.estateImage}
                              width={120}
                            />
                          </td>
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
