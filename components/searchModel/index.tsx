import { Modal } from "react-bootstrap";
export default function SearchModel(props) {
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="dir-r"
    >
      <Modal.Header>
      
        <Modal.Title id="contained-modal-title-vcenter">
         <span className="text-muted">{props.title}</span> 
        </Modal.Title>
        <button className="btn-close ms-0"  onClick={props.onCancel}></button>
        
      </Modal.Header>
      <Modal.Body className="p-5">{props.children}</Modal.Body>
      <Modal.Footer className="dir-r d-flex justify-content-center">
        <button  onClick={props.onCancel} className="btn btn-es col-xl-3 col-md-4 col-5">
          بستن
        </button>
      </Modal.Footer>
    </Modal>
  );
}
