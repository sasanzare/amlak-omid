import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../blocks/sidebar";
import ArticleCards from "../../blocks/articleCards";
import SideBarLinks from "../../components/SideBarLinks";
import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { context } from "../../context";
import { ToastContainer, toast } from "react-toastify";
export default function ArticlesId() {
  const router = useRouter()
  const { setShowLoading } = useContext(context);
  const [articleList, setArticleList] = useState([]);
  const [article, setArticle] = useState([]);
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


  useEffect(() => {
    getArticle();
  }, []);

  useEffect(() => {
    const { articleid } = router.query
  
    getArticleById(articleid);

  }, [router.query]);



  function getArticle() {
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
          // toast.error("مشکلی پیش آمده است !");
          toast.error("مشکلی برای بارگذاری مقاله‌ها پیش آماده است!");
        }
        setShowLoading(false);
      });
  }


const getArticleById = async (postId) => {
    setShowLoading(true);
      try {
        const resp = await axios.get("/api/article?id=" + postId );
        if (resp.status === 200) {
                setShowLoading(false);
                setArticle(resp.data);
              }
              
    } catch (err) {
        toast.error("مشکلی پیش آمده است !");
        setShowLoading(false);
    }
  }

  const getId = (e) => {
      router.push(`/Articles/${e.target.getAttribute("data-reactid")}`)
  };
  return (
    <Container className="pt-5 mt-5 pb-4">
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
              <h1 className="h5 pt-2 pb-4 fw-bold">
              {article?.title}
              
              </h1>
           
              <div  dangerouslySetInnerHTML={{ __html: article?.text }}/>
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={4} className="ps-0 pe-3 d-md-block d-none">
          <SideBar>
           <SideBarLinks />
          </SideBar>
        </Col>
        <h5 className="col-md-12 col-sm-11 col-10 mx-auto pt-5 mb-0">نوشته‌های مشابه</h5>
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
