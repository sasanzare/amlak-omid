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
import ExpertAgencyCard from "../../components/ExpertAgencyCard/index";
import axios from "axios";
import Estate from "../../components/Estate";
import SearchCase from "../../blocks/SearchCase";
import {useEffect,useContext,useState} from "react"
import { context } from "../../context";
import { getUniqueRealEstate,getAgencyById,getAgentsAgency } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

import {
  property,
  room,
  meterage,
} from "./../../lib/enum-converter";
import moment from 'jalali-moment'

export default function AgencieId() {
  const router = useRouter();
  const { setShowLoading } = useContext(context);
  const [agency, setAgency] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [advertisingList, setAdvertisingList] = useState([]);
  const [agencyManagerId, setAgencyManagerId] = useState("");

  useEffect(() => {
    const { agencieid } = router.query;
    if(agencieid != undefined){
      getAgency(agencieid);
      getAgent(agencieid);
      
    }
  }, [router.query]);

  useEffect(() => {
    if(agencyManagerId != ""){
      getAdvertising(agencyManagerId)
    }
  }, [agencyManagerId]);



  const getAgency = async (idAgency) => {
    setShowLoading(true);
    try {
      const res = await axios.post(getAgencyById, { id: idAgency})
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
      .post(getAgentsAgency,{ownerId : agencieid})
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
      .post(getUniqueRealEstate,{ agencyManagerId : agencyManagerId})
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
  return (
    <Container className="pt-5 mt-5 pb-4">
      <Row>
        <Col lg={3} md={4}  xs={11} className="pe-0 ps-md-3 ps-0 mx-auto">
          <SideBar>
            <AgencieSidebarDetails
              img={agency?.agencyImage}
              title={agency?.name}
              manager={(agency?.owner?.firstName != undefined || agency?.owner?.lastName != undefined)?agency?.owner?.firstName+" " +agency?.owner?.lastName : null}
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
            <Col sm={12} className="text-center mt-3 shadow-sm rounded-4 p-0 pb-2">
              <div className="p-4">
                <Row className="justify-content-center">
                  <h5 className="mb-0 fw-bold">مشاور {agency?.name}</h5>
                  {agentList.map((item) => (
                    <ExpertAgencyCard key={item.id} img={item.userImage} firstName={item.firstName} lastName={item.lastName} />
                  ))}

                  <h5 className="pt-5 mt-4 fw-bold col-12">آگهی های {agency?.name}</h5>

                </Row>
              </div>

              <SearchCase />

              <div className="p-4 mt-2">
                <Row>
                {advertisingList.map((data) => {
              return (<Estate
                key={data.id}
                myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-4 col-md-6 col-11 mx-auto"
                img={data.estateImage}
                title={(data?.agency?.name)? data?.agency?.name : "املاک" }
                profile={(data?.agency?.agencyImage)? "/uploads/agency/"+data?.agency?.agencyImage : "/img/avatar.jpeg" }
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
