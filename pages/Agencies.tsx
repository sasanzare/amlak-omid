import { Container, Form, Button,Row } from "react-bootstrap";
import Card from "../components/CardEstae";
import BgTop from "../components/bgTop/BgTop";
import Title from "../microComponents/Title";

export default function Agencies() {
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
  return (
    <div className="About mt-5">
      <BgTop img="./img/bg-about.png" content="جستجوی آسان آژانس املاک" myClass="h4">
        <Form className="d-flex justify-content-center  col-md-5 col-sm-7 col-11 mx-auto mt-2">
          <Form.Group className="col-xl-7 col-lg-8 col-md-9 col-sm-9 col-9">
            <Form.Control type="text" className="py-3" style={{ borderRadius: '0 20px 20px 20px'}}  placeholder="نام آژانس مورد نظر را وارد کنید" />
          </Form.Group>
          <Button className="btn btn-es me-1 col-xl-2 col-lg-3 col-md-4 col-sm-3 col-3" style={{ borderRadius: '20px 0 20px 20px'}} type="submit">
            جستجو
          </Button>
        </Form>
      </BgTop>
      <Container>
        <Row>
            <Title title="آژانس‌های املاک برتر" classes="mb-4" />
        {offices.map((office) => (
              <Card
                key={office.img}
                img={office.img}
                title={office.title}
                myclass=" p-lg-1 p-sm-2 p-3 col-lg col-sm-4 "
              />
            ))}
            <Title title="همه آژانس‌های املاک" classes="mb-4 mt-5" />
        {offices.map((office) => (
              <Card
                key={office.img}
                img={office.img}
                title={office.title}
                myclass=" p-lg-1 p-sm-2 p-3 col-lg col-sm-4 "
              />
            ))}
        </Row>
      </Container>
    </div>
  );
}
