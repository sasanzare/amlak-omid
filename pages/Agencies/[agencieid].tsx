import { Container, Row, Col, Form } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../blocks/sidebar";
import AgencieSidebarDetails from "../../components/AgencieSidebarDetails";
import ExpertAgencyCard from "../../components/ExpertAgencyCard/index";
import axios from "axios";
import Estate from "../../components/Estate";
import SearchCase from "../../blocks/SearchCase";
import { useEffect, useContext, useState } from "react";
import { context } from "../../context";
import {

  getUniqueRealEstate,
  getAgencyById,
  getAgentsAgency,
  getCityAreaByIdApi,
  getCityApi,
  searchUnique,
} from "../../api";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

import { property, room, meterage } from "./../../lib/enum-converter";
import moment from "jalali-moment";


export default function AgencieId() {
  const router = useRouter();
  const { setShowLoading } = useContext(context);
  const [agency, setAgency] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [advertisingList, setAdvertisingList] = useState([]);
  const [agencyManagerId, setAgencyManagerId] = useState("");
  const [cityList, setCityList] = useState([]);
  const [cityAreaList, setCityAreaList] = useState([]);
  const [city, setCity] = useState("");
  const [cityArea, setCityArea] = useState("");
  const [type, setType] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [meter, setMeter] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const { agencieid } = router.query;
    if (agencieid != undefined) {
      getAgency(agencieid);
      getAgent(agencieid);
    }
    getCity();
  }, [router.query]);

  useEffect(() => {
    if (agencyManagerId != "") {
      getAdvertising(agencyManagerId);
    }
  }, [agencyManagerId]);

  useEffect(() => {
    getCityArea();
  }, [city]);

  const getAgency = async (idAgency) => {
    setShowLoading(true);
    try {
      const res = await axios.post(getAgencyById, { id: idAgency });
      if (res.status === 200) {
        setShowLoading(false);
        setAgency(res.data);
        setAgencyManagerId(res.data.owner.id);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };

  function getAgent(agencieid) {
    setShowLoading(true);
    axios
      .post(getAgentsAgency, { ownerId: agencieid })
      .then((res) => {
        if (res.status === 200) {
          setAgentList(res.data);
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

  function getAdvertising(agencyManagerId) {
    setShowLoading(true);
    axios
      .post(getUniqueRealEstate, { agencyManagerId: agencyManagerId })
      .then((res) => {
        if (res.status === 200) {
          setShowLoading(false);
          setAdvertisingList(res.data);
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

  const getIdRealEstate = (e) => {
    router.push(`/Rent/${e.target.getAttribute("data-reactid")}`);
  };

  function getCity() {
    setShowLoading(true);
    axios
      .get(getCityApi)
      .then((res) => {
        setCityList(res.data);
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

  function getCityArea() {
    setShowLoading(true);
    axios
      .get(`${getCityAreaByIdApi}?cityId=${city}`)
      .then((res) => {
        setCityAreaList(res.data);
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

  function search(e) {
    e.preventDefault();
    let object = {
      cityId: city,
      cityAreaId: cityArea,
      type: type,
      roomCount: roomCount,
      meter: meter,
      assignmentType: assignmentType,
      price: price,
      agencyManagerId: agencyManagerId,
    }


    setShowLoading(true);
    axios
      .post(searchUnique, object)
      .then((res) => {

        if (res.status === 200) {
          setAdvertisingList(res.data);
          console.log(res.data);
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

  const typeList = [
    { title: "اداری / تجاری", val: "c" },
    { title: "آپارتمان", val: "a" },
    { title: "ویلایی / باغ و باغچه", val: "v" },
    { title: "زمین / کلنگی", val: "l" },
    { title: "مستقلات / پنت هاوس", val: "i" },
  ];

  const roomList = [
    { val: "one", title: "1" },
    { val: "two", title: "2" },
    { val: "three", title: "3" },
    { val: "four", title: "4" },
    { val: "five", title: "5" },
  ];

  const meterList = [
    { title: "10 تا 90 متر", val: "m10" },
    { title: "90 تا 150 متر", val: "m90" },
    { title: "150 تا 220 متر", val: "m150" },
    { title: "220 به بالا", val: "m220" },
  ]

  const assignmentTypeList = [
    { title: "رهن و اجاره", val: "rental" },
    { title: "خرید", val: "forSale" },
    { title: "فروش فوری ملک", val: "fastSale" },
  ]

  const priceList = [
    {
      title: "100,000,000 تا 500,000,000 تومان",
      val: "100000000-500000000",
    },
    {
      title: "500,000,000 تا 1,500,000,000 تومان",
      val: "500000000-1500000000",
    },
    {
      title: "1,500,000,000 تا 3,500,000,000 تومان",
      val: "1500000000-3500000000",
    },
    {
      title: "3,500,000,000 تا 5,000,000,000 تومان",
      val: "3500000000-5000000000",
    },
    { title: "5,000,000,000 به بالا", val: "5000000000" },
  ]
  return (
    <Container className="pt-5 mt-5 pb-4">
      <Row>
        <Col lg={3} md={4} xs={11} className="pe-0 ps-md-3 ps-0 mx-auto">
          <SideBar>
            <AgencieSidebarDetails
              img={agency?.agencyImage}
              title={agency?.name}
              manager={
                agency?.owner?.firstName != undefined ||
                  agency?.owner?.lastName != undefined
                  ? agency?.owner?.firstName + " " + agency?.owner?.lastName
                  : null
              }
              location={agency?.cityArea?.name}
              city={agency?.city?.name}
              case={agency?.RealEstate?.length}
              expert={agency?.agents?.length}
              phone={agency?.phoneNumber}
            />
          </SideBar>
        </Col>
        <Col lg={9} md={8} xs={11} className="mx-auto">
          <Row>
            <Col
              sm={12}
              className="shadow-sm p-3 rounded-4 d-flex align-items-center"
            >
              <Link href="/Agencies">
                <a className="text-decoration-none text-dark ">مشاورین املاک</a>
              </Link>
              <span className="me-2 pt-1">
                <FontAwesomeIcon className="text-es" icon={faLessThan} />
              </span>
              <Link href={`/Agencies/${agency.id}`}>
                <a className="text-decoration-none text-dark me-2">
                  {agency?.name}
                </a>
              </Link>
            </Col>
            <Col
              sm={12}
              className="text-center mt-3 shadow-sm rounded-4 p-0 pb-2"
            >
              <div className="p-4">
                <Row className="justify-content-center">
                  <h5 className="mb-0 fw-bold">مشاور {agency?.name}</h5>
                  {agentList.map((item) => (
                    <ExpertAgencyCard
                      key={item.id}
                      img={item.userImage}
                      firstName={item.firstName}
                      lastName={item.lastName}
                    />
                  ))}

                  <h5 className="pt-5 mt-4 fw-bold col-12">
                    آگهی های {agency?.name}
                  </h5>
                </Row>
              </div>

              <div className="col-12 pb-2 px-4 bg-light">
                <Form className="Search row pt-5 pb-4 " id="searchForm">
                  <Form.Group className="col-xl-3 col-sm-6  col-11 mx-auto px-xl-1 mb-3">
                    <Form.Select
                      className=" shadow-es border-0"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    >
                      <option> شهر</option>
                      {cityList?.map((data) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-xl-3 col-sm-6  col-11 mx-auto px-xl-1 mb-3">
                    <Form.Select
                      className=" shadow-es border-0 "
                      onChange={(e) => setCityArea(e.target.value)}
                      value={cityArea}
                    >
                      <option> محدوده</option>
                      {cityAreaList?.map((data) => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-xl-3 col-sm-6  col-11 mx-auto px-xl-1 mb-3">
                    <Form.Select
                      className=" shadow-es border-0 "
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    >
                      <option>نوع ملک</option>
                      {typeList?.map((data, i) => {
                        return (
                          <option key={i} value={data.val}>
                            {data.title}
                          </option>
                        );
                      })}

                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-xl-3 col-sm-6  col-11 mx-auto px-xl-1 mb-3">
                    <Form.Select
                      className=" shadow-es border-0"
                      onChange={(e) => setRoomCount(e.target.value)}
                      value={roomCount}
                    >
                      <option>تعداد خواب</option>
                      {roomList?.map((data, i) => {
                        return (
                          <option key={i} value={data.val}>
                            {data.title}
                          </option>
                        );
                      })}

                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-xl-3 col-sm-6  col-11 mx-auto px-xl-1 mb-3">
                    <Form.Select
                      className=" shadow-es border-0 "
                      onChange={(e) => setMeter(e.target.value)}
                      value={meter}
                    >
                      <option>متراژ</option>
                      {meterList?.map((data, i) => {
                        return (
                          <option key={i} value={data.val}>
                            {data.title}
                          </option>
                        );
                      })}

                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-xl-3 col-sm-6  col-11 mx-auto px-xl-1 mb-3">
                    <Form.Select
                      className=" shadow-es border-0 "
                      onChange={(e) => setAssignmentType(e.target.value)}
                      value={assignmentType}
                    >
                      <option>نوع واگذاری</option>
                      {assignmentTypeList?.map((data, i) => {
                        return (
                          <option key={i} value={data.val}>
                            {data.title}
                          </option>
                        );
                      })}

                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-xl-3 col-sm-6  col-11 mx-auto px-xl-1 mb-3">
                    <Form.Select
                      className=" shadow-es border-0 "
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    >
                      <option>قیمت</option>
                      {priceList?.map((data, i) => {
                        return (
                          <option key={i} value={data.val}>
                            {data.title}
                          </option>
                        );
                      })}

                    </Form.Select>
                  </Form.Group>


                  <div className="mb-3 col-xl-3 col-sm-6 col-5 mx-auto px-xl-1 text-center">
                    <button
                      onClick={(e) => search(e)}
                      className="btn mx-auto btn-es shadow-es w-100"
                    >
                      جستجو
                    </button>
                  </div>
                </Form>
              </div>

              <div className="p-4 mt-2">
                <Row>
                  {advertisingList.map((data) => {
                    return (
                      <Estate
                        key={data.id}
                        myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-4 col-md-6 col-11 mx-auto"
                        img={data.estateImage}
                        title={
                          data?.agency?.name ? data?.agency?.name : "املاک"
                        }
                        profile={
                          data?.agency?.agencyImage
                            ? "/uploads/agency/" + data?.agency?.agencyImage
                            : "/img/avatar.jpeg"
                        }
                        location={data.cityArea.name}
                        price={data.price.replace(/(\d)(?=(\d{3})+$)/g, "$1,")}
                        bed={room(data.roomCount)}
                        type={property(data.type)}
                        time={moment(data.createdAt, "YYYY/MM/DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")}
                        meter={meterage(data.meter)}
                        phoneNumber={data.phoneNumber}
                        to={data.id}
                        getId={getIdRealEstate}
                      />
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer
        position="top-left"
        rtl={true}
        theme="colored"
        autoClose={2000}
      />
    </Container>
  );
}
