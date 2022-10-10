import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneFlip
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function AgencieSidebarDetails(props) {
  return (
    <div className="px-4 ">
        <img
          src={props.img ? props.img : "/img/avatar.jpeg"}
          className="w-75"
          alt=""
        />
     
      <div className="border-bottom pb-2 text-secondary">
        <small>{props.title}</small>
        
      </div>
      <div className="d-flex justify-content-between  border-bottom py-2 px-1 text-secondary">
          <small>نام مدیر</small>
        
        <small>{props.manager}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom py-2 px-1 text-secondary">
          <small>حوزه فعالیت</small>
        
        <small>{props.location}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom py-2 px-1 text-secondary">
        
          <small>تعداد ملک</small>
        
        <small>{props.case}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom py-2 px-1 text-secondary">
      
          <small>تعداد مشاورین</small>
        
        <small>{props.expert}</small>
      </div>
      <div className="d-flex justify-content-between  border-bottom py-2 px-1 text-secondary">
       
          <small>شماره تماس</small>
        
        <small className="dir-l">{props.phone}</small>
      </div>
   
      <div className="pt-3 text-secondary col-md-12 col-sm-6 col-7 mx-auto">
        <Link href={"tel:" +props.phone+""}>
          <a className=" px-2 py-1 rounded-3 text-decoration-none border btn-es col-10 d-flex justify-content-between mx-auto">
          <FontAwesomeIcon icon={faPhoneFlip} className="ms-1 mt-1" />
            تماس با آژانس
            
          </a>
        </Link>
      </div>


    </div>
  );
}
