import { Navbar, Container, Nav, Row, Col, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
function Header() {
  const location = useRouter();

  const [userData, setUserData] = useState(null);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    let storage = localStorage.getItem('userData');
    if (storage) {
      setUserData(JSON.parse(storage))
    }
    setToggle(false)
  }, [location]);
  function logOut(){
    setUserData(null)
    localStorage.clear('userData')
  }
  return (
    <div className="Header position-fixed w-100">
      <Navbar expanded={toggle} onToggle={(e) => { setToggle(e) }} className='dir-l shadow-sm ' bg="white" expand="lg">
        <Container fluid>
          <Link href="/News">
            <span className="btn btn-es fw-bold px-5">
              ثبت آگهی
            </span>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container fluid className='pt-2'>
              <Row>
                <Col lg={4} className='ps-2 d-lg-block d-flex flex-column align-items-center'>
                  {
                    userData ?
                      <Dropdown  >
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          پروفایل من
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='text-end'>
                          <Dropdown.Item >
                            <Link href='/dashboard'>
                              <span className='d-block'>داشبورد</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item  onClick={logOut}>
                              <span className='d-block text-danger'>خروج</span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      : <Dropdown >
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          ورود/ثبت نام
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item >
                            <Link href='/signin?goTo=/'>
                              <span className='d-block'>کاربر عادی</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item >
                            <Link href='/signin?goTo=/profile/agency'>
                              <span className='d-block'>املاک</span>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item >
                            <Link href='/signin?goTo=/profile/agent'>
                              <span className='d-block'>مشاور</span>
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>


                  }
                  {/* <Link href="/signin">
                    <span className="btn fw-bold btn-border col-lg-5 col-md-3 col-sm-4  col-5 mb-lg-0 mt-lg-0 mt-4 mb-4">ورود/ثبت نام</span>
                  </Link> */}
                  {/* <a className="btn fw-bold btn-border  col-lg-5 col-md-3 col-sm-4 col-5 ms-lg-2 mb-lg-0 mb-2" href="#">ورود کاربر</a> */}
                </Col>
                <Col lg={6} >
                  <Nav defaultActiveKey="/home" className='dir-r pe-0 text-center' as="ul">
                    <Nav.Item as="li">
                      <Nav.Link href="/buy">خرید</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="link-1">رهن و اجاره</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="link-2">مشاورین املاک</Nav.Link>
                    </Nav.Item>
                   
                    <Nav.Item as="li">
                      <Nav.Link href="/blog" eventKey="link-2">بلاگ</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="link-2" style={{ color: "red" }}>ملک فروش فوری</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm className='dir-r pt-1  fw-bold h3 text-center'>
                  <Link href="/" >
                    <span className='text-decoration-none text-es'>
                      Amlak Omid
                    </span>
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



