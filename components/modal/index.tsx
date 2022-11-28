import { Modal, Button } from "react-bootstrap";
export default function FormModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="dir-r"
    >
      <Modal.Header>
      
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
        <button className="btn-close ms-0"  onClick={props.onCancel}></button>
        
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer className="dir-r">
        <Button variant="secondary" onClick={props.onCancel}>
          لفو
        </Button>
        <Button
          variant="success"
          type="submit"
          onClick={props.onSave}
        >
          دخیره
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
