import { Container, Row } from "react-bootstrap";
import SearchRent from "../../blocks/searchRent";
import Link from "next/link";
import Estate from "../../components/Estate";
import { context } from "../../context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import { property, room, meterage } from "./../../lib/enum-converter";
import {
    getRentRealEstate
  } from "../../api";
  import moment from "jalali-moment";

export default function Rent() {

  const router = useRouter();
  const { setShowLoading } = useContext(context);
  const [realEstateList, setRealEstateList] = useState([]);
  
useEffect(() =>{
  getRealEstate();
},[]);

  const getRealEstate = async () => {
    setShowLoading(true);
    try {
      const resp = await axios.get(getRentRealEstate );

      if (resp.status === 200) {
        setShowLoading(false);
        setRealEstateList(resp.data);
      }
    } catch (err) {
      toast.error("مشکلی پیش آمده است !");
      setShowLoading(false);
    }
  };

  const getIdRealEstate = (e) => {
    router.push(`/Rent/${e.target.getAttribute("data-reactid")}`);
  };
  return (
    <>
      <Container fluid className="bg-light pb-4">
        <SearchRent />
      </Container>

      <Container className="py-4 mt-4">
        <Row>
        {realEstateList.map((data) => {
              return (<Estate
                key={data.id}
                myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto"
                img={data.estateImage}
                title={(data.agency)? data.agency.name : "کاربر عادی" }
                profile={(data.agency)? "/uploads/advertising/"+data.agency.agencyImage : "/img/avatar.jpeg" }
                location={data.cityArea.name}
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
    </>
  );
}
