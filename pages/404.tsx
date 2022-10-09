import Link from 'next/link';
import { Container,Row,Col } from 'react-bootstrap';
import styles from '../styles/NotFound.module.css';

export default function NotFound(){

    return(
        <div className={ styles.vh95 +' NotFound d-flex align-items-center'}>
        <Container className='pt-5'>
            <Row>
                <Col className=' d-flex justify-content-end col-lg-4 col-md-5 col-sm-7 col-11 mx-auto pt-4'>
                  <div className={styles.esElevator + " bg-light rounded-4"}>
                      <div className="es-floor  d-flex justify-content-center">
                          <h3 className='text-es text-center rounded-3  px-3 pt-2 mt-1 fw-bold border'>404</h3>
                      </div>
                      <div id="doors" className={styles.esDoors + " bg-white rounded-4 shadow-sm d-flex justify-content-center align-items-center flex-column"}>
                          <p className='fw-bold'>
                          این راه به جایی نمی‌رسد!
                          </p>
                          <Link href="/">
                            <a className='btn btn-es col-md-8 col-sm-7 col-9 rounded-3 he-fit' >بازگشت به خانه</a>
                            </Link>
                      </div>
                      
                      <div className={ styles.esSwitch + " rounded-2 shadow-sm"}>
                          <Link href="/About">
                            <a></a>
                          </Link>
                          <Link href="/Contact">
                            <a></a>
                          </Link>
                      </div>
                  </div>
  
                </Col>
            </Row>
        </Container>      
    </div>
    );
}



