import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { getFastRealEstate, getSpecial } from "../api";
import { context } from "../context/index";
import Title from "../microComponents/Title";
import Estate from "../components/Estate";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  property,
  room,
  meterage,
} from "./../lib/enum-converter";
import moment from 'jalali-moment'

function SpecialSale() {
  const router = useRouter();
  const [realEstateList, setRealEstateList] = useState([]);
  const [special, setSpecial] = useState([]);
  const { setShowLoading } = useContext(context);
  const [time, setTime] = useState("2002-06-08T18:45:23.961Z");
  const [timeCounter, setTimeCounter] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  
  useEffect(() => {
    getSpecialReal();
    getRealEstate();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      counter(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  
  function counter(time: string){
    const initialDate = new Date(time);
    const newDate = new Date(initialDate);
    newDate.setDate(initialDate.getDate() + 30);
    const differenceInMilliseconds = (new Date(newDate.toISOString())) - (new Date());
    const counter = {
      days: Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor(differenceInMilliseconds / (1000 * 60 * 60)) % 24,
      minutes: Math.floor(differenceInMilliseconds / (1000 * 60)) % 60,
      seconds: Math.floor(differenceInMilliseconds / 1000) % 60
    };
    setTimeCounter(counter);
    console.log(counter)
    // return counter;
  }
  
  function getSpecialReal() {
    setShowLoading(true);
    axios
      .get(getSpecial)
      .then((res) => {
        if (res.status === 200) {
          setShowLoading(false);
          setSpecial(res.data);
          setTime(res.data.createdAt)
          console.log(res.data.createdAt)
         
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
  
  function getRealEstate() {
    setShowLoading(true);
    axios
      .get(getFastRealEstate)
      .then((res) => {
        if (res.status === 200) {
          setShowLoading(false);
          setRealEstateList(res.data);
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
    router.push(`/Rent/${e.target.getAttribute("data-reactid")}`)
};
  return (
    <Container className="Home pt-5 mt-5 pb-4">
      <Title title="املاک فروش فوری" classes={undefined} />

      <Col className="rounded-3 mt-4 overflow-hidden">
        <Row>
          <Col lg={4} className="text-center py-4 pe-3 ps-1 bg-light">
            <h5 className="pt-1">زمان باقی‌مانده درفروش فوری</h5>
            <div className="d-flex flex-column justify-content-between h-100 pt-3 pb-4">
              <div className="d-flex justify-content-between">
                <Col>
                  <div className="btn btn-es col-9">
                    <span className="d-block h3">{timeCounter.minutes}</span>
                    <span className="h5">دقیقه</span>
                  </div>
                </Col>
                <Col>
                  <div className="btn btn-es col-9">
                    <span className="d-block h3">{timeCounter.hours}</span>
                    <span className="h5">ساعت</span>
                  </div>
                </Col>
                <Col>
                  <div className="btn btn-es col-9">
                    <span className="d-block h3">{timeCounter.days}</span>
                    <span className="h5">روز</span>
                  </div>
                </Col>
              </div>
              <Link href={"/Rent/"+ special?.id}>
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
                  src={"/uploads/advertising/"+special?.estateImage}
                  alt={special?.name}
                />
              </Carousel.Item>
              {special?.gallery?.map((items)=>{
                return(
                  <Carousel.Item interval={5000} key={items.id}>
                  <img
                    className="d-block w-100 h-330x"
                    src={"/uploads/advertising/"+items.Photos}
                    alt={items?.id}
                  />
                  </Carousel.Item>
                )
              })}
        
            </Carousel>
          </Col>
        </Row>
      </Col>

      <Title title="لیست تمامی املاک فروش فوری" classes="mt-5" />

      <Row className="mt-4">
      {realEstateList.map((data) => {
              return (<Estate
                key={data.id}
                myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto"
                img={data.estateImage}
                title={(data?.agency?.name)? data?.agency?.name : "املاک" }
                profile={(data?.agency?.agencyImage)? "/uploads/agency/"+data.agency.agencyImage : "/img/avatar.jpeg" }
                location={data?.cityArea?.name}
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
    </Container>
  );
}

export default SpecialSale;
