import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { AdvisorRegistreApi } from "../../api";
import Title from "../../microComponents/Title";
import styles from "./SignIn.module.css";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../context/index";
import { useForm } from "react-hook-form";
import LoginTypes from "../../components/LoginTypes";

export default function AdvisorRegistration() {
  const { setShowLoading } = useContext(context);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [id, setId] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [postalCode, setPostalCode] = useState();
  const [address, setaddress] = useState();
  const [nationalImage, setNationalImage] = useState<File>();
  const [selectedNationalImage, setSelectedNationalImage] = useState("");
  const [userImage, setUserImage] = useState<File>();
  const [selectedUserImage, setSelectedUserImage] = useState("");
  const [passport, setPassport] = useState();
  const [agency, setAgency] = useState("");
  const [agencyList, setAgencyList] = useState([]);
  const [pic, setPic] = useState();

  useEffect(() => {
    getAgency();
  }, []);

  // controller

  function getAgency() {
    setShowLoading(true);
    axios
      .get()
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
  // validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // console.log(errors);

  async function BtnHandeller() {
    try {
      // e.preventDefault();
      setShowLoading(true);
      const AdvisorRegistration = new FormData();
      AdvisorRegistration.append("name", firstName);
      AdvisorRegistration.append("phoneNumberNumber", phoneNumber);
      AdvisorRegistration.append("businessId", businessId);
      AdvisorRegistration.append("address", address);
      AdvisorRegistration.append("nationalCode", id);
      AdvisorRegistration.append("postalCode", PostalCode);
      AdvisorRegistration.append("passport", passport);
      AdvisorRegistration.append("pic", pic);

      const res = await axios({
        method: "post",
        url: AdvisorRegistreApi,
        data: AdvisorRegistration,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // const res = await axios.post(AdvisorRegistreApi,AdvisorRegistration)
      if (res.status === 201) {
        toast.success("حساب شما با موفقیت ساخته شد");
        setShowLoading(false);
      }
    } catch (err) {
      if (err.response?.data) {
        err?.response?.data?.errors?.map((issue) => toast.error(issue));
      } else {
        toast.error("مشکلی پیش آمده است !");
      }
      setShowLoading(false);
    }
  }

  return (
      <Container className="pt-5 mt-5">
        <Row className="justify-content-center">
          <Col sm={12} md={9}>
            <LoginTypes />

            <div className="shadow-sm rounded-3   px-3 mt-3 pb-4 text-center title-text border">
              <Title title="دعوت به همکاری" />

              <Col xl={8} md={9} xs={10} className="mx-auto pt-4">
                <Form onSubmit={handleSubmit(BtnHandeller)} className="row">
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
                      className=" shadow-es py-2 border-0 rounded-3"
                      type="tel"
                      placeholder="شماره تماس "
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                    />
                  </Form.Group>

                  <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                    <Form.Control
                      className=" shadow-es py-2 border-0 rounded-3"
                      type="number"
                      placeholder="کد ملی"
                      onChange={(e) => setNationalCode(e.target.value)}
                      value={nationalCode}
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
                  <Form.Group className="col-lg-7 col-11 mx-auto mb-4 ">
                    <Form.Control
                      className=" shadow-es py-2 border-0 rounded-3"
                      type="number"
                      placeholder="کد پستی"
                      onChange={(e) => setPostalCode(e.target.value)}
                      value={postalCode}
                    />
                  </Form.Group>
               
                  <Form.Group className="col-lg-7 col-11 mx-auto mb-4 ">
            <p className="f-14 text-right pe-1 mb-2">دفتر مشاوره املاک</p>

            <Form.Select onChange={(e) => setAgency(e.target.value)} value={agency} className="shadow-es  border-0 rounded-3 py-1">
            <option>---
                  </option>
              {agencyList?.map((data, i) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
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
                  <button
                    // onClick={(e) => BtnHandeller(e)}
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
