import { Container, Row, Col, Form } from "react-bootstrap";
import Title from "../../microComponents/Title";
import styles from "./SignIn.module.css";
import React, { useState, useContext,useEffect } from "react";
import axios from "axios";
import { PhoneNamberApi } from "../../api";
import { toast,ToastContainer } from "react-toastify";
import { context } from "../../context";
import { authenticationApi } from "../../api/index";
import { useRouter } from "next/router";
import { es } from "date-fns/locale";

const Login = () => {
  axios.delete;
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState();
  const searchParams = router.query;
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState();
  const { setShowLoading } = useContext(context);

  
  useEffect(() => {
    let userData = localStorage.getItem('userData');
    if (userData) {
      router.push('/dashboard')
    }
  }, [])
  
  function convertPersianToEnglish(persianNumber) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    let englishNumber = persianNumber;
    for (let i = 0; i < persianDigits.length; i++) {
      englishNumber = englishNumber.replace(new RegExp(persianDigits[i], 'g'), englishDigits[i]);
    }
    return englishNumber;
  }

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9]*$/;
    if (!numericRegex.test(keyValue)) {
      event.preventDefault();
      alert("لطفا عدد انگلیسی وارد کنید!");
    }
  };

  ///Phone Btn
  const phoneNumberHandeller = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    try {
      const res = await axios.post(PhoneNamberApi, { phoneNumber : convertPersianToEnglish(phoneNumber) });
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
        phoneNumber: convertPersianToEnglish(phoneNumber),
        verificationCode: convertPersianToEnglish(verifyPhoneNumber) ,
      });
      if (res.status === 200) {
        if(source != "/"){
          router.push(`/${source}`);
        }else{
          router.push('/dashboard')
        }
        localStorage.setItem("userData", JSON.stringify(res.data));
        setShowLoading(false);
      }
      if(es.status === 422){
        toast.error("شماره صحیح نیست");
      }
   
    } catch (err) {
      console.log(err)
      if (err?.response?.data) {
        err?.response?.data?.errors?.map((issue) => toast.error(issue));
      } else {
        toast.error("مشکلی پیش آمده است !");
      }
      setShowLoading(false);
    }
  };
  return (
 
      <div className="shadow-sm rounded-3   px-3 mt-3  text-center title-text border">
        <Title title="ورود" classes="" />
        <Row className="flex-column">
          <Form className="signIn-form mb-4 col-xl-5 col-lg-6 col-md-8 col-sm-9 col-11 mx-auto">
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              value={phoneNumber}
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
        <ToastContainer position="top-left" rtl={true} theme="colored" />
      </div>
  
  );
};

export default Login;
