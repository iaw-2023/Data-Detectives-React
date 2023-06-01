import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onBack: () => void;
}

const MyModal: React.FC<ModalProps> = ({ show, onClose, onBack }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Advertencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Se perderá todo el progreso en la reserva del turno.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onBack}>Volver a sección Pacientes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
