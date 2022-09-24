import { Container, Row, Col, Accordion } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../blocks/sidebar";
export default function Faq() {
  return (
    <Container className="Home pt-5 mt-5 pb-4">
      <Row>
        <Col md={8} sm={12}>
          <Row>
            <Col
              sm={12}
              className="shadow p-3 rounded-4 d-flex align-items-center"
            >
              <Link href="/">
                <a className="text-decoration-none text-dark ">خانه</a>
              </Link>
              <span className="me-2 pt-1">
                <FontAwesomeIcon className="text-es" icon={faLessThan} />
              </span>
              <Link href="/Faq">
                <a className="text-decoration-none text-dark me-2">
                  سوالات متداول
                </a>
              </Link>
            </Col>
            <Col
              sm={12}
              className="text-center mt-3 shadow rounded-4 py-4"
            >
              <h1 className="h5 pt-2 pb-4 ">سوالات متداول سامانه املاک امید</h1>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className="mb-3">
                  <Accordion.Header className="head-faq">
                    آیا سایر مناطق یا شهر‌های دیگر در سامانه املاک امید موجود می
                    باشد؟
                  </Accordion.Header>
                  <Accordion.Body>
                    چکا باید کرد؟ در حالحاضر املاکامید برای هر چه بهتر ارائه
                    سویسخود ، فقط در مناطق شیراز دارایجستجو و خدماتکاملمی باشد .
                    برایدیدنملکها در سایر شهر ها ، در صفحه اصلیقسمتیبه همیننام
                    موجود است که میتوانید ملک ها
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="mb-3">
                  <Accordion.Header className="head-faq">
                    پس از پیدا کردن فایل ملک چیکار باید کرد؟
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="mb-3">
                  <Accordion.Header className="head-faq">
                    ما مالک هستیم آیا می توانیم فایل ملک خودم را در سامانه ایران فایل قرار دهم؟
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="ps-0 pe-3 d-md-block d-none">
          <SideBar>
          <Col sm className="dir-r pt-1  fw-bold h3 text-center">
          <Link href="/">
            <span className="text-decoration-none text-es">Amlak Omid</span>
          </Link>
        </Col>
        <h3 className="h6 text-secondary">آژانس مشاوره املاک امید</h3>
        <p className="col-10 mx-auto pt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
        <Col sm={12}>
        <Link href="/">
              <a className="btn btn-es col-lg-8 col-10 mt-3">خرید ملک</a>
            </Link>
            <Link href="/">
              <a className="btn btn-es col-lg-8 col-10 mt-3">رهن و اجار ملک</a>
            </Link>
            <Link href="/">
              <a className="btn btn-es col-lg-8 col-10 mt-3">
                ثبت آگهی رایگان ملک
              </a>
            </Link>
            <Link href="/">
              <a className="btn btn-es col-lg-8 col-10 mt-3">
                ثبت آگهی مشاورین املاک
              </a>
            </Link>

        </Col>
           
          </SideBar>
        </Col>
      </Row>
    </Container>
  );
}
