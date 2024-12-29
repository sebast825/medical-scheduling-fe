import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

type IConfirmModal = {
   show: boolean,
   handleClose: ()=>void,
   handleConfirm: ()=>void,
   title?: string,
   body: string
}

function ConfirmModal ({ show, handleClose, handleConfirm, title="Confirmar Acción", body }:IConfirmModal)  {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;