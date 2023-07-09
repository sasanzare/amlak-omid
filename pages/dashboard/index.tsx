import { Container, Row, Col, Nav, Tab, Table } from "react-bootstrap";
import Link from "next/link";
import SideBar from "../../blocks/sidebar";
import BgTop from "../../components/bgTop/BgTop";
import Estate from "../../components/Estate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ExpertCard from "../../components/ExpertCard";
import LoginTypes from "../../components/LoginTypes";
import { useContext, useEffect, useState } from "react";
import { getInfoUser, getAdvertisingByUserId, getNoteByUserId, getAdmissionRequest, acceptExpert, rejectExpert, getAgents, getSavedRealEstates } from "../../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { context } from "../../context";
import { useRouter } from 'next/router';
import {
  property,
  room,
  meterage,
  assignment,
  advertisingStatus,
} from "./../../lib/enum-converter";
import moment from 'jalali-moment'
import Note from "../../components/Note";
import RequestCard from "../../components/RequestCard";

export default function Dashboard() {
  const router = useRouter();
  const { setShowLoading } = useContext(context);
  //state
  const [infoUser, setInfoUser] = useState([]);
  const [role, setRole] = useState("normal");
  const [firstName, setFirstName] = useState("کاربر");
  const [lastName, setLastName] = useState("عادی");
  const [userImg, setUserImg] = useState("/img/profile2.png");
  const [agencyId, setAgencyId] = useState("");
  const [realEstateList, setRealEstateList] = useState([]);
  const [advertisingList, setAdvertisingList] = useState([]);
  const [savedRealEstatesList, setSavedRealEstatesList] = useState([]);
  const [advertisingNotes, setAdvertisingNotes] = useState([]);
  const [agentrequest, setAgentrequest] = useState([]);

  let test;

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      getRoleUser();
    } else {
      router.replace('signin?goTo=/')
    }

  }, []);




  async function getRoleUser() {
    setShowLoading(true);
    try {
      const res = await axios.post(getInfoUser, null, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
        },
      });
      setInfoUser(res.data);
      test = res.data;


      if (res.status === 200) {
        setRole(res.data.role);
        if (res.data.role != "normal") {
          setUserImg(`/uploads/users/${res.data.userImage}`);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
        }


        if (res.data.role == "agencyOwner") {
          setAgencyId(res.data.agency[0].id);
          // console.log(res.data.agency[0].id);
          // console.log(agencyId);

        }
        setShowLoading(false);
        toast.success("خوش آمدید");
      }
    } catch (err) {
      if (err.response) {
        toast.error("مشکلی پیش آمده است !");
        console.log(err.response);
      } else {
        toast.error("مشکلی پیش آمده است !");
      }
    }
  }

  function getAdvertising() {
    setShowLoading(true);
    axios
      .post(getAdvertisingByUserId, null, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
        },
      })
      .then((res) => {
        console.log('data')
        console.log(res.data)
        setAdvertisingList(res.data);
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
  function getSaved() {
    setShowLoading(true);
    axios.get(getSavedRealEstates, {
      headers: {
        Authorization: `${JSON.parse(String(localStorage.getItem("userData"))).token}`,
      },
    }).then((res) => {
      console.log(res.data)
      setSavedRealEstatesList(res.data);
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
  function getAdvertisingNotes() {
    setShowLoading(true);
    axios
      .post(getNoteByUserId, null, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setAdvertisingNotes(res.data);
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
  function getAgentrequest() {
    setShowLoading(true);
    axios
      .post(getAdmissionRequest, null, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
        },
      })
      .then((res) => {
        setAgentrequest(res.data);
        if (res.status === 200) {
          setShowLoading(false);
          console.log(res.data);

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
  function getAgent() {
    setShowLoading(true);
    axios
      .post(getAgents, null, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
        },
      })
      .then((res) => {
        setAgentrequest(res.data);
        if (res.status === 200) {
          setShowLoading(false);
          console.log(res.data);

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
    router.push(`/Rent/${e.target.getAttribute("data-reactid")}`)
  };
  const acceptRequest = (e) => {
    setShowLoading(true);
    axios
      .post(acceptExpert, { idExpert: e.target.getAttribute("data-reactid") }, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setShowLoading(false);
          getAgentrequest()

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
  };
  const rejectRequest = (e) => {
    setShowLoading(true);
    axios
      .post(rejectExpert, { idExpert: e.target.getAttribute("data-reactid") }, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("userData")).token
            }`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setShowLoading(false);
          getAgentrequest()

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
  };
  return (
    <div className="About mt-5">
      <BgTop img="/img/userpanel/Group-209.jpg" />
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="register">
          <Row className="dashmain pb-4">
            <Col
              lg={3}
              md={4}
              xs={11}
              className="pe-0 ps-md-3 ps-0 mx-auto mb-md-0 mb-5"
            >
              <SideBar>
                <Col xs={10} className="border-bottom mx-auto text-center">
                  <img
                    src={userImg}
                    className="col-md-9  col-sm-4 col-5 rounded-3"
                    alt=""
                  />
                  <h6 className="pt-2 text-secondary">
                    {firstName + " " + lastName}
                  </h6>
                </Col>
                <Col xs={10} className="mx-auto">
                  <Row>

                    <Col
                      xl={10}
                      md={12}
                      sm={6}
                      xs={9}
                      className="px-1 pt-3 mx-auto"
                    >
                      <Nav.Link
                        eventKey="register"
                        className="btn btn-border w-100 f-14 "
                      >
                        <Link href="/New">
                          <a
                            className="btn btn-border w-100 f-14 "
                          >
                            ثبت آگهی
                          </a>
                        </Link>
                      </Nav.Link>
                    </Col>


                    <Col
                      xl={10}
                      md={12}
                      sm={6}
                      xs={9}
                      className="px-1 pt-3 mx-auto"
                    >
                      <Nav.Link
                        eventKey="advertisements"
                        className="btn btn-border w-100 f-14 "
                        onClick={() => getAdvertising()}
                      >
                        آگهی های من
                      </Nav.Link>
                    </Col>
                    <Col
                      xl={10}
                      md={12}
                      sm={6}
                      xs={9}
                      className="px-1 pt-3  mx-auto"
                    >
                      <Nav.Link
                        eventKey="note"
                        className="btn btn-border w-100 f-14"
                        onClick={() => getAdvertisingNotes()}
                      >
                        یادداشت‌ها
                      </Nav.Link>
                    </Col>
                    <Col
                      xl={10}
                      md={12}
                      sm={6}
                      xs={9}
                      className="px-1 pt-3  mx-auto"
                    >
                      <Nav.Link
                        eventKey="saved"
                        className="btn btn-border w-100 f-14"
                        onClick={() => getSaved()}
                      >
                        ذخیره شده ها
                      </Nav.Link>
                    </Col>
                    <Col
                      xl={10}
                      md={12}
                      sm={6}
                      xs={9}
                      className="px-1 pt-3  mx-auto"
                    >
                      <Nav.Link
                        eventKey="transactions"
                        className="btn btn-border w-100 f-14 "
                      >
                        تراکنش ها
                      </Nav.Link>
                    </Col>
                    <Col
                      xl={10}
                      md={12}
                      sm={6}
                      xs={9}
                      className="px-1 pt-3  mx-auto"
                    >
                      <Link href="tel:">
                        <a className="btn btn-border w-100 f-14 ">
                          {" "}
                          تماس با پشتیبانی
                        </a>
                      </Link>
                    </Col>
                    <Col
                      xl={10}
                      md={12}
                      sm={6}
                      xs={9}
                      className="px-1 pt-3  mx-auto"
                    >
                      <Link href="/New">
                        <a className="btn btn-border w-100 f-14 ">
                          + ملک فروش فوری
                        </a>
                      </Link>
                    </Col>

                    {role == "agencyOwner" ? (<>

                      <Col
                        xl={10}
                        md={12}
                        sm={6}
                        xs={9}
                        className="px-1 pt-3  mx-auto"
                      >

                        <Nav.Link
                          eventKey="invite"
                          className="btn btn-border w-100 f-14 "
                          onClick={() => getAgentrequest()}
                        >
                          فرم دعوت به همکاری
                        </Nav.Link>
                      </Col>
                      <Col
                        xl={10}
                        md={12}
                        sm={6}
                        xs={9}
                        className="px-1 pt-3  mx-auto"
                      >
                        <Nav.Link
                          eventKey="experts"
                          className="btn btn-border w-100 f-14 "
                          onClick={() => getAgent()}
                        >
                          مدیریت کارشناس‌ها
                        </Nav.Link>
                      </Col>
                      <Col
                        xl={10}
                        md={12}
                        sm={6}
                        xs={9}
                        className="px-1 pt-3  mx-auto"
                      >
                        <Nav.Link
                          eventKey="reports"
                          className="btn btn-border w-100 f-14 "
                        >
                          دیدن گزارش‌ها
                        </Nav.Link>
                      </Col>

                    </>) : null}

                  </Row>
                </Col>
              </SideBar>
            </Col>
            <Col lg={9} md={8} xs={11} className="mx-auto">
              <Row>
                <Col
                  sm={12}
                  className="text-center shadow-sm rounded-4 pb-4 pt-3  px-4 bg-white"
                >
                  <Tab.Content>
                    {role == "normal" ? (
                      <Tab.Pane eventKey="register">
                        <LoginTypes />
                      </Tab.Pane>
                    ) : (
                      <Tab.Pane eventKey="register">
                        <div className="alert alert-success mb-0" role="alert">
                          {`${firstName} ${lastName} به پنل کاربری خوش آمدید!`}
                        </div>
                      </Tab.Pane>
                    )}

                    <Tab.Pane eventKey="advertisements">
                      <Row>
                        {advertisingList.map((data) => {
                          return (<Estate
                            key={data.id}
                            myClass=" p-3 my-lg-0  my-2 col-xl-5 col-lg-6 col-md-10 col-11 mx-auto"
                            img={data.estateImage}
                            title={(data.agency) ? data.agency.name : "کاربر عادی"}
                            profile={(data.agency) ? "/uploads/advertising/" + data.agency.agencyImage : "/img/avatar.jpeg"}
                            location={data.cityArea.name}
                            price={data.price.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}
                            bed={room(data.roomCount)}
                            type={property(data.type)}
                            time={moment(data.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                            meter={meterage(data.meter)}
                            phoneNumber={data.phoneNumber}
                            to={data.id}
                            getId={getIdRealEstate}
                          />);
                        })}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="note">
                      <Row>
                        {advertisingNotes.map((data) => {
                          return (<div>

                            <Note title={data.note} to={data.realEstateId}
                              getId={getIdRealEstate} />
                          </div>
                          );
                        })}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="saved">
                      <Row>
                        {savedRealEstatesList.map((data) => {
                          return (<div>
                            <Note title={data.name + ' ' + data.description} to={data.id}
                              getId={getIdRealEstate} />
                          </div>
                          );
                        })}
                      </Row>
                    </Tab.Pane>


                    <Tab.Pane eventKey="transactions">
                      <Table borderless hover className="text-end">
                        <thead>
                          <tr className="text-es f-14">
                            <th>تاریخ</th>
                            <th>پرداختی مربوطه</th>
                            <th>مبلغ پرداختی</th>
                            <th>توضیحات</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-secondary">
                            <td>1401/10/09</td>
                            <td>آگهی فروش ملک در قصردشت</td>
                            <td>12000تومان</td>
                            <td>نردبان</td>
                          </tr>
                          <tr className="text-secondary">
                            <td>1401/08/29</td>
                            <td>آگهی فروش ملک در معالی‌آباد</td>
                            <td>12000تومان</td>
                            <td>نردبان</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Tab.Pane>

                    {role == "agencyOwner" ? (<>

                      <Tab.Pane eventKey="invite">
                        <Row>
                          <Col sm={12}>
                            {agentrequest.map((data) => (
                              <RequestCard
                                key={data.id}
                                name={data.firstName + data.lastName}
                                address={data.address}
                                number={data.phoneNumber}
                                nCode={data.nationalCode}
                                pCode={data.postalCode}
                                img={data.userImage}
                                to={data.id}
                                getId={acceptRequest}
                                deleteId={rejectRequest}
                              />
                            ))}
                          </Col>


                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="experts">
                        <Row>


                          <Col sm={12}>
                            {agentrequest.map((data) => (
                              <ExpertCard
                                key={data.id}
                                name={data.firstName + data.lastName}
                                address={data.address}
                                number={data.phoneNumber}
                                nCode={data.nationalCode}
                                pCode={data.postalCode}
                                img={data.userImage}
                                to={data.id}
                                deleteId={rejectRequest}
                              />
                            ))}
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="reports">
                        <Col
                          lg={12}
                          className=" mt-2 shadow-es col-12 rounded-4 py-2 border text-secondary px-3 d-flex justify-content-between"
                        >
                          <span className="f-14">
                            <FontAwesomeIcon
                              icon={faPencil}
                              className="text-gery ms-2"
                            />
                            این آگهی قیمت اشتباهی گزاشته داره بازار رو خراب میکنه
                          </span>
                          <Link href="#">
                            <a className="text-decoration-none text-es f-14">
                              مشاهده آگهی
                            </a>
                          </Link>
                        </Col>
                      </Tab.Pane>
                    </>) : null}



                  </Tab.Content>
                </Col>
              </Row>
            </Col>
          </Row>
        </Tab.Container>
        <ToastContainer position="top-left" rtl={true} theme="colored" />
      </Container>
    </div>
  );
}
