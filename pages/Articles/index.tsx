import { Container, Row, Col } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Title from "../../microComponents/Title";
import ArticleCards from "../../blocks/articleCards";
import { useState, useEffect, useContext } from "react";
import { context } from "../../context";
import axios from "axios";

export default function Articles() {
  const { setShowLoading } = useContext(context);
  const [articleList, setarticleList] = useState([]);


 

  useEffect(() => {
    get();
  }, []);

 

  function get() {
    setShowLoading(true);
    axios
      .get("/api/article")
      .then((res) => {
        setarticleList(res.data);
        if (res.status === 200) {
          setShowLoading(false);
          // setPageCount(res.data.count / itemsPerPage)
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



  const data = [
    {
      img: "./img/article1.png",
      title: "خرید خانه در شیراز",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article2.png",
      title: "خرید خانه در تهران",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article3.png",
      title: "نکات قبل از خرید ملک",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article1.png",
      title: "خرید خانه در شیراز",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article2.png",
      title: "خرید خانه در تهران",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article3.png",
      title: "نکات قبل از خرید ملک",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article1.png",
      title: "خرید خانه در شیراز",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article2.png",
      title: "خرید خانه در تهران",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
    {
      img: "./img/article3.png",
      title: "نکات قبل از خرید ملک",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،",
      href: "",
    },
  ];
  let paginationConfig = {
    totalPages: 22,
    currentPage: 15,
    showMax: 5,
    size: "lg",
    threeDots: true,
    prevNext: true,
    href: "http://localhost/items?page=*",
    pageOneHref: "http://localhost/items",
    borderColor: "red",
    activeBorderColor: "black",
    activeBgColor: "grey",
    disabledBgColor: "red",
    activeColor: "red",
    color: "purple",
    disabledColor: "green",
    circle: true,
    shadow: true,
  };
  return (
    <Container className="pt-5 pb-4 mt-3">
      <Row>
        <Title title="مجله‌های املاک امید" />
        {data.map((item, index) => (
          <ArticleCards
          key={index}
            data={data}
            img={item.img}
            title={item.title}
            content={item.content}
            myClass="pt-4 px-3 mt-2"
          />
        ))}
       {/* {articleList?.map((data, i) => (
          <ArticleCards
            key={i}
            data={data}
            img={data.articleImage}
            title={data.title}
            content={data.text}
            myClass="pt-4 px-3 mt-2"
          />
        ))} */}



        <Col lg={5} md={6} className="mx-auto">
          {/* <Pagination {...paginationConfig} /> */}
        </Col>
      </Row>
    </Container>
  );
}
