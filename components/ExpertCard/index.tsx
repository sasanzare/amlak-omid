import { Col } from "react-bootstrap";
export default function ExpertCard(props) {
  return (
    <Col md={4} xs={6} >
      <div className="rounded-3 shadow-sm overflow-hidden mt-4 p-0">
        <img src={props.img} className="w-100" height={150} alt={props.title} />
        <h6 className="pt-2 px-2">{props.title}</h6>
      </div>
    </Col>
  );
}
