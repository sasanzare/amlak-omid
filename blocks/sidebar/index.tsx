import { Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function SideBar(props) {
  return (
    <div className="shadow rounded-4 py-4 text-center">
      <Row>
        <Col sm className="dir-r pt-1  fw-bold h3 text-center">
          <Link href="/">
            <span className="text-decoration-none text-es">Amlak Omid</span>
          </Link>
        </Col>
        <h3 className="h6 text-secondary">آژانس مشاوره املاک امید</h3>
        <p className="col-10 mx-auto pt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
        <Col sm={12}>
        {props.children}
        </Col>
      </Row>
    </div>
  );
}
