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
function Home() {
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

  const data = [
    {
      img: "./img/article1.png",
      title: "خرید خانه در شیراز",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
    },
    {
      img: "./img/article2.png",
      title: "خرید خانه در تهران",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
    },
    {
      img: "./img/article3.png",
      title: "نکات قبل از خرید ملک",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
    },
  ];
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
              <Link href={"/"}>
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

        {data.map((card, index) => (
          <ArticleCards
            key={index}
            img={card.img}
            title={card.title}
            content={card.content}
          />
        ))}
      </Row>
    </Container>
  );
}

export default Home;
