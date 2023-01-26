import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BuySearch from '../../blocks/search/BuySearch';
import SugessBox from '../../blocks/sugess/SugessBox';
import PaginationPage from '../../components/PaginationPage';
import { toast } from 'react-toastify';
// import axios from 'axios';
import { PropertiesApi, STATICS } from "../../api";
import { context } from '../../context/index';
// import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router'

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
  useEffect(() => {
    fetchData({ selected: router.query.pageNumber })
  }, []);

  // Invoke when user click to request another page.
  const fetchData = (event: any) => {
    let searchQuery: string[] = [];
    router.query.pageNumber = event.selected || 1;
    Object.keys(router.query).forEach((e) => {
      searchQuery.push(`${e}=${router.query[e]}`);
    })
    setShowLoading(true);
    console.log(PropertiesApi + `/search?${searchQuery.join('&')}`);
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



  return (
    <Container className="Home pt-5 mt-5 pb-4">
      {/* 
      <Row>
        <Col lg={12} sm={12} className='mx-auto'><BuySearch onChange={(e) => { }} /></Col>
      </Row>

      <SugessBox properties={properties} />

      <ReactPaginate
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