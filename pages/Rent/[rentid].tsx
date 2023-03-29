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
import { useRouter } from 'next/router';
import Estate from "../../components/Estate";
import axios from "axios";
import { context } from "../../context";
import { ToastContainer, toast } from "react-toastify";
import {
  getRealEstateApi,ArticlesApi
} from "./../../api";
import {
  property,
  room,
  meterage,
} from "./../../lib/enum-converter";
import moment from 'jalali-moment';
export default function RentId() {
  const router = useRouter();
  const { setShowLoading } = useContext(context);
  const [realEstateList, setRealEstateList] = useState([]);
  const [realEstate, setRealEstate] = useState([]);

  useEffect(() => {
    getRealEstate();
  }, []);

  useEffect(() => {
    const { rentid } = router.query
    getRealEstateId(rentid);

  }, [router.query]);

  const images = [
    {
      original: "/img/carousel/mainPic.png",
      originalAlt: "1",
      originalClass: "rounded-4 overflow-hidden W-100",
      thumbnail: "/img/carousel/mainPic.png",
      thumbnailAlt: "1",
      thumbnailClass: "rounded-5 overflow-hidden",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      originalAlt: "2",
      originalClass: "rounded-4 overflow-hidden W-100",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
      thumbnailAlt: "2",
      thumbnailClass: "rounded-5 overflow-hidden",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      originalAlt: "3",
      originalClass: "rounded-4 overflow-hidden W-100",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      thumbnailAlt: "3",
      thumbnailClass: "rounded-5 overflow-hidden",
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


  const getRealEstate = async () => {
    setShowLoading(true);
      try {
        const resp = await axios.get(getRealEstateApi+"?number=4");
        if (resp.status === 200) {
                setShowLoading(false);
              }
              setRealEstateList(resp.data);
    } catch (err) {
        toast.error("مشکلی پیش آمده است !");
        setShowLoading(false);
    }
  }

  const getRealEstateId = async (realEstateId) => {
    setShowLoading(true);
      try {
        const resp = await axios.get(getRealEstateApi+"?id=" + realEstateId );
       
        if (resp.status === 200) {
                setShowLoading(false);
                setRealEstate(resp.data);
              }
              
              
    } catch (err) {
        toast.error("مشکلی پیش آمده است !");
        setShowLoading(false);
    }
  }

  const getIdRealEstate = (e) => {
    router.push(`/Rent/${e.target.getAttribute("data-reactid")}`)
};

  return (
    <Container className="Home pt-5 mt-5 pb-4">
      <Row>
        <Col lg={3} md={4}  xs={11} className="pe-0 ps-md-3 ps-0 mx-auto">
          <SideBar>
            <RentSidebarDetails
              img={null}
              // time={moment(realEstate?.createdAt, 'YYYY/MM/DD')?.locale('fa')?.format('YYYY/MM/DD')}
              type={property(realEstate?.type)}
              location={realEstate?.cityArea?.name}
              bed={room(realEstate?.roomCount)}
              meter={meterage(realEstate?.meter)}
              price={realEstate?.price?.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}
              virtual="#"
              phone={realEstate?.phoneNumber}
            />
          </SideBar>
          <textarea
            className="w-100 mt-3 rounded-3 border-es border-2"
            rows="5"
            placeholder="یادداشت شما ..."
          ></textarea>
          <div className=" d-flex justify-content-between align-items0-center pt-2 opacity-75">
            <button className="btn btn-es col  ms-1 f-12">املاک</button>
            <button className="btn btn-es col f-12  me-1">خرید و فروش خانه</button>
          </div>
        </Col>
        <Col lg={9} md={8} xs={11} className="mx-auto">
          <Row>
            <Col
              sm={12}
              className="shadow-sm p-3 rounded-4 d-flex align-items-center mt-md-0 mt-5"
            >
              <Link href="/">
                <a className="text-decoration-none text-dark f-14">خرید ملک</a>
              </Link>
              <span className="me-2 ">
                <FontAwesomeIcon className="text-es f-14" icon={faLessThan} />
              </span>
              <Link href="/">
                <a className="text-decoration-none text-dark me-2 f-14">
                {realEstate?.cityArea?.name}
                </a>
              </Link>
              <span className="me-2 ">
                <FontAwesomeIcon className="text-es f-14" icon={faLessThan} />
              </span>
              <span className="text-decoration-none text-dark me-2 f-14">
                آپارتمان ۱۰۰ متری دو خواب
              </span>
            </Col>
            <Col
              sm={12}
              className="text-center mt-3 shadow-sm rounded-4 py-4 px-md-5 px-4"
            >
              <ImageGallery
                items={images}
                showPlayButton={false}
                showNav={false}
                lazyLoad={true}
              />

              <div className="col-xl-7 col-md-12 col-sm-11 col-7 mx-auto d-flex flex-sm-row flex-column justify-content-around">
                <button className="btn btn-border mt-3">
                  <FontAwesomeIcon icon={faBookmark} className="ms-2" />
                  گزارش اگهی
                </button>
                <button className="btn btn-border mt-3">
                  <FontAwesomeIcon icon={faShareNodes} className=" ms-2" />
                  گزارش اگهی
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
              <p className="text-secondary">
                سلام وقت بخیر لطفا آگهی را با دقت مطالعه فرمایید.
              </p>
              <p className="text-secondary">
                همکاری با املاک صورت میگیرید(لطفا فقط در صورت داشتن مشتری تماس
                بگیرید)
              </p>
            </Col>
          </Row>
        </Col>
        <h6 className="col-md-12 col-11 mx-auto pt-5 pb-4 fw-bold mt-4">آگهی های مشابه</h6>
             {realEstateList.map((data) => {
              return (<Estate
                key={data.id}
                myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto"
                img={data.estateImage}
                title={(data.agency)? data.agency.name : "کاربر عادی" }
                profile={(data.agency)? "/uploads/advertising/"+data.agency.agencyImage : "/img/avatar.jpeg" }
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
      <ToastContainer position="top-left" rtl={true} theme="colored" />
    </Container>
  );
}
