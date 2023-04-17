import { Navbar, Container, Nav, Row, Col, Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
function Header() {
  const location = useRouter();

  const [userData, setUserData] = useState(null);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    let storage = localStorage.getItem("userData");
    if (storage) {
      setUserData(JSON.parse(storage));
    }
    setToggle(false);
  }, [location]);
  function logOut() {
    setUserData(null);
    localStorage.clear("userData");
  }
  return (
    <div className="Header position-fixed w-100">
      <Navbar
        expanded={toggle}
        onToggle={(e) => {
          setToggle(e);
        }}
        className="dir-l shadow-sm "
        bg="white"
        expand="lg"
      >
        <Container fluid>
          <Link href="/New">
            <a className="btn btn-es fw-bold col-xl-1 col-lg-2 col-md-2 col-sm-3 col-4">
              ثبت آگهی
            </a>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container fluid className="pt-2">
              <Row>
                <Col
                  lg={2}
                  className="ps-2 d-lg-block d-flex flex-column align-items-center pe-0"
                >
                  {userData ? (
                    <Dropdown>
                      <Dropdown.Toggle className="btn-es" id="dropdown-basic">
                        پروفایل من
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="text-end">
                        <Dropdown.Item>
                          <Link href="/dashboard">
                            <span className="d-block">داشبورد</span>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logOut}>
                          <span className="d-block text-danger">خروج</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    // <Dropdown>
                    //   <Dropdown.Toggle className="btn-es" id="dropdown-basic">
                    //     ورود/ثبت نام
                    //   </Dropdown.Toggle>

                    //   <Dropdown.Menu>
                    //     <Dropdown.Item>
                    //       <Link href="/signin?goTo=/">
                    //         <span className="d-block">کاربر عادی</span>
                    //       </Link>
                    //     </Dropdown.Item>
                    //     <Dropdown.Item>
                    //       <Link href="/signin?goTo=/profile/agency">
                    //         <span className="d-block">املاک</span>
                    //       </Link>
                    //     </Dropdown.Item>
                    //     <Dropdown.Item>
                    //       <Link href="/signin?goTo=/profile/agent">
                    //         <span className="d-block">مشاور</span>
                    //       </Link>
                    //     </Dropdown.Item>
                    //   </Dropdown.Menu>
                    // </Dropdown>
                    <Link href="/signin?goTo=/">
                      <a className="btn btn-border fw-bold col-xxl-7 col-xl-9 col-lg-12 ">
                        ثبت نام 
                      </a>
                    </Link>
                  )}
                  {/* <Link href="/signin">
                    <span className="btn fw-bold btn-border col-lg-5 col-md-3 col-sm-4  col-5 mb-lg-0 mt-lg-0 mt-4 mb-4">ورود/ثبت نام</span>
                  </Link> */}
                  {/* <a className="btn fw-bold btn-border  col-lg-5 col-md-3 col-sm-4 col-5 ms-lg-2 mb-lg-0 mb-2" href="#">ورود کاربر</a> */}
                </Col>
                <Col lg={7}>
                  <Nav
                    defaultActiveKey="/home"
                    className="dir-r pe-0 text-center   justify-content-center"
                    as="ul"
                  >
                    <Nav.Item as="li">
                      <Nav.Link href="/Buy">خرید</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/Rent" eventKey="link-1">رهن و اجاره</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/Agencies" eventKey="link-2">مشاورین املاک</Nav.Link>
                    </Nav.Item>

                    <Nav.Item as="li">
                      <Nav.Link href="/Articles" eventKey="link-2">
                        بلاگ
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link href="/SpecialSale" className="text-danger" eventKey="link-2">
                        ملک فروش فوری
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col
                  lg={3}
                  md={12}
                  className="dir-r pt-1 fw-bold h3 text-lg-end text-center px-0"
                >
                  <Link href="/">
                    <a className="text-decoration-none text-es">
                      <img src="/img/logo-melko.png" alt="logo melko" width={150} />
                    </a>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
