import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { AdvisorRegistreApi } from "../../api";
import Title from "../../microComponents/Title";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../context/index";
import { useForm } from "react-hook-form";
import { RealStateRegistrationApi } from "../../api/index";
import LoginTypes from "../../components/LoginTypes";
import { getCityApi, getCityAreaByIdApi, createAgency } from "../../api";
import { useRouter } from 'next/router'
export default function RealStateRegistration() {
  const navigate = useRouter()
  ///context

  const { setShowLoading } = useContext(context);

  //state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setaddress] = useState("");
  const [nationalImage, setNationalImage] = useState<File>();
  const [selectedNationalImage, setSelectedNationalImage] = useState("");
  const [agencyImage, setAgencyImage] = useState<File>();
  const [selectedAgencyImage, setselectedAgencyImage] = useState("");
  const [businessIdImage, setBusinessIdImage] = useState<File>();
  const [selectedBusinessIdImage, setSelectedBusinessIdImage] = useState("");
  const [userImage, setUserImage] = useState<File>();
  const [selectedUserImage, setSelectedUserImage] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [cityList, setCityList] = useState([]);
  const [cityAreaList, setCityAreaList] = useState([]);
  const [city, setCity] = useState("");
  const [cityArea, setCityArea] = useState("");

  useEffect(() => {
    getCity();
  }, []);

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

  function creteAgency(e) {
    e.preventDefault();
    if (firstName == "") {
      return toast.error("لطفا نام را وارد کنید!");
    }
    if (lastName == "") {
      return toast.error("لطفا نام خانوادگی را وارد کنید!");
    }
    if (name == "") {
      return toast.error("لطفا نام املاک را وارد کنید!");
    }
    if (phoneNumber == "") {
      return toast.error("لطفا شماره تلفن ثابت را وارد کنید!");
    }
    if (nationalCode == "") {
      return toast.error("لطفا کدملی را وارد کنید!");
    }
    if (city == "") {
      return toast.error("لطفا شهر را انتخاب کنید!");
    }
    if (cityArea == "") {
      return toast.error("لطفا محدوده را انتخاب کنید!");
    }
    if (postalCode == "") {
      return toast.error("لطفا کدپستی را وارد کنید!");
    }
    if (address == "") {
      return toast.error("لطفا آدرس را وارد کنید!");
    }
    if (businessId == "") {
      return toast.error("لطفا کد پروانه کسب را وارد کنید!");
    }
    if (selectedBusinessIdImage == "") {
      return toast.error("لطفا عکس پروانه کسب را آپلود کنید!");
    }
    if (selectedNationalImage == "") {
      return toast.error("لطفا عکس کارت ملی را آپلود کنید!");
    }
    if (selectedUserImage == "") {
      return toast.error("لطفا عکس پرسنلی را آپلود کنید!");
    }
    if (selectedAgencyImage == "") {
      return toast.error("لطفا عکس یا لوگو آژانس را آپلود کنید!");
    }

    const AgencyRegistration = new FormData();
    AgencyRegistration.append("firstName", firstName);
    AgencyRegistration.append("lastName", lastName);
    AgencyRegistration.append("name", name);
    AgencyRegistration.append("phoneNumber", phoneNumber);
    AgencyRegistration.append("nationalCode", nationalCode);
    AgencyRegistration.append("cityId", city);
    AgencyRegistration.append("cityAreaId", cityArea);
    AgencyRegistration.append("postalCode", postalCode);
    AgencyRegistration.append("address", address);
    AgencyRegistration.append("businessId", businessId);
    AgencyRegistration.append("media", nationalImage);
    AgencyRegistration.append("media", userImage);
    AgencyRegistration.append("media", agencyImage);
    AgencyRegistration.append("media", businessIdImage);

    setShowLoading(true);
    axios
      .post(createAgency, AgencyRegistration, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          formReset();
          setShowLoading(false);
          toast.success("حساب شما با موفقیت ساخته شد");
        }
        // setTimeout(function(){ navigate.push("/") }, 3000);
        navigate.replace("/");
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


  function formReset() {
    setFirstName("");
    setLastName("");
    setName("");
    setCity("");
    setCityArea("");
    setPhoneNumber("");
    setNationalCode("");
    setPostalCode("");
    setaddress("");
    setBusinessId("");
    setNationalImage("");
    setUserImage("");
    setAgencyImage("");
    setBusinessIdImage("");
    setSelectedNationalImage("");
    setSelectedUserImage("");
    setSelectedBusinessIdImage("");
    setselectedAgencyImage("");
  }

  return (
    <Container className="pt-5 mt-5">
      <Row className="justify-content-center">
        <Col sm={12} md={9}>
          <LoginTypes />
          <div className="shadow-sm rounded-3   px-3 mt-3 pb-4  text-center title-text border">
            <Title title="ثبت نام مشاور املاک" />
            <p className="text-secondary col-xl-8 col-md-9 col-sm-10 col-9 mx-auto py-4 f-14">
              این در حالت صاحب مشاور املاک می تواند بدون محدودیت آگهی عادی و
              فروش ویژه اضافه کند هزینه دریافت اکانت مشاور ماهیانه دویست و پنجاه
              هزار تومان می باشد.
            </p>
            <Col xl={8} md={9} xs={10} className="mx-auto">
              <Form className="row">
                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder="نام"
                  />
                </Form.Group>
                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="نام خانوادگی"
                  />
                </Form.Group>
                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="نام املاک"
                  />
                </Form.Group>
                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    placeholder="شماره تماس ثابت"
                  />
                </Form.Group>
                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="number"
                    onChange={(e) => setNationalCode(e.target.value)}
                    value={nationalCode}
                    placeholder="کدملی"
                  />
                </Form.Group>

                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">


                  <Form.Select className=" shadow-es py-1 border-0 rounded-3 color-select"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  >
                    <option>لطفا شهر را انتخاب کنید</option>
                    {cityList?.map((data, i) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Select className=" shadow-es py-1 border-0 rounded-3 color-select"
                    onChange={(e) => setCityArea(e.target.value)}
                    value={cityArea}
                  >
                    <option>لطفا محدوده را انتخاب کنید</option>
                    {cityAreaList?.map((data, i) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="number"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                    placeholder="کدپستی"
                  />
                </Form.Group>

                <Form.Group className="col-lg-12 col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3"
                    as="textarea"
                    rows={3}
                    placeholder="آدرس"
                    onChange={(e) => setaddress(e.target.value)}
                    value={address}
                  />
                </Form.Group>
                <Form.Group className="col-lg-7  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="text"
                    onChange={(e) => setBusinessId(e.target.value)}
                    value={businessId}
                    placeholder="کد پروانه کسب"
                  />
                </Form.Group>
                <Form.Group className="col-lg-6 col-11 mx-auto mb-4">
                  <p className="f-14 text-right pe-1 mb-2"> عکس پروانه کسب</p>
                  <Form.Label className="w-100">
                    <Form.Control
                      onChange={({ target }) => {
                        if (target.files) {
                          const file = target.files[0];
                          setSelectedBusinessIdImage(URL.createObjectURL(file));
                          setBusinessIdImage(file);
                        }
                      }}
                      multiple
                      accept="image/*"
                      type="file"
                      hidden={true}
                    />

                    <div className="">
                      {!businessIdImage ? (
                        selectedBusinessIdImage ? (
                          <img
                            src={selectedBusinessIdImage}
                            value={selectedBusinessIdImage}
                            height={150}
                            className="w-100 rounded-3"
                          />
                        ) : (
                          <div className="rounded-3 shadow-es border-upload h-150 d-flex justify-content-center align-items-center">
                            <span>آپلود عکس</span>
                          </div>
                        )
                      ) : selectedBusinessIdImage ? (
                        <img
                          src={selectedBusinessIdImage}
                          value={selectedBusinessIdImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <img
                          src={"/uploads/users/" + businessIdImage}
                          value={selectedBusinessIdImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      )}
                    </div>
                  </Form.Label>
                </Form.Group>
                <Form.Group className="col-lg-6 col-11 mx-auto mb-4">
                  <p className="f-14 pe-1 mb-2"> عکس کارت ملی</p>
                  <Form.Label className="w-100">
                    <Form.Control
                      onChange={({ target }) => {
                        if (target.files) {
                          const file = target.files[0];
                          setSelectedNationalImage(URL.createObjectURL(file));
                          setNationalImage(file);
                        }
                      }}
                      multiple
                      accept="image/*"
                      type="file"
                      hidden={true}
                    />

                    <div className="">
                      {!nationalImage ? (
                        selectedNationalImage ? (
                          <img
                            src={selectedNationalImage}
                            value={selectedNationalImage}
                            height={150}
                            className="w-100 rounded-3"
                          />
                        ) : (
                          <div className="shadow-es rounded-3 border-upload h-150 d-flex justify-content-center align-items-center">
                            <span>آپلود عکس</span>
                          </div>
                        )
                      ) : selectedNationalImage ? (
                        <img
                          src={selectedNationalImage}
                          value={selectedNationalImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <img
                          src={"/uploads/articles/" + nationalImage}
                          value={selectedNationalImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      )}
                    </div>
                  </Form.Label>
                </Form.Group>

                <Form.Group className="col-lg-6 col-11 mx-auto mb-4">
                  <p className="f-14 text-right pe-1 mb-2"> عکس پرسنلی</p>
                  <Form.Label className="w-100">
                    <Form.Control
                      onChange={({ target }) => {
                        if (target.files) {
                          const file = target.files[0];
                          setSelectedUserImage(URL.createObjectURL(file));
                          setUserImage(file);
                        }
                      }}
                      multiple
                      accept="image/*"
                      type="file"
                      hidden={true}
                    />

                    <div className="">
                      {!userImage ? (
                        selectedUserImage ? (
                          <img
                            src={selectedUserImage}
                            value={selectedUserImage}
                            height={150}
                            className="w-100 rounded-3"
                          />
                        ) : (
                          <div className="rounded-3 shadow-es border-upload h-150 d-flex justify-content-center align-items-center">
                            <span>آپلود عکس</span>
                          </div>
                        )
                      ) : selectedUserImage ? (
                        <img
                          src={selectedUserImage}
                          value={selectedUserImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <img
                          src={"/uploads/users/" + userImage}
                          value={selectedUserImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      )}
                    </div>
                  </Form.Label>
                </Form.Group>
                <Form.Group className="col-lg-6 col-11 mx-auto mb-4">
                  <p className="f-14 text-right pe-1 mb-2">
                    {" "}
                    عکس یا لوگو املاک
                  </p>
                  <Form.Label className="w-100">
                    <Form.Control
                      onChange={({ target }) => {
                        if (target.files) {
                          const file = target.files[0];
                          setselectedAgencyImage(URL.createObjectURL(file));
                          setAgencyImage(file);
                        }
                      }}
                      multiple
                      accept="image/*"
                      type="file"
                      hidden={true}
                    />

                    <div className="">
                      {!agencyImage ? (
                        selectedAgencyImage ? (
                          <img
                            src={selectedAgencyImage}
                            value={selectedAgencyImage}
                            height={150}
                            className="w-100 rounded-3"
                          />
                        ) : (
                          <div className="rounded-3 shadow-es border-upload h-150 d-flex justify-content-center align-items-center">
                            <span>آپلود عکس</span>
                          </div>
                        )
                      ) : selectedAgencyImage ? (
                        <img
                          src={selectedAgencyImage}
                          value={selectedAgencyImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      ) : (
                        <img
                          src={"/uploads/users/" + agencyImage}
                          value={selectedAgencyImage}
                          height={150}
                          className="w-100 rounded-3"
                        />
                      )}
                    </div>
                  </Form.Label>
                </Form.Group>

                <button
                  onClick={(e) => creteAgency(e)}
                  className="btn fw-bold btn btn-es col-xl-3 col-lg-4 col-md-5 col-sm-5  col-10 mx-auto mb-3"
                >
                  ثبت نام
                </button>
              </Form>
            </Col>
          </div>
        </Col>
        <ToastContainer position="top-left" rtl={true} theme="colored" />
      </Row>
    </Container>
  );
}
