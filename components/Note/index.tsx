import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { Col } from "react-bootstrap"

export default (props)=>{
    return(
        <Col
        lg={12}
        className=" mt-2 shadow-es col-12 rounded-4 py-2 border text-secondary px-3 d-flex justify-content-between"
      >
        <span className="f-14">
          <FontAwesomeIcon
            icon={faPencil}
            className="text-gery ms-2"
          />
          {props.title}
        </span>
  
          <button className=" btn border-n text-decoration-none text-es f-14"
            onClick={props.getId} data-reactid={props.to}
          >
            مشاهده آگهی
          </button>

      </Col>
    )
}