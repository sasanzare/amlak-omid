import axios from "axios";
import React, { useState, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { AdvisorRegistreApi } from "../../api";
import Title from "../../microComponents/Title";
import styles from "./SignIn.module.css";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../context/index";
import { useForm } from "react-hook-form";
import { RealStateRegistrationApi } from "../../api/index";
import LoginTypes from "../../components/LoginTypes";

export default function RealStateRegistration() {
  ///context
  const { setShowLoading } = useContext(context);

  //state
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const [address, setaddress] = useState();
  const [pic, setPic] = useState();
  const [businessId, setBusinessId] = useState();

  //controllers
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function BtnHandeller() {
    try {
      setShowLoading(true);
      const RealStateRegistration = new FormData();
      RealStateRegistration.append("name", name);
      RealStateRegistration.append("family", lastName);
      RealStateRegistration.append("phoneNumber", phone);
      RealStateRegistration.append("address", address);
      RealStateRegistration.append("nationalCode", id);
      RealStateRegistration.append("passport", pic);
      RealStateRegistration.append("certificate", businessId);
      RealStateRegistration.append("lat", 2);
      RealStateRegistration.append("lon", 2);

      const res = await axios({
        method: "post",
        url: RealStateRegistrationApi,
        data: RealStateRegistration,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201) {
        toast.success("حساب شما با موفقیت ساخته شد");
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
  }

  return (
    <Container className="pt-5 mt-5 pb-4">
    <Row className="justify-content-center">
        <Col sm={12} md={9}>
         
                    <LoginTypes />
                    <div className="shadow-sm rounded-3   px-3 mt-3  text-center title-text border">
                    <Title title="ثبت نام مشاور املاک" />
          <p className="text-secondary col-xl-8 col-md-9 col-sm-10 col-9 mx-auto py-4 f-14">
            این در حالت صاحب مشاور املاک می تواند بدون محدودیت آگهی عادی و فروش
            ویژه اضافه کند هزینه دریافت اکانت مشاور ماهیانه دویست و پنجاه هزار
            تومان می باشد.
          </p>
          <Col xl={8} md={9} xs={10} className="mx-auto">
            <Form onSubmit={handleSubmit(BtnHandeller)} className="row">
              <Form.Group className="col-lg-6  col-11 mx-auto mb-4">
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

              <Form.Group className="col-lg-6  col-11 mx-auto mb-4">
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

              <Form.Group className="col-lg-6  col-11 mx-auto mb-4">
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

              <Form.Group className="col-lg-6  col-11 mx-auto mb-4">
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
              <Form.Group className="col-lg-6  col-11 mx-auto mb-4">
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
              <Form.Group className="col-lg-6  col-11 mx-auto mb-4">
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

              <Form.Group className="col-lg-12  col-11 mx-auto mb-4">
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

              <Form.Group className="col-sm-10 col-11 mx-auto mb-3 pe-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 "
                  type="file"
                  placeholder="افزودن عکس کارت ملی"
                  {...register("pic", {
                    required: " عکس کارت ملی وارد نشده است",
                    onChange: (e) => setPic(e.target.files[0]),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.pic?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="col-sm-10 col-11 mx-auto mb-3 ps-sm-2">
                <Form.Control
                  className=" shadow-es py-2 border-0 "
                  type="file"
                  placeholder="افزودن تصویر پروانه کسب"
                  {...register("businessId", {
                    required: " تصویر پروانه کسب وارد نشده است",
                    onChange: (e) => setBusinessId(e.target.files[0]),
                  })}
                />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.businessId?.message}
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
    </Row>
    
</Container>

  
  );
}
