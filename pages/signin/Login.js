import { Container, Row, Col, Form } from "react-bootstrap";
import Title from "../../microComponents/Title";
import styles from "./SignIn.module.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { PhoneNamberApi } from "../../api";
import { toast } from "react-toastify";
import { context } from "../../context";
import { authenticationApi } from "../../api/index";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  axios.delete;
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState();
  const searchParams = router.query;
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState();
  const { setShowLoading } = useContext(context);
  ///Phone Btn
  const phoneNumberHandeller = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    try {
      const res = await axios.post(PhoneNamberApi, { phoneNumber });
      if (res.status === 200) {
        toast.success(res.data.message);
        setShowLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        err?.response?.data?.errors?.map((issue) => toast.error(issue));
      } else {
        toast.error("مشکلی پیش آمده است !");
      }
      setShowLoading(false);
    }
  };
  //////Code Btn
  const verifyPhoneCodeHandeller = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const source = searchParams.goTo;
    try {
      const res = await axios.post(authenticationApi, {
        phoneNumber: phoneNumber,
        verificationCode: verifyPhoneNumber,
      });
      if (res.status === 200) {
        // localStorage.setItem('token',res.data.token);
        router.push(`/${source}`);
        localStorage.setItem("userData", JSON.stringify(res.data));
        // toast.success(res.data.message);
        // console.log(res.data)
        setShowLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        err?.response?.data?.errors?.map((issue) => toast.error(issue));
      } else {
        toast.error("مشکلی پیش آمده است !");
      }
      setShowLoading(false);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-md-row flex-column col-lg-9 col-12 mx-auto">
        <Link href="/signin?goTo=/">
          <a className="btn btn-es col-lg-3 col-md-3 col-sm-5 col-6 ms-2 mt-3">ثبت نام کاربر</a>
        </Link>
        <Link href="/signin?goTo=/profile/agency">
          <a className="btn btn-es col-lg-3 col-md-3 col-sm-5 col-6  ms-2 mt-3">ثبت نام املاک</a>
        </Link>
        <Link href="/signin?goTo=/profile/agent">
          <a className="btn btn-es col-lg-3 col-md-3 col-sm-5 col-6 mt-3"> دعوت به همکاری</a>
        </Link>
      </div>
      <div className="shadow-es rounded-3   px-3 mt-3  text-center title-text border">
        <Title title="ورود" classes="" />
        <Row className="flex-column">
          <Form className="signIn-form mb-4 col-xl-5 col-lg-6 col-md-8 col-sm-9 col-11 mx-auto">
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="col-6 shadow-es py-2 my-4 border-0"
              type="text"
              placeholder="شماره همراه خود را وارد نمایید"
            />
            <button
              onClick={(e) => phoneNumberHandeller(e)}
              className="btn fw-bold btn-border my-lg-0 col-lg-6  col-7"
            >
              دریافت کد تایید
            </button>
          </Form>
          <Form className="signIn-form mb-5 col-xl-5 col-lg-6 col-md-8 col-sm-9 col-11 mx-auto">
            <Form.Control
              onChange={(e) => setVerifyPhoneNumber(e.target.value)}
              className="w-100 shadow-es py-2 my-4 border-0"
              type="text"
              placeholder="کد تایید 5 رقمی را وارد نمایید"
            />
            <button
              onClick={(e) => verifyPhoneCodeHandeller(e)}
              className="btn fw-bold btn btn-es  my-lg-0 col-lg-6 col-7"
            >
              ورود{" "}
            </button>
          </Form>
        </Row>
      </div>
    </>
  );
};

export default Login;
