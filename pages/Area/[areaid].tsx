import { Container, Row } from "react-bootstrap";
import SearchRent from "../../blocks/searchRent";
import Link from "next/link";
import Estate from "../../components/Estate";
import { context } from "../../context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import { property, room, meterage,assignment } from "./../../lib/enum-converter";
import {
    getRealEstateApi,getRealEstateByArea
  } from "../../api";
  import moment from "jalali-moment";




export default () => {
    const router = useRouter();
    const { setShowLoading } = useContext(context);
    const [realEstateList, setRealEstateList] = useState([]);
    useEffect(() => {
        const { areaid } = router.query;
        getRealEstate(areaid);
      }, [router.query]);

  function getRealEstate(cityAreaId) {
    setShowLoading(true);
    axios
      .post(getRealEstateByArea, {
        cityAreaId,
      }, {
        headers: {
          Authorization: `${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
       
        if (res.status === 200) {
          setRealEstateList(res.data);
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

  const getIdRealEstate = (e) => {
    router.push(`/Rent/${e.target.getAttribute("data-reactid")}`);
  };
  return (
    <>
      <Container fluid className="bg-light pb-4">
        {/* <SearchRent /> */}
      </Container>

      <Container className="py-4 mt-5">
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
        <ToastContainer position="top-left" rtl={true} theme="colored" />
      </Container>
    </>
  );
}
