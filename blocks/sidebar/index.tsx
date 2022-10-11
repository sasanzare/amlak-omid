import { Row} from "react-bootstrap";
export default function SideBar(props) {
  return (
    <div className="shadow-sm rounded-4 py-4 text-center bg-white">
      <Row>{props.children}</Row>
    </div>
  );
}
