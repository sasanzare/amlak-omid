import { Container, Row, Col, Nav, Tab, Table } from "react-bootstrap";
import Link from "next/link";
import SideBar from "../../blocks/sidebar";
import BgTop from "../../components/bgTop/BgTop";
import Estate from "../../components/Estate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ExpertCard from "../../components/ExpertCard";
import LoginTypes from "../../components/LoginTypes";

export default function Dashboard() {
  const suggested = [
    {
      img: "./img/es1.png",
      title: "کاربرعادی",
      profile: "./img/profile2.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "2",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "160",
    },
    {
      img: "./img/es2.png",
      title: "کاربرعادی",
      profile: "./img/profile1.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "3",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "200",
    },
    {
      img: "./img/es1.png",
      title: "کاربرعادی",
      profile: "./img/profile2.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "2",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "160",
    },
    {
      img: "./img/es2.png",
      title: "کاربرعادی",
      profile: "./img/profile1.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "3",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "200",
    },
  ];
  const ExpertData = [
    {
      img: "/img/realState/user-pic1.png",
      title: "سینا رحمان پور",
    },
    {
      img: "/img/realState/user-pic2.png",
      title: "فاطمه قاسمی",
    },
    {
      img: "/img/realState/user-pic3.png",
      title: "‌حمید فدایی",
    },
  ];
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
                    src="/img/profile2.png"
                    className="col-md-9  col-sm-4 col-5 rounded-3"
                    alt=""
                  />
                  <h6 className="pt-2 text-secondary">کاربر شماره ۲۴۵</h6>
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
                          ثبت نام
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
                        className="btn btn-border w-100 f-14 "
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
                        className="btn btn-border w-100 f-14 "
                      >
                        ذخیره شده‌ها
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
                  <Tab.Pane eventKey="register">
                  <LoginTypes />
                  </Tab.Pane>
                    <Tab.Pane eventKey="advertisements">
                      <Row>
                        {suggested.map((suggest, index) => (
                          <Estate
                            key={index}
                            myClass="p-sm-2 p-3 my-lg-0  my-2 col-xl-4 col-lg-6 col-md-12 col-sm-6 col-11 mx-auto"
                            img={suggest.img}
                            title={suggest.title}
                            profile={suggest.profile}
                            location={suggest.location}
                            price={suggest.price}
                            bed={suggest.bed}
                            type={suggest.type}
                            time={suggest.time}
                            meter={suggest.meter}
                          />
                        ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="note">note</Tab.Pane>
                    

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
                    <Tab.Pane eventKey="invite">
                      <Row>
                        <Col lg={3} className="pe-lg-2 ">
                          <img
                            src="/img/realState/user-pic2.png"
                            className="col-lg-12 col-sm-5 rounded-3 h-100"
                            alt=""
                          />
                          <div
                            className="col-lg-12 col-sm-5 col-6 mx-auto d-flex justify-content-between px-1"
                            style={{ marginTop: "-33px" }}
                          >
                            <button className="rounded-5 btn-es col-6 f-13">
                              پذیرش
                            </button>
                            <button className="rounded-5 btn-danger col-sm-5 col-6 f-13">
                              رد کردن
                            </button>
                          </div>
                        </Col>
                        <Col lg={9}>
                          <Row>
                            <Col
                              lg={6}
                              className="ps-lg-2 pe-lg-0 ps-2 pe-2 mt-lg-0 mt-3"
                            >
                              <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
                                {" "}
                                نام و نام‌خانوادگی: پارمیدا زارع
                              </span>
                            </Col>
                            <Col
                              lg={6}
                              className="pe-lg-2 ps-2 pe-2 mt-lg-0 mt-3"
                            >
                              <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
                                شماره تماس: 09171102056
                              </span>
                            </Col>
                            <Col
                              lg={6}
                              className="ps-lg-2 pe-lg-0 ps-2 pe-2 mt-3"
                            >
                              <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
                                کدملی: 2420187459
                              </span>
                            </Col>
                            <Col lg={6} className="pe-lg-2 ps-2 pe-2 mt-3">
                              <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
                                کدپستی: 731875648
                              </span>
                            </Col>
                            <Col lg={12} className="pe-lg-0 ps-2 pe-2 mt-3">
                              <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
                                آدرس محل سکونت: شیراز خیابان قدوسی غربی نرسیده
                                به شهید محلاتی طبقه فوقانی فروشگاه واحد سوم ۳۶۱
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="experts">
                        <Row>
                        {ExpertData.map((item, index) => (
                        <ExpertCard
                          key={index}
                          img={item.img}
                          title={item.title}
                        >
                          <button className="btn-danger rounded-3 mb-2 f-14">حذف کارشناس</button>
                        </ExpertCard>
                      ))}
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
                  </Tab.Content>
                </Col>
              </Row>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
