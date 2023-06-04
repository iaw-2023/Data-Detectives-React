import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onBack: () => void;
}

const MyModal: React.FC<ModalProps> = ({ show, onClose, onBack }) => {
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
        Se perderá todo el progreso en la reserva del turno.
      </Modal.Body>
      <Modal.Footer>
        {!isTabletOrMobile && (
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        )}
        <Button variant="primary" onClick={onBack}>
          {isTabletOrMobile ? 'Volver' : 'Volver a sección Pacientes'}
        </Button>
        {isTabletOrMobile && (
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
