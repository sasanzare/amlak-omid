import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLessThan,
  faTriangleExclamation,
  faShareNodes,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../blocks/sidebar";
import AgencieSidebarDetails from "../../components/AgencieSidebarDetails";
import ExpertCard from "../../components/ExpertCard";

import Estate from "../../components/Estate";
import SearchCase from "../../blocks/SearchCase";

export default function AgencieId() {
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

  const suggested = [
    {
      img: "/img/es1.png",
      title: "کاربرعادی",
      profile: "/img/profile2.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "2",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "160",
    },
    {
      img: "/img/es2.png",
      title: "کاربرعادی",
      profile: "/img/profile1.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "3",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "200",
    },
    {
      img: "/img/es1.png",
      title: "کاربرعادی",
      profile: "/img/profile2.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "2",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "160",
    },
    {
      img: "/img/es2.png",
      title: "کاربرعادی",
      profile: "/img/profile1.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "3",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "200",
    },
  ];
  return (
    <Container className="pt-5 mt-5 pb-4">
      <Row>
        <Col md={3} className="pe-0 ps-3 ">
          <SideBar>
            <AgencieSidebarDetails
              img="/img/card1.png"
              title="آژانس املاک صادقیه"
              manager="آقای صادقی"
              location="محله معالی آباد"
              case="۲"
              expert="2"
              phone="+989059048626"
            />
          </SideBar>
        </Col>
        <Col md={9} sm={12}>
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
              <Link href="/Agencies/1">
                <a className="text-decoration-none text-dark me-2">
                  آژانس صادقیه
                </a>
              </Link>
            </Col>
            <Col sm={12} className="text-center mt-3 shadow-sm rounded-4 p-0 pb-2">
              <div className="p-4">
                <Row>
                  <h5 className="mb-0 fw-bold">مشاور املاک صادقیه</h5>
                  {ExpertData.map((item, index) => (
                    <ExpertCard key={index} img={item.img} title={item.title} />
                  ))}

                  <h5 className="pt-5 mt-4 fw-bold col-12">املاک آژانس صادقیه</h5>

                 
                </Row>
              </div>

              <SearchCase />

              <div className="p-4 mt-2">
                <Row>
                {suggested.map((suggest, index) => (
                    <Estate
                      key={index}
                      myClass="p-sm-2 p-3 my-lg-0  my-2  col-lg-4 col-sm-6 col-11 mx-auto"
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
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
