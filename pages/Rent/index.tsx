import { Container,Row } from "react-bootstrap";
import SearchRent from "../../blocks/searchRent";
import Link from "next/link";
import Estate from "../../components/Estate";

export default function Rent() {
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
    return(
        <>
                <Container fluid className="bg-light pb-4">
             <SearchRent />

        </Container>
        
        <Container className="py-4 mt-4">
        <Row>
            {suggested.map((suggest,index) => (
              <Estate key={index} myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto" img={suggest.img} title={suggest.title} profile={suggest.profile} location={suggest.location} price={suggest.price} bed={suggest.bed} type={suggest.type} time={suggest.time} meter={suggest.meter} />
            ))}
          </Row>
        </Container>
        </>

       
    );
}