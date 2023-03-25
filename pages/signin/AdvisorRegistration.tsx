import axios from "axios";
import React, { useState, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { AdvisorRegistreApi } from "../../api";
import Title from "../../microComponents/Title";
import styles from "./SignIn.module.css";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../context/index";
import { useForm } from "react-hook-form";
import LoginTypes from "../../components/LoginTypes";

export default function AdvisorRegistration() {
  ///context
  const { setShowLoading } = useContext(context);

  ////state
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [postalCode, setPostalCode] = useState();
  const [address, setaddress] = useState();
  const [passport, setPassport] = useState();
  const [pic, setPic] = useState();

  // controller

  // validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(errors);

  async function BtnHandeller() {
    try {
      // e.preventDefault();
      setShowLoading(true);
      const AdvisorRegistration = new FormData();
      AdvisorRegistration.append("name", name);
      AdvisorRegistration.append("phoneNumber", phone);
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
    <Container className="pt-5 mt-5 pb-4">
      <Row className="justify-content-center">
        <Col sm={12} md={9}>
          <LoginTypes />

          <div className="shadow-sm rounded-3   px-3 mt-3  text-center title-text border">
            <Title title="دعوت به همکاری" />

            <Col xl={8} md={9} xs={10} className="mx-auto pt-4">
              <Form onSubmit={handleSubmit(BtnHandeller)} className="row">
                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3 "
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    {...register("name", {
                      required: "نام وارد نشده",
                      onChange: (e) => setName(e.target.value),
                    })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.name?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3"
                    type="tel"
                    placeholder="شماره تماس "
                    {...register("phone", {
                      required: " شماره تماس وارد نشده است",
                      onChange: (e) => setPhone(e.target.value),
                    })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.phone?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="col-lg-6  col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3"
                    type="text"
                    placeholder="کد ملی"
                    {...register("nationalCode", {
                      required: "کد ملی وارد نشده است",
                      onChange: (e) => setNationalCode(e.target.value),
                    })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.nationalCode?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="col-lg-6 col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3"
                    type="text"
                    placeholder="کد پستی"
                    {...register("postalCode", {
                      required: "کد پروانه کسب وارد نشده است",
                      onChange: (e) => setPostalCode(e.target.value),
                    })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.postalCode?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="col-lg-12 col-11 mx-auto mb-4 ">
                  <Form.Control
                    className=" shadow-es py-2 border-0 rounded-3"
                    as="textarea" rows={3}
                    placeholder="آدرس"
                    {...register("address", {
                      required: "آدرس وارد نشده است",
                      onChange: (e) => setaddress(e.target.value),
                    })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.address?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="col-sm-10 col-11 mx-auto mb-4">
                  <Form.Control
                    className=" shadow-es py-2 border-0 "
                    type="file"
                    placeholder="افزودن عکس کارت ملی"
                    {...register("passport", {
                      required: " عکس کارت ملی وارد نشده است",
                      onChange: (e) => setPassport(e.target.files[0]),
                    })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.passport?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="col-sm-10 col-11 mx-auto mb-4">
                  <Form.Control
                    className=" shadow-es py-2 border-0 "
                    type="file"
                    placeholder="افزودن عکس پرسنلی "
                    {...register("pic", {
                      required: " عکس کارت ملی وارد نشده است",
                      onChange: (e) => setPic(e.target.files[0]),
                    })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.pic?.message}
                  </Form.Text>
                </Form.Group>

                <button
                  // onClick={(e) => BtnHandeller(e)}
                  className="btn fw-bold btn btn-es col-xl-3 col-md-4  col-5 mx-auto mb-3"
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
