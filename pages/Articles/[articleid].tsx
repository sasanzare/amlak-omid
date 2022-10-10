import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../blocks/sidebar";
import ArticleCards from "../../blocks/articleCards";
import SideBarLinks from "../../components/SideBarLinks";
export default function ArticlesId() {
    const data = [
        {
          img: "/img/article1.png",
          title: "خرید خانه در شیراز",
          content:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
        },
        {
          img: "/img/article2.png",
          title: "خرید خانه در تهران",
          content:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
        },
        {
          img: "/img/article3.png",
          title: "نکات قبل از خرید ملک",
          content:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
        },
      ];
  return (
    <Container className=" pt-5 mt-5 pb-4">
      <Row>
        <Col lg={9} md={8} sm={11} xs={10} className="mx-auto">
          <Row>
            <Col
              sm={12}
              className="shadow-sm p-3 rounded-4 d-flex align-items-center"
            >
              <Link href="/">
                <a className="text-decoration-none text-dark ">خانه</a>
              </Link>
              <span className="me-2 pt-1">
                <FontAwesomeIcon className="text-es" icon={faLessThan} />
              </span>
              <Link href="/Articles">
                <a className="text-decoration-none text-dark me-2">
                  مجله املاک
                </a>
              </Link>
              <span className="me-2 pt-1">
                <FontAwesomeIcon className="text-es" icon={faLessThan} />
              </span>
              <span className="me-2 ">نویسنده: مدیر سایت</span>
            </Col>
            <Col
            md={12}
              xs={12}
              className="text-center  mt-3 shadow-sm rounded-4 py-4 px-4"
            >
              <h1 className="h5 pt-2 pb-4 fw-bold">ثبت نام بیش از ۹۸۰۰ نفر</h1>
              <p>
                ایخود برایمسکناقدامکنند نهضت ملیمسکنیکیاز سیاستهایکلاندولت
                ســــــیزدهمدر حوزه مســـکناست که بر اساساین سیاست، احداث۴
                میلیــــونواحد مسکونیدر ۴ سالد برنامه ایندولت قرار گرفته است.
                متقاضیانواقعیمسکنمیتوانند با داشتنچهار شرطتاهلو سرست خانوا بودن،
                حداقل سابقه۵ سال سکونت در شهر موردتقاضا، فاقد مالکیت خصوصیو در
                نهایت .عدماستفاده از امکاناتدولتیاز اولانقلابدر حوزه
              </p>
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={4} className="ps-0 pe-3 d-md-block d-none">
          <SideBar>
           <SideBarLinks />
          </SideBar>
        </Col>
        <h5 className="col-md-12 col-sm-11 col-10 mx-auto pt-5 mb-0">نوشته‌های مشابه</h5>
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
