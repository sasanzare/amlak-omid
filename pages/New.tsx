import { Container, Row, Col } from 'react-bootstrap';
import Title from '../microComponents/Title';
import NewsForm from '../components/News/index';
import { useRouter } from 'next/router'
import { useEffect } from 'react'


function News() {
  const navigate = useRouter()
  useEffect(() => {
    let form = document.getElementById('submitForm')
    let userData = localStorage.getItem('userData');

    if (!userData) {
      navigate.push('/signin?source=news')
    }
  }, [])
  return (
    <Container className="pt-5 mt-5 pb-4">
      <Row>
        <Title title="ثبت آگهی املاک" />
        <NewsForm />
      </Row>

    </Container>
  );
}

export default News;