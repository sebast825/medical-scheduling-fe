import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TurnoCreateRequestDTO } from '../../types/turno/TurnoCreateRequest.DTO.type';

interface IConfirmModal {
   show: boolean,
   handleClose: ()=>void,
   handleConfirm: (e:TurnoCreateRequestDTO)=>void,
   title?: string,
   createRequest : TurnoCreateRequestDTO,
   paciente: string,
   medico: string,
   fecha: string
}



function CreatTurnoModal ({ show, handleClose, handleConfirm, title="Crear Turno", createRequest,paciente,medico,fecha }:IConfirmModal)  {
  
  
   return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <h2>Medico {medico}</h2>
         <h2>Paciente {paciente}</h2>
         <h2>Fecha {fecha}</h2>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={()=>handleConfirm(createRequest)}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatTurnoModal;