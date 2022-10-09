// import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faMapMarkerAlt,
  faColumns,
  faClock,
  faMoneyBill1Wave,
  faCirclePlay,
  faPhoneFlip
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function RentSidebarDetails(props) {
  return (
    <div className="px-4">
      <div>
        <img
          src={props.img ? props.img : "/img/avatar.jpeg"}
          className="w-25 rounded-circle"
          alt=""
        />
      </div>
      <div className="d-flex justify-content-between  border-bottom pt-3 text-secondary">
        <small>کاربر شماره 245</small>
        <div>
          <FontAwesomeIcon icon={faClock} className=" ms-1" />
          <small>{props.time}</small>
        </div>
      </div>
      <h6 className="pt-4 fw-bold">آپارتمان فرهنگشهر 110 متر دوخوابه</h6>
      <div className="d-flex justify-content-between  border-bottom pt-3 text-secondary">
        <div>
          <FontAwesomeIcon icon={faHome} className=" ms-1" />
          <small>نوع ملک</small>
        </div>
        <small>{props.type}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom pt-3 text-secondary">
        <div>
          <FontAwesomeIcon icon={faMapMarkerAlt} className=" ms-1" />
          <small>آدرس</small>
        </div>
        <small>{props.location}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom pt-3 text-secondary">
        <div>
          <FontAwesomeIcon icon={faBed} className=" ms-1" />
          <small>تعداد خواب</small>
        </div>
        <small>{props.bed}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom pt-3 text-secondary">
        <div>
          <FontAwesomeIcon icon={faColumns} className="ms-1" />
          <small>متراژ</small>
        </div>
        <small>{props.bed}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom pt-3 text-secondary">
        <div>
          <FontAwesomeIcon icon={faMoneyBill1Wave} className="ms-1" />
          <small>قیمت</small>
        </div>
        <small>{props.price}</small>
      </div>
      <div className="border-bottom py-3 text-secondary opacity-75">
        <Link href={props.virtual}>
          <a className="btn btn-es col-11 d-flex justify-content-between mx-auto">
          <FontAwesomeIcon icon={faCirclePlay} className="ms-1 mt-1" />
            بازدید مجازی
            
          </a>
        </Link>
      </div>
      <div className="pt-3 text-secondary">
        <Link href={"tel:" +props.phone+""}>
          <a className=" px-2 py-1 rounded-3 text-decoration-none border btn-es col-10 d-flex justify-content-between mx-auto">
          <FontAwesomeIcon icon={faPhoneFlip} className="ms-1 mt-1" />
            تماس با آگهی دهنده
            
          </a>
        </Link>
      </div>


    </div>
  );
}
