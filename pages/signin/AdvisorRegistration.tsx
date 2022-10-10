import axios from "axios";
import React, { useState, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { AdvisorRegistreApi } from "../../api";
import Title from "../../microComponents/Title";
import styles from "./SignIn.module.css";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../context/index";
import { useForm } from "react-hook-form";

export default function AdvisorRegistration() {
  ///context
  const { setShowLoading } = useContext(context);

  ////state
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [earPhone, setEarPhone] = useState();
  const [businessId, setBusinessId] = useState();
  const [id, setId] = useState();
  const [address, setaddress] = useState();
  const [pic, setPic] = useState();

  console.log(name);
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
      AdvisorRegistration.append("family", lastName);
      AdvisorRegistration.append("phoneNumber", phone);
      AdvisorRegistration.append("earPhoneNumber", earPhone);
      AdvisorRegistration.append("businessId", businessId);
      AdvisorRegistration.append("address", address);
      AdvisorRegistration.append("nationalCode", id);
      AdvisorRegistration.append("passport", pic);

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
    <Container className="pt-5 mt-4">
      <Row>
        <Col
          xl={8}
          lg={9}
          xs={11}
          className="shadow-sm mx-auto rounded-3 pb-3 px-3 mt-5  text-center"
        >
          <Title title="ثبت نام مشاور املاک" />
          <p className="text-secondary col-xl-8 col-md-9 col-sm-10 col-9 mx-auto py-4 f-14">
            این در حالت صاحب مشاور املاک می تواند بدون محدودیت آگهی عادی و فروش
            ویژه اضافه کند هزینه دریافت اکانت مشاور ماهیانه دویست و پنجاه هزار
            تومان می باشد.
          </p>
          <Col xl={8} md={9} xs={10} className="mx-auto">
            <Form onSubmit={handleSubmit(BtnHandeller)} className="row">
              <Form.Group className="col-sm-6 col-11 mx-auto mb-3 ps-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 rounded-3 "
                  type="text"
                  placeholder="نام املاک"
                  {...register("name", {
                    required: "نام وارد نشده",
                    onChange: (e) => setName(e.target.value),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.name?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="col-sm-6 col-11 mx-auto mb-3 pe-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 rounded-3"
                  type="text"
                  placeholder="نام‌خانوادگی املاک"
                  {...register("family", {
                    required: "نام خانوادگی وارد نشده",
                    onChange: (e) => setLastName(e.target.value),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.family?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="col-sm-6 col-11 mx-auto mb-3 ps-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 rounded-3"
                  type="tel"
                  placeholder="شماره تماس ثابت"
                  {...register("phone", {
                    // required:" شماره تماس وارد نشده است",
                    onChange: (e) => setPhone(e.target.value),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.phone?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="col-sm-6 col-11 mx-auto mb-3 pe-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 rounded-3"
                  type="tel"
                  placeholder="شماره همراه"
                  {...register("earPhone", {
                    required: "شماره همراه وارد نشده است",
                    onChange: (e) => setId(e.target.value),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.id?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="col-sm-6 col-11 mx-auto mb-3 ps-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 rounded-3"
                  type="text"
                  placeholder="کد ملی"
                  {...register("id", {
                    required: "کد ملی وارد نشده است",
                    onChange: (e) => setId(e.target.value),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.id?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="col-sm-6 col-11 mx-auto mb-3 pe-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 rounded-3"
                  type="text"
                  placeholder="کد پروانه کسب"
                  {...register("businessId", {
                    required: "کد پروانه کسب وارد نشده است",
                    onChange: (e) => setId(e.target.value),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.id?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="col-sm-12 col-11 mx-auto mb-3 ">
                <Form.Control
                  className=" shadow-es py-2 border-0 rounded-3"
                  type="text"
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

              <Form.Group className="col-sm-10 col-11 mx-auto mb-3 pe-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 "
                  type="file"
                  placeholder="افزودن عکس کارت ملی"
                  {...register("pic", {
                    required:" عکس کارت ملی وارد نشده است",
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
        </Col>
      </Row>
    </Container>
  );
}
