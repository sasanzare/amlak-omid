import {Container,Row,Col} from 'react-bootstrap';
import List from '../../components/list/List'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInstagram,faFacebook,faPinterest} from '@fortawesome/free-brands-svg-icons'
function Footer() {
  const list1 = [
        {
          'title': 'درباره ما',
          'href' : '/About',
        },
        {
          'title': 'ارتباط‌ باما',
          'href' : '/Contact',
        },
        {
          'title': 'بلاگ',
          'href' : '/Articles',
        },
        {
          'title': 'تبلیغات',
          'href' : '/AdvisorDetail',
        },
      
  ];
  const list2 = [
    {
      'title': 'ورود و ثبت‌‌نام مشاورین املاک',
      'href' : '/signin?goTo=/profile/agency'
    },
    {
      'title':'ورود و ثبت‌نام کاربر',
      'href' : '/signin?goTo=/'
    },
    {
      'title':'قوانین درج‌ ‌آگهی',
      'href' : '/Rules'
    },
    {
      'title': 'سوالات متداول',
      'href' : '/Faq'
    },
  ];
  return (
        <Container fluid className='Footer bg-light mt-5 px-lg-4 pt-3'>
          <Row>
            <Col md={4} sm={12} className='border-start border-3'>
              <List lists={list1}/>
            </Col>
            <Col md={4} sm={12} className='border-start border-3'>
              <List lists={list2}/>
            </Col>
            <Col md={4} sm={12} className='border-3 d-flex justify-content-between align-items-center'>
              <img src='/img/enamad1.png' className='w-100' />
              <img src='/img/enamad2.png' className='w-100'/>
              <img src='/img/enamad3.png' className='w-100'/>
            </Col>
            <Col sm={12} className='pt-3 px-4'>
              <div className='d-flex flex-md-row flex-column text-sm-center justify-content-md-between border-top border-3 pt-3'>
                  <p className='text-sm-center'>کلیه حقوق این سایت متعلق به گروه املاک امیداست.</p>
                  <div>
                    <FontAwesomeIcon className='text-secondary h4 ms-3' icon={faPinterest} />
                    <FontAwesomeIcon className='text-secondary h4 ms-3' icon={faInstagram} />
                    <FontAwesomeIcon className='text-secondary h4' icon={faFacebook} />
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
  );
}

export default Footer;



