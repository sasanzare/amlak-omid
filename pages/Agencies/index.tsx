import { Container, Form, Button, Row } from "react-bootstrap";
import Card from "../../components/CardEstae";
import BgTop from "../../components/bgTop/BgTop";
import Title from "../../microComponents/Title";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Agencies.module.css";
import axios from "axios";
import { context } from "../../context";
import { ToastContainer, toast } from "react-toastify";
import { getAllAgency, bestAgency, findAgency } from "../../api";
import SearchModel from "../../components/searchModel";

export default function Agencies() {
  const router = useRouter();
  const { setShowLoading } = useContext(context);
  const [modalShow, setModalShow] = useState(false);
  const [agencyList, setAgencyList] = useState([]);
  const [bestAgencyList, setBestAgencyList] = useState([]);
  const [searchAgencyList, setSearchAgencyList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBestAgency();
    getAgency();
  }, []);


  const getAgency = async () => {
    setShowLoading(true);
    try {
      const resp = await axios.get(getAllAgency);
      if (resp.status === 200) {
        setShowLoading(false);
        setAgencyList(resp.data);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };
  const getBestAgency = async () => {
    setShowLoading(true);
    try {
      const resp = await axios.get(bestAgency);
      if (resp.status === 200) {
        setShowLoading(false);
        setBestAgencyList(resp.data);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };

  const searchAgency = async (e) => {
    e.preventDefault();
    if (search == "") {
      return toast.error("لطفا نام آژانس مورد نظر را وارد کنید!")
    }
    setShowLoading(true);
    try {
      const resp = await axios.post(findAgency, { name: search });
      if (resp.status === 200) {
        setShowLoading(false);
        if(resp.data.length == 0){
          setSearch("");
          return toast.error("متاسفانه آژانسی با این نام پیدا نشد!")
        }
        setSearchAgencyList(resp.data);
        setModalShow(true);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };

  function closeDialoge() {
    setModalShow(false);
    
  }
  return (
    <div className="About mt-5">
      <BgTop
        img="./img/bg-about.png"
        content="جستجوی آسان آژانس املاک"
        myClass="h4"
      >
        <Form className="d-flex justify-content-center  col-md-5 col-sm-7 col-11 mx-auto mt-2">
          <Form.Group className="col-xl-7 col-lg-8 col-md-9 col-sm-9 col-9">
            <Form.Control
              type="text"
              className={"py-3 " + styles.search}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="نام آژانس مورد نظر را وارد کنید"
            />
          </Form.Group>
          <button
            className={
              "btn btn-es me-1 col-xl-2 col-lg-3 col-md-4 col-sm-3 col-3 " +
              styles.btn
            }
            onClick={(e) => searchAgency(e)}
          >
            جستجو
          </button>
        </Form>
      </BgTop>
      <Container>
        <Row>
          <Title title="آژانس‌های املاک برتر" classes="mb-4" />
          {bestAgencyList.map((office) => (
            <Card
              key={office.id}
              img={"/uploads/agency/" + office.agencyImage}
              title={office.name}
              myclass="p-sm-2 p-3 col-xl-2 col-sm-4 col-6"
              to={office.id}
              rate={office.rate}
            />
          ))}
          <Title title="همه آژانس‌های املاک" classes="mb-4 mt-5" />
          {agencyList.map((office) => (
            <Card
              key={office.id}
              img={"/uploads/agency/" + office.agencyImage}
              title={office.name}
              myclass="p-sm-2 p-3 col-xl-2 col-sm-4 col-6"
              to={office.id}
              rate={office.rate}
            />
          ))}
        </Row>
      </Container>
      <SearchModel
        show={modalShow}
        onCancel={() => closeDialoge()}
        title="نتیجه جستجو"
      >
        <Row className="justify-content-center">
        {searchAgencyList.map((office) => (
            <Card
              key={office.id}
              img={"/uploads/agency/" + office.agencyImage}
              title={office.name}
              myclass="p-sm-2 p-3 col-lg-4 col-sm-6 col-8"
              to={office.id}
              rate={office.rate}
            />
          ))}
        </Row>
      
      </SearchModel>
      <ToastContainer
        position="top-left"
        rtl={true}
        theme="colored"
        autoClose={2000}
      />
    </div>
  );
}
