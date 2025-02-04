import React, { useState, useContext } from 'react';
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import BgTop from '../components/bgTop/BgTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import Btn from '../microComponents/Btn';
import MyMap from '../components/map';
import axios from 'axios';
import { ContactApi } from '../api';
import { context } from '../context/index';
import { ToastContainer, toast } from "react-toastify";

function Contact() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [discription, setDescription] = useState("");


  const { setShowLoading } = useContext(context);
  function reset() {
    setTitle("");
    setFullName("");
    setDescription("");
    setEmail("");
  }


  //////Code Btn
  const contactFormHandeller = async (e) => {
    e.preventDefault();
    if (fullName == "") {
      return toast.error("لطفا نام و نام‌خانوادگی خود را  وارد کنید!");
    }
    if (email == "") {
      return toast.error("لطفا ایمیل خود را وارد کنید!")
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
      return toast.error("لطفا ایمیل صحیح را وارد کنید!")
    }

    if (title == "") {
      return toast.error("لطفا عنوان را وارد کنید!");
    }
    if (discription == "") {
      return toast.error("لطفا پیام خود را وارد کنید!")
    }
   
    

    setShowLoading(true);

    try {
      const res = await axios.post(ContactApi, { fullName: fullName, email: email, title: title, description: discription })
      if (res.status === 200) {
        reset();
        setShowLoading(false);
        toast.success("از پیغام شما سپاس گزاریم")
      }

    } catch (err) {
      if (err?.response?.data) {
        err?.response?.data?.errors?.map(issue => toast.error(issue))
      }
      else {
        toast.error('مشکلی پیش آمده است !')
      }
      setShowLoading(false);
    }
  }


  return (
    <div className="Contact mt-5 pt-4">
      <BgTop img="./img/contact.png" content="ارتباط باما" />
      <Container className="pt-5 pb-4">
        <Row>
          <Col lg={8} md={6} sm={12}>
            <ListGroup className='List border-0 mt-3'>
              <ListGroup.Item className='border-0 bg-transparent px-0 d-flex pb-3'>
                <FontAwesomeIcon className='text-es h3' icon={faMobileAlt} />
                <a href='tel:09059048626' className='me-3 mt-2 h5 text-decoration-none text-secondary ' >0000--</a>
                <a href='#' className='me-3 mt-2 h5 text-decoration-none text-secondary ' >0905-000-000</a>
              </ListGroup.Item>
              <ListGroup.Item className='border-0 bg-transparent px-0 d-flex pb-3'>
                <FontAwesomeIcon className='text-es h3' icon={faMapMarkerAlt} />
                <span className='me-3 mt-2 h5 text-secondary '>شیه </span>
              </ListGroup.Item>
              <ListGroup.Item className='border-0 bg-transparent px-0 d-flex pb-3'>
                <FontAwesomeIcon className='text-es h3' icon={faInstagram} />
                <a href='' className='me-3 mt-2 h5 text-decoration-none text-secondary ' target="_blank">@</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={4} md={6} sm={12} className='d-flex align-items-center justify-center' >
            <img className='w-100' src='./img/info-cantat.png' loading="lazy" />
          </Col>
          <h3 className='text-center fw-bold h5 pb-4 mt-4'>مشتاقانه پذیرای نظرات، پیشنهادات و انتقادات شما عزیزان هستم.</h3>
          <Col lg={10} sm={12} className='mx-auto'>
            <Form className='row'>
              <Form.Group className="mb-4 col-md-6 col-12">
                <input onChange={(e) => setFullName(e.target.value)} value={fullName} className='form-control lh-xl border-3 rounded-4' placeholder="نام و نام‌خانوادگی" />
              </Form.Group>
              <Form.Group className="mb-4 col-md-6 col-12">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='email form-control lh-xl border-3 rounded-4' placeholder="آدرس ایمیل" required />
              </Form.Group>
              <Form.Group className="mb-4 col-12">
                <input onChange={(e) => setTitle(e.target.value)} value={title} className='form-control lh-xl border-3 rounded-4' placeholder="عنوان پیام" />
              </Form.Group>
              <Form.Group className="mb-4 col-12">
                <textarea onChange={(e) => setDescription(e.target.value)} value={discription} className='form-control border-3 rounded-4' placeholder='متن پیام...' rows="6" required></textarea>
              </Form.Group>
              <Btn onClick={(e) => contactFormHandeller(e)} title="ارسال پیام" type="submit" myClass="btn-es lh-lg col-lg-3 col-md-4 col-sm-5 col-6 f-22 mx-auto rounded-5" />
            </Form>

          </Col>
          <h3 className='text-center  h4 pb-4 mt-5 pt-5'>ما را روی نقشه ببینید.</h3>

          <Col sm={12} className='pb-3'>
            <MyMap />

          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-left" rtl={true} theme="colored" />
    </div>
  );
}

export default Contact;