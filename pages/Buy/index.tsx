import { Container, Row } from "react-bootstrap";
import SearchBuy from "../../blocks/searchBuy";
import Link from "next/link";
import Estate from "../../components/Estate";
import { context } from "../../context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import { property, room, meterage } from "../../lib/enum-converter";
import {
  getBuyRealEstate
} from "../../api";
import moment from "jalali-moment";

export default () => {

  const router = useRouter();
  const { setShowLoading } = useContext(context);
  const [realEstateList, setRealEstateList] = useState([]);

  useEffect(() => {
    getRealEstate();
  }, []);

  const getRealEstate = async () => {
    setShowLoading(true);
    try {
      const params = router.query; // Get the route parameters

      const resp = await axios.get(getBuyRealEstate, { params });


      console.log('fuck')
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
    router.push(`/Buy/${e.target.getAttribute("data-reactid")}`);
  };


  // Invoke when user click to request another page.
  // const fetchData = (event: any) => {
  //   let searchQuery: string[] = [];
  //   router.query.pageNumber = event.selected || 1;
  //   Object.keys(router.query).forEach((e) => {
  //     searchQuery.push(`${e}=${router.query[e]}`);
  //   })
  //   setShowLoading(true);
  //   console.log(PropertiesApi + `/search?${searchQuery.join('&')}`);
  //   fetch(PropertiesApi + `/search?${searchQuery.join('&')}`).then((res) => {
  //     // setProperties(res.data.properties)
  //     if (res.status === 200) {
  //       setShowLoading(false);
  //       // setPageCount(res.data.count / itemsPerPage)
  //     }
  //   })
  //     .catch((err) => {
  //       // if (err.response?.data) {
  //       //   err?.response?.data?.errors?.map(issue => toast.error(issue));
  //       // } else {
  //       toast.error('مشکلی پیش آمده است !')
  //       // }
  //       setShowLoading(false);
  //     })
  // };
  return (
    <>
      <Container fluid className="bg-light pb-4">
        <SearchBuy />
      </Container>

      <Container className="py-4 mt-4">
        <Row>
          {realEstateList.map((data) => {
            return (<Estate
              key={data.id}
              myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto"
              img={data.estateImage}
              title={(data.agency) ? data.agency.name : "کاربر عادی"}
              profile={(data.agency) ? "/uploads/advertising/" + data.agency.agencyImage : "/img/avatar.jpeg"}
              location={data.cityArea.name}
              price={data.price}
              bed={room(data.roomCount)}
              type={property(data.type)}
              time={moment(data.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
              meter={data.meter}
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
