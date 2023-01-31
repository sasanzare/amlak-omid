import { Container, Row, Col } from "react-bootstrap";
import Search from "../blocks/search/Search";
import Title from "../microComponents/Title";
import Carousel from "../blocks/carousel/Carousel";
import Sugess from "../blocks/sugess/Sugess";
import RegisterCard from "../components/RegisterCard";
import ArticleCards from "../blocks/articleCards/";
import Card from "../components/CardEstae";
import Estate from "../components/Estate";
import Link from "next/link";
import { context } from "../context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter,Router } from 'next/router'

function Home() {
  const router = useRouter()

  const { setShowLoading } = useContext(context);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    get();
  }, []);

  function get() {
    setShowLoading(true);
    axios
      .get("/api/article?number=3")
      .then((res) => {
        setArticleList(res.data);
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

  const offices = [
    {
      title: "آژانس املاک سینا",
      img: "./img/card1.png",
    },
    {
      title: "آژانس املاک صادقیه",
      img: "./img/card2.png",
    },
    {
      title: "آژانس املاک خروشان",
      img: "./img/card3.png",
    },
    {
      title: "آژانس املاک فدک",
      img: "./img/card4.png",
    },
    {
      title: "آژانس املاک بهینه",
      img: "./img/card5.png",
    },
  ];

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
  ];

  const getId = (e) => {
      router.push(`/Articles/${e.target.getAttribute("data-reactid")}`)
    
  };
  return (
    <Container className="Home pt-5 mt-5 pb-4">
      <Row>
        <Col sm={12} className="text-center pt-3">
          <h1 className="h5 fw-bold f-yekan">
            خرید خانه و آپارتمان با املاک امید
          </h1>
          <span>جستجو خود را آغاز کنید!</span>
        </Col>
        <Col lg={10} sm={12} className="mx-auto">
          <Search />
        </Col>
        <Title title="آژانس‌های املاک برتر" />
        <Col sm={12} className="pt-5">
          <Row>
            <div className="col-sm-12 col-11 mx-auto" dir="ltr">
              <Link href={"/Agencies"}>
                <a className="text-decoration-none text-secondary float-start">
                  مشاهده همه
                </a>
              </Link>
            </div>
            {offices.map((office, index) => (
              <Card
                key={index}
                img={office.img}
                title={office.title}
                myclass="p-sm-2 p-3 col-lg col-sm-4 col-6 mx-auto"
              />
            ))}
          </Row>
        </Col>
        <Title title="ملک فروش فوری" />
        <Col sm={12} className="pt-5">
          {/* <Sugess /> */}

          <Row>
            <div className="col-sm-12 col-11 mx-auto" dir="ltr">
              <Link href={"/"}>
                <a
                  href=""
                  className="text-decoration-none text-secondary float-start"
                >
                  مشاهده همه
                </a>
              </Link>
            </div>
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
        </Col>
        <Title title="ورود و ثبت‌نام" />
        <Col md={6} className="pt-5 col-11 mx-auto">
          <RegisterCard
            title="ثبت‌نام رایگان کاربر"
            content="برای درج رایگان انواع آگهی ملک ثبت‌نام کرده و وارد حساب کاربری خود شوید."
            btn="ثبت نام کاربر"
          />
        </Col>
        <Col md={6} className="pt-5 col-11 mx-auto">
          <RegisterCard
            title="ثبت‌نام پیشرفته مشاورین املاک"
            content="برای درج رایگان انواع آگهی ملک ثبت‌نام کرده و وارد حساب کاربری خود شوید."
            btn="ثبت‌نام مشاور"
          />
        </Col>
        <Title title="مجله املاک ساسان" />

        {articleList?.map((card) => (
          <ArticleCards
            key={card.id}
            img={card.articleImage}
            title={card.title}
            content={card.summary}
            id={card.id}
            getId={getId}
          />
        ))}
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Home;
