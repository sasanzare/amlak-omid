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
import axios from "axios";
import Estate from "../../components/Estate";
import SearchCase from "../../blocks/SearchCase";
import {useEffect,useContext,useState} from "react"
import { context } from "../../context";
import { getAllAgency } from "../../api";
import { ToastContainer, toast } from "react-toastify";
export default function AgencieId() {
  const { setShowLoading } = useContext(context);
  const [modalShow, setModalShow] = useState(false);
  const [agency, setAgency] = useState([]);


  useEffect(() => {
    getAgency();
  }, []);



  const getAgency = async () => {
    setShowLoading(true);
    try {
      const resp = await axios.get(getAllAgency);
      if (resp.status === 200) {
        setShowLoading(false);
        setAgency(resp.data);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };
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
        <Col lg={3} md={4}  xs={11} className="pe-0 ps-md-3 ps-0 mx-auto">
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
      <ToastContainer
        position="top-left"
        rtl={true}
        theme="colored"
        autoClose={2000}
      />
    </Container>
  );
}
