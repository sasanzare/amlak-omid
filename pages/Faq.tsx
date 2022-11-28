import { Container, Row, Col, Accordion } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../blocks/sidebar";
import SideBarLinks from "../components/SideBarLinks";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { context } from "../context";
export default ()=> {
  const { setShowLoading } = useContext(context);
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    get({});
  }, []);

  function get() {
    setShowLoading(true);
    axios
      .get("/api/faq/get")
      .then((res) => {
        setFaqList(res.data);
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

  return (
    <Container className=" pt-5 mt-5 pb-4">
      <Row>
        <Col lg={9} md={8} sm={11} xs={10} className="mx-auto">
          <Row>
            <Col
              sm={12}
              className="shadow-sm p-3 rounded-4 d-flex align-items-center"
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
            <Col sm={12} className="text-center mt-3 shadow-sm rounded-4 py-4">
              <h1 className="h5 pt-2 pb-4 ">سوالات متداول سامانه املاک امید</h1>
              <Accordion defaultActiveKey="0">
                {faqList?.map((data,i) => {
                  return (
                    <Accordion.Item key={i} eventKey={i} className="mb-3">
                      <Accordion.Header className="head-faq">
                        {data.question}
                      </Accordion.Header>
                      <Accordion.Body>{data.answer}</Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={4} className="ps-0 pe-3 d-md-block d-none">
          <SideBar>
            <SideBarLinks />
          </SideBar>
        </Col>
      </Row>
    </Container>
  );
}
