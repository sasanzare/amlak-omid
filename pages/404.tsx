import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/NotFound.module.css";
import Head from "next/head";
export default function NotFound() {
  return (
    <div className="vh-100 NotFound d-flex align-items-center">
      <Head>
        <title>صفحه ۴۰۴</title>
      </Head>
      <Container>
        <Row>
          <Col className=" d-flex justify-content-end col-lg-4 col-md-5 col-sm-7 col-11 mx-auto pt-4">
            <div className={styles.esElevator + " bg-light rounded-4"}>
              <div className="es-floor  d-flex justify-content-center">
                <h3 className="text-es text-center rounded-3  px-3 pt-2 mt-1 fw-bold border">
                  404
                </h3>
              </div>
              <div
                id="doors"
                className={
                  styles.esDoors +
                  " bg-white rounded-4 shadow-sm d-flex justify-content-center align-items-center flex-column"
                }
              >
                <p className="fw-bold">این راه به جایی نمی‌رسد!</p>
                <Link href="/">
                  <a className="btn btn-es col-md-8 col-sm-7 col-9 rounded-3 he-fit">
                    بازگشت به خانه
                  </a>
                </Link>
              </div>

              <div className={styles.esSwitch + " rounded-2 shadow-sm"}>
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
