import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function FormModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={props.onCancel}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
                {/* <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p> */}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { props.onSave() }}>save</Button>
                <Button variant="secondary" onClick={props.onCancel}>cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

