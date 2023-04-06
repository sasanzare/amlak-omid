import { Col, Row } from "react-bootstrap";
// import styles from "./index.css"
import styles from "./RequestCard.module.css";
export default (props) => {
  return (
    <Row className="pb-4 mb-4 border-bottom">
      <Col lg={3} className="pe-lg-2">
        <img
          src="/img/realState/user-pic2.png"
          className="col-lg-12 col-sm-5 rounded-3 h-100"
          alt=""
        />
        <div
          className={"col-lg-12 col-sm-5 col-6 mx-auto d-flex justify-content-between px-1 " + styles.mt33}
        >
          <button className="rounded-5 btn-es col-6 f-13">پذیرش</button>
          <button className="rounded-5 btn-danger col-sm-5 col-6 f-13">
            رد کردن
          </button>
        </div>
      </Col>
      <Col lg={9}>
        <Row>
          <Col lg={6} className="ps-lg-2 pe-lg-0 ps-2 pe-2 mt-lg-0 mt-3">
            <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
            نام و نام‌خانوادگی: 
            <span className="text-dark">{props.name}</span>
            
            </span>
          </Col>
          <Col lg={6} className="pe-lg-2 ps-2 pe-2 mt-lg-0 mt-3">
            <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
              شماره تماس: 

              <span className="text-dark">{props.number}</span>
            </span>
          </Col>
          <Col lg={6} className="ps-lg-2 pe-lg-0 ps-2 pe-2 mt-3">
            <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
              کدملی: 
              <span className="text-dark">{props.pCode}</span>
            </span>
          </Col>
          <Col lg={6} className="pe-lg-2 ps-2 pe-2 mt-3">
            <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
              کدپستی: 
              <span className="text-dark">{props.nCode}</span>
            </span>
          </Col>
          <Col lg={12} className="pe-lg-0 ps-2 pe-2 mt-3">
            <span className="btn shadow-es col-12 rounded-4 py-2 text-secondary text-end f-14">
              آدرس محل سکونت:
              <span className="text-dark">{props.address}</span>
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
