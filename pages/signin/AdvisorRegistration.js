import axios from "axios";
import React, { useState,useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { AdvisorRegistreApi } from "../../api";
import Title from "../../microComponents/Title";
import styles from "./SignIn.module.css";
import { ToastContainer, toast } from "react-toastify";
import { context } from '../../context/index';
import { useForm } from "react-hook-form";


const AdvisorRegistration = () => {

  ///context 
  const {setShowLoading} = useContext(context);


  ////state
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const [address, setaddress] = useState();
  const [pic, setPic] = useState();

console.log(name)
  // controller

  // validation
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  
 console.log(errors)
 

  async function BtnHandeller() {


    try {
      // e.preventDefault();
      setShowLoading(true);
      const AdvisorRegistration = new FormData();
      AdvisorRegistration.append("name", name);
      AdvisorRegistration.append("family", lastName);
      AdvisorRegistration.append("phoneNumber", phone);
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
      if(err.response?.data){
        err?.response?.data?.errors?.map(issue=> toast.error(issue));
      }else{
         toast.error('مشکلی پیش آمده است !')
      }
      setShowLoading(false);

    }
  }



  return (
    <div className="shadow-es rounded-3 py-3 px-3 mt-5  text-center title-text">
      <Title title="ثبت نام مشاور املاک" />
      <div className="d-flex justify-content-center  align-items-center">
        <Form onSubmit={handleSubmit(BtnHandeller)} className="mb-5">
          <div className="signIn-form d-flex flex-wrap justify-content-between ">
          <Form.Group 
          className="w-45 my-4 position-relative"
          controlId="formBasicEmail">
            <Form.Control
              className=' shadow-es py-2 border-0 '
              type="text"
              placeholder="نام"
              {...register("name" , {
                 required:"نام وارد نشده",
                onChange:(e)=>setName(e.target.value)
              })}
            />
              <Form.Text className="text-warning form-validate position-absolute ">
                {errors?.name?.message}
              </Form.Text>
             </Form.Group>



             <Form.Group 
                className="w-45 my-4 position-relative"
                controlId="formBasicEmail">
                 <Form.Control
                    className=' shadow-es py-2 border-0 '
                    type="text"
                    placeholder="نام خانوادگی"
                    {...register("family" , {
                      required:"نام خانوادگی وارد نشده",
                    onChange:(e)=>setLastName(e.target.value)

                  })}
                />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.family?.message}
                  </Form.Text>
             </Form.Group>


             <Form.Group 
                className="w-45 my-4 position-relative"
                controlId="formBasicEmail">
                      <Form.Control
                    className=' shadow-es py-2 border-0 '
                    type="tel"
                    placeholder="شماره تماس"
                    {...register("phone" , {
                      // required:" شماره تماس وارد نشده است",
                    onChange:(e)=>setPhone(e.target.value)

                  })}
                  />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.phone?.message}
                  </Form.Text>
             </Form.Group>


             <Form.Group 
                className="w-45 my-4 position-relative"
                controlId="formBasicEmail">
                  <Form.Control
                  className=' shadow-es py-2 border-0 '
                  type="text"
                  placeholder="کد ملی"
                  {...register("id" , {
                    required:"کد ملی وارد نشده است",
                  onChange:(e)=> setId(e.target.value)

                })}
                />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.id?.message}
                  </Form.Text>
             </Form.Group>


             <Form.Group 
                className="w-100 my-4 position-relative"
                controlId="formBasicEmail">
                <Form.Control
                  className=' shadow-es py-2 border-0 '
                  type="text"
                  placeholder="آدرس"
                  {...register("address" , {
                    required:"آدرس وارد نشده است",
                  onChange:(e)=>setaddress(e.target.value)

                })}
                />
                  <Form.Text className="text-warning form-validate position-absolute ">
                    {errors?.address?.message}
                  </Form.Text>
             </Form.Group>


             <Form.Group 
                className="w-45 my-4 position-relative"
                controlId="formBasicEmail">
                <Form.Control
                    className=' shadow-es py-2 border-0 '
                    type="file"
                    placeholder="افزودن عکس کارت ملی"
                    {...register("pic" , {
                      // required:" عکس کارت ملی وارد نشده است",
                      onChange:(e)=>setPic(e.target.files[0])
                  })}
                  />
                <Form.Text className="text-warning form-validate position-absolute ">
                  {errors?.pic?.message}
                </Form.Text>
             </Form.Group>

           

         
           

           
           
          </div>

          <button
            // onClick={(e) => BtnHandeller(e)}
            className="btn fw-bold btn btn-es mb-lg-0 mt-lg-0 mt-4 mb-4 px-5  "
            href="#"
          >
            ثبت نام{" "}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AdvisorRegistration;
