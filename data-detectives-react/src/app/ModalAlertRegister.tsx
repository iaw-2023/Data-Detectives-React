import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
  onBack: () => void;
}

const ModalRegister: React.FC<ModalProps> = ({ show, message, onClose, onBack }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered={!isTabletOrMobile}
    >
      <Modal.Header closeButton>
        <Modal.Title>Advertencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { message }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onBack}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegister;