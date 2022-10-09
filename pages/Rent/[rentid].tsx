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


import Estate from "../../components/Estate";

export default function RentId() {
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
  return (
    <Container className="Home pt-5 mt-5 pb-4">
      <Row>
        <Col md={3} className="pe-0 ps-3 ">
          <SideBar>
            <RentSidebarDetails
              img={null}
              time="سه روز پیش"
              type="مسکونی"
              location="محله معالی آباد"
              bed="2"
              meter="110"
              price="2,700,000,000"
              virtual="#"
              phone="+989059048626"
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
        <Col md={9} sm={12}>
          <Row>
            <Col
              sm={12}
              className="shadow p-3 rounded-4 d-flex align-items-center"
            >
              <Link href="/">
                <a className="text-decoration-none text-dark ">خرید ملک</a>
              </Link>
              <span className="me-2 pt-1">
                <FontAwesomeIcon className="text-es" icon={faLessThan} />
              </span>
              <Link href="/">
                <a className="text-decoration-none text-dark me-2">
                  محله معالی آباد
                </a>
              </Link>
              <span className="me-2 pt-1">
                <FontAwesomeIcon className="text-es" icon={faLessThan} />
              </span>
              <span className="text-decoration-none text-dark me-2">
                آپارتمان ۱۰۰ متری دو خواب
              </span>
            </Col>
            <Col
              sm={12}
              className="text-center mt-3 shadow rounded-4 py-4 px-md-5 px-4"
            >
              <ImageGallery
                items={images}
                showPlayButton={false}
                showNav={false}
                lazyLoad={true}
              />

              <div className="col-xl-7 col-md-9 col-sm-10 col-8 mx-auto d-flex flex-sm-row flex-column justify-content-around">
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
        <h6 className="col-12 pt-5 pb-4 fw-bold mt-4">آگهی های مشابه</h6>
        {suggested.map((suggest, index) => (
              <Estate
                key={index}
                myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto"
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
    </Container>
  );
}
