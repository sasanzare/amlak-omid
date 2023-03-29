import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faMapMarkerAlt,
  faColumns,
  faClock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Estate({
  to ,
  img,
  title,
  profile,
  meter,
  time,
  type,
  bed,
  price,
  location,
  myClass,
  phoneNumber,
  getId
}) {
  return (
    <div className={myClass}>
      <div
        className="shadow-sm text-center pb-2 overflow-hidden rounded-3  d-block hover-zoom "
        // style={{ textDecoration: "none" }}
      >
          <div className="p-0">
            <img
              src={"/uploads/advertising/" + img}
              className="w-100"
              height={155}
              onClick={getId} data-reactid={to}
            />
          </div>
          <div className="d-flex justify-content-between px-2 pt-3 dir-r">
            <div>
              <FontAwesomeIcon icon={faHome} className="text-gery ms-1" />
              <span>{type}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faBed} className="text-gery ms-1" />
              <span>{bed} خواب</span>
            </div>
          </div>
          <div className="d-flex justify-content-between px-2 pt-1 dir-r">
            <div>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-gery ms-1"
              />
              <span>{location}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faColumns} className="text-gery ms-1" />
              <span>{meter}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between px-2 pt-1 mt-4 dir-r f-13">
            <div className="text-es">
              <span>قیمت: </span>
              <span className="f-auto">{price}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} className="text-gery ms-1" />
              <span className="f-auto">{time}</span>
            </div>
          </div>
          <hr className="he-2 mb-2" />
  
        <div className="d-flex justify-content-between px-2 pb-2  dir-r">
          <div className="d-flex align-items-center">
            <img
              src={profile}
              className="rounded-circle ms-1"
              width={27}
              height={27}
            />
            <span className="f-13">{title}</span>
          </div>
          <a
            href={`tel:${phoneNumber}`}
            className="btn fw-bold btn btn-danger mb-lg-0 mt-lg-0 mt-4 mb-4 px-2  he-fit"
          >
            <FontAwesomeIcon icon={faPhone} className="ms-1" />
            تماس بگیرید
          </a>
        </div>
      </div>
    </div>
  );
}

export default Estate;
