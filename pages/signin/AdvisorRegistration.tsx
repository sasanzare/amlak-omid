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
import {
  getNameActiveAgency,
  createAgencyAgent
} from "../../api";
import { useRouter } from 'next/router'

//test 


//end tst 

export default function AdvisorRegistration() {
  const navigate = useRouter()
  const { setShowLoading } = useContext(context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setaddress] = useState("");
  const [nationalImage, setNationalImage] = useState<File>();
  const [selectedNationalImage, setSelectedNationalImage] = useState("");
  const [userImage, setUserImage] = useState<File>();
  const [selectedUserImage, setSelectedUserImage] = useState("");
  const [agency, setAgency] = useState([]);
  const [agencyList, setAgencyList] = useState([]);


  useEffect(() => {
    getAgency();
  }, []);

  // controller

  function getAgency() {
    setShowLoading(true);
    axios
      .get(getNameActiveAgency)
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

 

  function creteAgent(e) {
    e.preventDefault();
    if (firstName == "") {
      return toast.error("لطفا نام را وارد کنید!");
    }
    if (lastName == "") {
      return toast.error("لطفا نام خانوادگی را وارد کنید!");
    }
    if (nationalCode == "") {
      return toast.error("لطفا کدملی را وارد کنید!");
    }
    if (postalCode == "") {
      return toast.error("لطفا کدپستی را وارد کنید!");
    }
    if (address == "") {
      return toast.error("لطفا آدرس را وارد کنید!");
    }
    if (agency.length === 0) {
      return toast.error("لطفا آژانس مورد نظر را انتخاب کنید!");
    }
    if (selectedNationalImage == "") {
      return toast.error("لطفا عکس کارت ملی را آپلود کنید!");
    }
    if (selectedUserImage == "") {
      return toast.error("لطفا عکس پرسنلی را آپلود کنید!");
    }

      const AdvisorRegistration = new FormData();
      AdvisorRegistration.append("firstName", firstName);
      AdvisorRegistration.append("lastName", lastName);
      AdvisorRegistration.append("nationalCode", nationalCode);
      AdvisorRegistration.append("postalCode", postalCode);
      AdvisorRegistration.append("address", address);
      AdvisorRegistration.append("media", nationalImage);
      AdvisorRegistration.append("media", userImage);
      AdvisorRegistration.append("agentOf", agency);
    setShowLoading(true);
    axios
      .post(createAgencyAgent, AdvisorRegistration, {
        headers: {
          Authorization: `${
            JSON.parse(localStorage.getItem("userData")).token
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
              // setTimeout(function(){ navigate.push("/dashboard") }, 3000);
              navigate.replace("/dashboard");
        
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

 function formReset(){ 
     setFirstName("");
     setLastName("");
     setNationalCode("");
     setPostalCode("");
    setaddress("");
    setNationalImage("");
    setUserImage("");
   setSelectedNationalImage("");
    setSelectedUserImage("");
    setAgency("")
  }

  return (
      <Container className="pt-5 mt-5">
        <Row className="justify-content-center">
          <Col sm={12} md={9}>
            <LoginTypes />

            <div className="shadow-sm rounded-3   px-3 mt-3 pb-4 text-center title-text border">
              <Title title="دعوت به همکاری" />

              <Col xl={8} md={9} xs={10} className="mx-auto pt-4">
                <Form  className="row">
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
                      type="number"
                      placeholder="کد ملی"
                      onChange={(e) => setNationalCode(e.target.value)}
                      value={nationalCode}
                    />
                  </Form.Group>
                  <Form.Group className="col-lg-6 col-11 mx-auto mb-4 ">
                    <Form.Control
                      className=" shadow-es py-2 border-0 rounded-3"
                      type="number"
                      placeholder="کد پستی"
                      onChange={(e) => setPostalCode(e.target.value)}
                      value={postalCode}
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
                  <Form.Group className="col-lg-7 col-11 mx-auto mb-4 " >
                       <p className="f-14 text-right pe-1 mb-2">دفتر مشاوره املاک</p>

                    <Form.Select multiple  value={agency}
                    onChange={e => setAgency([].slice.call(e.target.selectedOptions).map(item => item.value))}
                    className="shadow-es  border-0 rounded-3 py-1">
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
                    onClick={(e) => creteAgent(e)}
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
