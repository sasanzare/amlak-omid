import { Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function SideBar(props) {
  return (
    <div className="shadow rounded-4 py-4 text-center">
      <Row>{props.children}</Row>
    </div>
  );
}
