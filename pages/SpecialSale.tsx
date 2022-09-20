import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import BuySearch from "../blocks/search/BuySearch";
import SugessBox from "../blocks/sugess/SugessBox";
import PaginationPage from "../components/PaginationPage";
import { toast } from "react-toastify";
import axios from "axios";
import { PropertiesApi, STATICS } from "../api";
import { context } from "../context/index";
import ReactPaginate from "react-paginate";
import Title from "../microComponents/Title";
import Estate from "../components/Estate";
import Link from "next/link";

function SpecialSale() {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pageCount, setPageCount] = useState(10);

  const { setShowLoading } = useContext(context);
  const [properties, setProperties] = useState([]);

  const fetchproperties = () => {
    setShowLoading(true);
    axios
      .get(PropertiesApi + `?pageNumber=1&pageSize=${itemsPerPage}`)
      .then((res) => {
        setProperties(res.data.properties);
        if (res.status === 200) {
          setShowLoading(false);
          setPageCount(res.data.count / itemsPerPage);
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
  };

  useEffect(() => {
    fetchproperties();
  }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setShowLoading(true);
    axios
      .get(
        PropertiesApi +
          `?pageNumber=${event.selected + 1}&pageSize=${itemsPerPage}`
      )
      .then((res) => {
        setProperties(res.data.properties);
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
  };

  const suggested = [
    {
      img: "./img/es1.png",
      title: "کاربرعادی",
      profile: "./img/profile2.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "2",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "160",
    },
    {
      img: "./img/es2.png",
      title: "کاربرعادی",
      profile: "./img/profile1.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "3",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "200",
    },
    {
      img: "./img/es1.png",
      title: "کاربرعادی",
      profile: "./img/profile2.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "2",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "160",
    },
    {
      img: "./img/es2.png",
      title: "کاربرعادی",
      profile: "./img/profile1.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "3",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "200",
    },
    {
      img: "./img/es2.png",
      title: "کاربرعادی",
      profile: "./img/profile1.png",
      location: "معالی‌آباد",
      price: "2.7 میلیارد",
      bed: "3",
      type: "مسکونی",
      time: "۳ روز پیش",
      meter: "200",
    },
    {
      img: "./img/es2.png",
      title: "کاربرعادی",
      profile: "./img/profile1.png",
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
      <Title title="املاک مزایده ای فروش فوری" />

      <Col className="rounded-3 mt-4 overflow-hidden">
        <Row>
          <Col lg={4} className="text-center py-4 pe-3 ps-1 bg-light">
            <h5 className="pt-1">زمان باقی‌مانده درفروش فوری</h5>
            <div className="d-flex flex-column justify-content-between h-100 pt-3 pb-4">
              <div className="d-flex justify-content-between">
                <Col>
                  <div className="btn btn-es col-9">
                    <span className="d-block h3">12</span>
                    <span className="h5">دقیقه</span>
                  </div>
                </Col>
                <Col>
                  <div className="btn btn-es col-9">
                    <span className="d-block h3">8</span>
                    <span className="h5">ساعت</span>
                  </div>
                </Col>
                <Col>
                  <div className="btn btn-es col-9">
                    <span className="d-block h3">2</span>
                    <span className="h5">روز</span>
                  </div>
                </Col>
              </div>
              <Link href="">
                <a className="btn btn-es fw-bold col-11 mx-auto mb-3 py-2">
                  مشاهده جزییات ملک
                </a>
              </Link>
            </div>
          </Col>
          <Col lg={8} className="pe-0">
            <Carousel controls={false} fade>
              <Carousel.Item interval={5000}>
                <img
                  className="d-block w-100 h-330x"
                  src="./img/carousel/mainPic.png"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  className="d-block w-100 h-330x"
                  src="./img/carousel/mainPic2.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Col>

      <Title title="لیست تمامی املاک فروش فوری" classes="mt-5" />

      <Row className="mt-4">
        {suggested.map((suggest) => (
          <Estate
            myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6"
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

      {/* 
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className={'pagination align-items-center'}
        pageClassName={'page-link mx-2 d-block'}
      /> */}
    </Container>
  );
}

export default SpecialSale;
