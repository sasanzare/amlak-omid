import SingleSelect from "../SingleSelect";
import { Form } from "react-bootstrap";
import "./NewsForm.module.css";
import Map from "../map";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { context } from "./../../context/index";
import axios from "axios";
import { NewsApi } from "./../../api/index";
import { getCityApi, getCityAreaByIdApi } from "../../api";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";

import { createAdvertise } from "../../api";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "jalali-moment";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { removeCommas, addCommas } from "@persian-tools/persian-tools";

export default () => {
  const navigate = useRouter();
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
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9]*$/;
    if (!numericRegex.test(keyValue)) {
      event.preventDefault();
      alert("لطفا عدد انگلیسی وارد کنید!");
    }
  };

  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  const { setShowLoading } = useContext(context);

  // const [estateImage, setEstateImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState("");

  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [roomCount, setRoomCount] = useState();
  const [area, setArea] = useState();
  const [meter, setMeter] = useState();
  const [estateImage, setEstateImage] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [metrage, setMetrage] = useState();
  const [assignmentType, setAssignmentType] = useState("rental");
  const [bedRooms, setBedRooms] = useState();
  const [advertiser, setAdvertiser] = useState();
  const [realStateCode, setRealStateCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [pictures, setPictures] = useState();
  const [lat, setLat] = useState("");
  const [lang, setLang] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [cityAreaList, setCityAreaList] = useState([]);
  const [showImg, setShowImg] = useState(null);

  const [image1, setImage1] = useState();
  const [selectedImage1, setSelectedImage1] = useState("");
  const [image2, setImage2] = useState();
  const [selectedImage2, setSelectedImage2] = useState("");
  const [image3, setImage3] = useState();
  const [selectedImage3, setSelectedImage3] = useState("");
  const [image4, setImage4] = useState();
  const [selectedImage4, setSelectedImage4] = useState("");

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  useEffect(() => {
    getCity();
  }, [city]);
  useEffect(() => {
    getCityArea();
  }, [city]);

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

  async function BtnHandeller(e) {
    const RealStateRegistration = new FormData();
    e.preventDefault();

    try {
      setShowLoading(true);

      RealStateRegistration.append("cityId", city);
      RealStateRegistration.append("cityAreaId", area);
      RealStateRegistration.append("type", type);
      RealStateRegistration.append("price", price);
      RealStateRegistration.append("meter", metrage);
      RealStateRegistration.append("assignmentType", assignmentType);
      RealStateRegistration.append("roomCount", bedRooms);
      RealStateRegistration.append("phoneNumber", phoneNumber);
      RealStateRegistration.append("name", title);
      RealStateRegistration.append("description", convertedContent);

      if (lat != "") {
        RealStateRegistration.append("latitude", lat);
      }

      if (lang != "") {
        RealStateRegistration.append("longitude", lang);
      }
      if (expirationDate != "") {
        RealStateRegistration.append("expirationDate", expirationDate);
      }

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
      const res = await axios({
        method: "post",
        url: createAdvertise,
        data: RealStateRegistration,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setShowLoading(false);
        navigate.replace(`/Rent/${res.data}`);
      }
    } catch (err) {
      if (err?.response?.data) {
        err?.response?.data?.errors?.map((issue) => toast.error(issue));
      } else {
        toast.error("مشکلی پیش آمده است !");
      }
      setShowLoading(false);
    }
  }

  const handleCoordinate = (value) => {
    setLang(value.lng);
    setLat(value.lat);
  };

  return (
    <Form className="col-lg-6 col-md-8  newsForm mx-auto flex-column flex-lg-row py-3 mt-5">
      <Form.Group className="mb-3">
        <Form.Select
          className="border-0 shadow-es"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        >
          <option>شهر</option>
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
        <Form.Select
          className="border-0 shadow-es"
          onChange={(e) => setArea(e.target.value)}
          value={area}
        >
          <option>محدوده</option>
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
        <Form.Select
          className="border-0 shadow-es"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option>نوع ملک (انتخاب نشده)</option>
          <option value="c">اداری / تجاری</option>
          <option value="a">آپارتمان</option>
          <option value="v">ویلایی / باغ و باغچه</option>
          <option value="l">زمین / کلنگی</option>
          <option value="i">مستقلات / پنت هاوس</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          className="border-0 shadow-es text-es py-2 new-input"
          onChange={(e) => setPrice(removeCommas(e.target.value))}
          value={addCommas(price)}
          onKeyPress={handleKeyPress}
          placeholder="قیمت برحسب تومان"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          className="border-0 shadow-es"
          onChange={(e) => setMetrage(e.target.value)}
          value={metrage}
        >
          <option>متراژ</option>
          <option value="m10">۱۰ تا ۹۰ متر</option>
          <option value="m90">۹۰ تا ۱۵۰ متر</option>
          <option value="m150">۱۵۰ تا ۲۲۰ متر</option>
          <option value="m220">۲۲۰ متر به بالا</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Select
          className="border-0 shadow-es"
          onChange={(e) => {
            console.log(e.target.value), setAssignmentType(e.target.value);
          }}
          value={assignmentType}
        >
          <option>نوع واگذاری</option>
          <option value="rental">رهن و اجاره</option>
          <option value="forSale">خرید</option>
          <option value="fastSale">فروش فوری</option>
        </Form.Select>
      </Form.Group>
      {assignmentType === "fastSale" && (
        <Form.Group className="mb-3">
          <label className="border-0 shadow-es">تاریخ انقضای فروش فوری</label>
          <br />
          <DatePicker
            calendar={persian}
            locale={persian_en}
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
            dateFormat="yyyy/mm/dd"
            className="border-0 shadow-es"
            placeholderText="انتخاب تاریخ"
            isClearable
            withPortal
            calendarClassName="jalali-datepicker"
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Select
          className="border-0 shadow-es"
          onChange={(e) => setBedRooms(e.target.value)}
          value={bedRooms}
        >
          <option>تعداد اتاق</option>
          <option value="one">۱</option>
          <option value="two">۲</option>
          <option value="three">۳</option>
          <option value="four">۴</option>
          <option value="five">۵</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          className="border-0 shadow-es text-es py-2 new-input"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          onKeyPress={handleKeyPress}
          placeholder="شماره تماس"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          className="border-0 shadow-es text-es py-2"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="عنوان"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="text">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
        />
      </Form.Group>

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
      <Map getCoordinate={handleCoordinate} />

      <div className="d-flex justify-content-center">
        <button
          onClick={(e) => BtnHandeller(e)}
          className="btn btn-es fw-bold px-3 col-lg-4 col-md-5 col-sm-5 col-6  mx-auto mt-4"
          href="#home"
        >
          ثبت آگهی
        </button>
      </div>
      <ToastContainer position="top-left" rtl={true} theme="colored" />
    </Form>
  );
};

// export default NewsForm;
