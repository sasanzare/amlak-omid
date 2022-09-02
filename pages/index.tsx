import { Container, Row, Col } from 'react-bootstrap';
import Search from '../blocks/search/Search';
import Title from '../microComponents/Title';
import Carousel from '../blocks/carousel/Carousel';
import Sugess from '../blocks/sugess/Sugess';
import RegisterCard from '../components/RegisterCard';
import ArticleCards from '../blocks/articleCards/Cards';
import Link from 'next/link';
function Home() {
    return (
        <Container className="Home pt-5 mt-5 pb-4">
            <Row>
                <Col sm={12} className='text-center pt-3'>
                    <h1 className='h5 fw-bold' style={{ fontFamily: 'yekan' }}>
                        خرید خانه و آپارتمان با املاک امید</h1>
                    <span>جستجو خود را آغاز کنید!</span>
                </Col>
                <Col lg={10} sm={12} className='mx-auto'><Search /></Col>
                <Title title="آژانس‌های املاک برتر" />
                <Col sm={12} className='pt-5'>
                    <div dir='ltr'>
                        <Link href={'/'} className='text-decoration-none text-dark float-start'>مشاهده همه</Link>
                    </div>
                    <Carousel />
                </Col>
                <Title title="ملک فروش فوری" />
                <Col sm={12} className='pt-5'>
                    <div dir='ltr'>
                        <Link href={'/'} className='text-decoration-none text-dark float-start'>مشاهده همه</Link>
                    </div>
                    <Sugess />
                </Col>
                <Title title="ورود و ثبت‌نام" />
                <Col md={6} sm={12} className='pt-5'>
                    <RegisterCard title="ثبت‌نام رایگان کاربر" content="برای درج رایگان انواع آگهی ملک ثبت‌نام کرده و وارد حساب کاربری خود شوید." btn="ثبت نام کاربر" />
                </Col>
                <Col md={6} sm={12} className='pt-5'>
                    <RegisterCard title="ثبت‌نام پیشرفته مشاورین املاک" content="برای درج رایگان انواع آگهی ملک ثبت‌نام کرده و وارد حساب کاربری خود شوید." btn="ثبت‌نام مشاور" />
                </Col>
                <Title title="مجله املاک ساسان" />

                <ArticleCards />
            </Row>
        </Container>
    );
}

export default Home;