
import { Col } from "react-bootstrap";
export default (props) => {
  return (
    <Col xl={3} lg={4} md={5} sm={6} xs={7} className="px-lg-3 px-md-1 px-sm-3 px-1" >
      <div className="rounded-3 shadow-sm overflow-hidden mt-4 p-0">
        <img src={`/uploads/users/${props.img}`} className="w-100" height={150} alt={props.title} />
        <h6 className="pt-2 px-2 text-secondary">{props.firstName +" "+ props.lastName}</h6>
        {props.children}
      </div>
    </Col>
  );
}