import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import { getDate, getHour } from "../../utils/formatDate";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { usePacienteContext } from "../../context/authContext";
import useToastit from "../../hooks/useToastit";
import { genericMessages } from "../../constants/genericMessages";

interface IConfirmModal {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title?: string;
  medico: IMedicoResponse;
  fecha: string;
}

function CreatTurnoModal({
  show,
  handleClose,
  handleConfirm,
  title = "Crear Turno",

  medico,

  fecha,
}: IConfirmModal) {
  const medicoNombre = medico.nombre + " " + medico.apellido;
  const {pacienteInfo}= usePacienteContext();
  const {info} = useToastit();

  const [isButtonDisabel, setIsButtonDisabel] = useState<boolean>(false);

  useEffect(()=>{
    if(isButtonDisabel){
      info(genericMessages.procesadoSolicutd);
    }
  },[isButtonDisabel])

    function handleBtnConfirm() {
      handleConfirm();
      setIsButtonDisabel(true);
    }    

    
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          <span className="text-underline">Medico:</span>
          <span className="text-muted small"> {medicoNombre}</span>
        </h5>

        {pacienteInfo && <>

        <h5>
            <span className="text-underline">Paciente:</span>
            <span className="text-muted small"> {pacienteInfo?.nombre + " " + pacienteInfo?.apellido}</span>
          </h5> </>
    }
        <h5>
          <span className="text-underline">Especialidad:</span>
          <span className="text-muted small"> {medico.especialidad}</span>
        </h5>
        <h5>
          <span className="text-underline">Fecha:</span>
          <span className="text-muted small"> {getDate(fecha)}</span>
        </h5>
        <h5>
          <span className="text-underline">Hora:</span>
          <span className="text-muted small"> {getHour(fecha)}</span>
        </h5>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => handleBtnConfirm()} disabled={isButtonDisabel}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreatTurnoModal;
