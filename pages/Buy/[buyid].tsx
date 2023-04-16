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
import RentSidebarDetails from "../../components/RentSidebarDetails";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Estate from "../../components/Estate";
import axios from "axios";
import { context } from "../../context";
import { ToastContainer, toast } from "react-toastify";
import { getRealEstateApi,createNote,getBuyRealEstate } from "../../api";
import { property, room, meterage,assignment } from "../../lib/enum-converter";
import moment from "jalali-moment";


export default function RentId() {
  const router = useRouter();
  const { setShowLoading } = useContext(context);
  const [realEstateList, setRealEstateList] = useState([]);
  const [realEstate, setRealEstate] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [time, setTime] = useState("2022-04-15T08:55:59.921Z");
  const [note, setNote] = useState("");

  useEffect(() => {
    getRealEstate();
  }, []);

  useEffect(() => {
    const { buyid } = router.query;
    getRealEstateId(buyid);
    console.log(buyid)
  }, [router.query]);


  const getRealEstate = async () => {
    setShowLoading(true);
    try {
      const resp = await axios.get(getBuyRealEstate + "?number=4");
      if (resp.status === 200) {
        setShowLoading(false);
      }
      setRealEstateList(resp.data);
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };

  const getRealEstateId = async (realEstateId) => {
    setShowLoading(true);
    try {
      const resp = await axios.get(getRealEstateApi + "?id=" + realEstateId);

      if (resp.status === 200) {
        setShowLoading(false);
        setRealEstate(resp.data);
        setTime(resp.data.createdAt)
        const items = createGallery(resp.data.gallery,resp.data.name,resp.data.estateImage);
        setGallery(items);
      }
    } catch (err) {
      // toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };

  const getIdRealEstate = (e) => {
    router.push(`/Buy/${e.target.getAttribute("data-reactid")}`);
  };


  function createGallery(arr,name,img) {
    let data = new Array();
    arr.forEach(function (value, i) {
      data[i] = {
        original: "/uploads/advertising/" + value.Photos,
        originalAlt: value.id,
        originalClass: "rounded-4 overflow-hidden W-50",
        thumbnail: "/uploads/advertising/" + value.Photos,
        thumbnailAlt: value.id,
        thumbnailClass: "rounded-5 ",
      };
    });
    data.unshift({
      original: "/uploads/advertising/" +img,
      originalAlt: name,
      originalClass: "rounded-4 overflow-hidden W-50",
      thumbnail: "/uploads/advertising/" + img,
      thumbnailAlt: name,
      thumbnailClass: "rounded-5 ",
    });
    return data;
  }
function assignmentLink(expression){
  let output;
  switch(expression) {
    case "rental":
      output = "/Rent";
      break;
    case "forSale":
      output = "/Buy"
      break;
    default:
      output = "/SpecialSale"
  }
  return output;
}

const sendNote = async () => {
  setShowLoading(true);
  try {
    const resp = await axios.post(createNote, {
      note,
      realEstateId : realEstate?.id,
    }, {
      headers: {
        Authorization: `${
          JSON.parse(localStorage.getItem("userData")).token
        }`,
        "Content-Type": "multipart/form-data",
      },
    } );

    if (resp.status === 200) {
      setShowLoading(false);
      setNote("");
      toast.success("یادداشت شما با موفقیت ذخیره گرددید.")
    }
  } catch (err) {
    toast.error("مشکلی پیش آمده است !");
    setShowLoading(false);
  }
}
  return (
    <Container className="Home pt-5 mt-5 pb-4">
      <Row>
      <Col lg={9} md={8} xs={11} className="mx-auto">
          <Row>
            <Col
              sm={12}
              className="shadow-sm p-3 rounded-4 d-flex align-items-center mt-md-0 mt-5"
            >
              <Link href={assignmentLink(realEstate?.assignmentType)}>
                <a className="text-decoration-none text-dark f-14">{assignment(realEstate?.assignmentType)}</a>
              </Link>
              <span className="me-2 ">
                <FontAwesomeIcon className="text-es f-14" icon={faLessThan} />
              </span>
              <Link href={"/Area/"+realEstate?.cityArea?.name}>
                <a className="text-decoration-none text-dark f-14 pe-2"> {realEstate?.cityArea?.name}</a>
              </Link>
            
           
              <span className="me-2 ">
                <FontAwesomeIcon className="text-es f-14" icon={faLessThan} />
              </span>
              <Link href={"/Rent/"+realEstate?.id}>
              <a className="text-decoration-none text-dark me-2 f-14">
              {realEstate?.name}
              </a>
              </Link>
              
            </Col>
            <Col
              sm={12}
              className="text-center mt-3 shadow-sm rounded-4 py-md-4 pt-2 pb-4 px-md-5 px-4"
            >
              <ImageGallery
                items={gallery}
                showPlayButton={false}
                showNav={false}
                lazyLoad={true}
                showFullscreenButton={false}
              />

              <div className="col-xl-7 col-md-12 col-sm-11 col-7 mx-auto d-flex flex-sm-row flex-column justify-content-around">
                <button className="btn btn-border mt-3">
                  <FontAwesomeIcon icon={faBookmark} className="ms-2" />
                  ذخیره اگهی
                </button>
                <button className="btn btn-border mt-3">
                  <FontAwesomeIcon icon={faShareNodes} className=" ms-2" />
                  ارسال اگهی
                </button>
                <button className="btn btn-border mt-3">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className=" ms-2"
                  />
                  گزارش اگهی
                </button>
              </div>
              <hr />
              <h5 className="text-end">توضیحات تکمیلی</h5>
              
            
              <div className="text-secondary" dangerouslySetInnerHTML={{ __html: realEstate?.description }} />
              
         
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={4} xs={11} className="ps-0 pe-md-3 pe-0 mx-auto mt-md-0 mt-4">
          <SideBar>
            <RentSidebarDetails
            name={realEstate?.name}
              img={null}
              time={moment(time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
              type={property(realEstate?.type)}
              location={realEstate?.cityArea?.name}
              bed={room(realEstate?.roomCount)}
              meter={meterage(realEstate?.meter)}
              price={realEstate?.price?.replace(/(\d)(?=(\d{3})+$)/g, "$1,")}
              virtual="#"
              phone={realEstate?.phoneNumber}
            />
          </SideBar>
          <textarea
            className="w-100 mt-3 rounded-3 border-es border-2"
            rows="5"
            onChange={(e)=>setNote(e.target.value)}
            value={note}
            placeholder="یادداشت شما ..."
          ></textarea>
          <div className="  pt-2 ">
            <button className="btn btn-es col f-12 col-12  me-1 "
            onClick={sendNote}
            >
              ذخیره یادداشت
            </button>
          </div>
        </Col>
       
        <h6 className="col-md-12 col-11 mx-auto pt-5 pb-4 fw-bold mt-4">
          آگهی های مشابه
        </h6>
        {realEstateList.map((data) => {
          return (
            <Estate
              key={data.id}
              myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto"
              img={data.estateImage}
              title={data.agency ? data.agency.name : "کاربر عادی"}
              profile={
                data.agency
                  ? "/uploads/advertising/" + data.agency.agencyImage
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
      <ToastContainer position="top-left" rtl={true} theme="colored" />
    </Container>
  );
}
