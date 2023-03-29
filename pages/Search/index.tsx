import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BuySearch from '../../blocks/search/BuySearch';
import SugessBox from '../../blocks/sugess/SugessBox';
import PaginationPage from '../../components/PaginationPage';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Estate from "../../components/Estate";
import { PropertiesApi, STATICS,searchRealEstateApi,getRealEstateApi } from "../../api";
import { context } from '../../context/index';
// import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router'
import {
  property,
  room,
  meterage,
  assignment,
  advertisingStatus,
} from "../../lib/enum-converter";
import moment from 'jalali-moment';
import Link from "next/link";
export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
} 
const Buy = (props: any) => {
  const router = useRouter()
  // var { pageNumber, location, price } = router.query
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pageCount, setPageCount] = useState(10);
  const { setShowLoading } = useContext(context);
  const [properties, setProperties] = useState([]);
  const [realEstateList, setRealEstateList] = useState([]);


  useEffect(() => {
    // fetchData({ selected: router.query.pageNumber })
    getRealEstate()
  }, []);


  function getRealEstate() {
    // let searchQuery: string[] = [];
    // router.query.pageNumber = event.selected || 1;
    // console.log(router.query)
    // Object.keys(router.query).forEach((e) => {
    //   searchQuery.push(`${e}=${router.query[e]}`);
    // })

    setShowLoading(true);
    axios
      .post(searchRealEstateApi, router.query)
      .then((res) => {
        setRealEstateList(res.data);
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





  // Invoke when user click to request another page.
  const fetchData = (event: any) => {
    let searchQuery: string[] = [];
    router.query.pageNumber = event.selected || 1;
    Object.keys(router.query).forEach((e) => {
      searchQuery.push(`${e}=${router.query[e]}`);
      // console.log(`${e}=${router.query[e]}`)
    })
    console.log(typeof searchQuery)
    setShowLoading(true);
    // console.log(PropertiesApi + `/search?${searchQuery.join('&')}`);
    fetch(PropertiesApi + `/search?${searchQuery.join('&')}`).then((res) => {
      // setProperties(res.data.properties)
      if (res.status === 200) {
        setShowLoading(false);
        // setPageCount(res.data.count / itemsPerPage)
      }
    })
      .catch((err) => {
        // if (err.response?.data) {
        //   err?.response?.data?.errors?.map(issue => toast.error(issue));
        // } else {
        toast.error('مشکلی پیش آمده است !')
        // }
        setShowLoading(false);
      })
  };


  const getIdRealEstate = (e) => {
    router.push(`/Rent/${e.target.getAttribute("data-reactid")}`)
};

  return (
    <Container className="Home pt-5 mt-5 pb-4">
      
      {/* <Row>
        <Col lg={12} sm={12} className='mx-auto'><BuySearch onChange={(e) => { }} /></Col>
      </Row> */}

      {/* <SugessBox properties={properties} /> */}
<Row>


{realEstateList.length > 0 ? (
      realEstateList.map((data) => {
        return (<Estate
          key={data.id}
          myClass="p-sm-2 p-3 my-lg-0  my-2 col-lg-3 col-md-6 col-11 mx-auto"
          img={data.estateImage}
          title={(data.agency)? data.agency.name : "کاربر عادی" }
          profile={(data.agency)? "/uploads/advertising/"+data.agency.agencyImage : "/img/avatar.jpeg" }
          location={data?.cityArea?.name}
          price={data.price.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}
          bed={room(data.roomCount)}
          type={property(data.type)}
          time={moment(data.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
          meter={meterage(data.meter)}
          phoneNumber={data.phoneNumber}
          to={data.id}
          getId={getIdRealEstate}
        />);
        })
      ) : (
        <div className='col-12 d-flex justify-content-center align-items-center vh-80'>
            <div className='text-center'>
            <h1 className='h4 text-es text-center'>متاسفانه آگهی با فیلتر‌های مدنظر شما پیدا نشد!</h1>
          <Link href="/">
                  <a className="btn btn-es col-md-6 col-sm-7 col-9 rounded-3 mt-5 he-fit">
                    بازگشت به خانه
                  </a>
                </Link>
            </div>
        </div>
      )}

</Row>

      {/* <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={fetchData}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className={'pagination align-items-center'}
        pageClassName={'page-link mx-2 d-block'}
      /> */}
    </Container>
  );
}

export default Buy;