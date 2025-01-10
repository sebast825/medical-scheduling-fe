import { Form } from "react-bootstrap";
import { DisponibilidadMedico } from "../../../types/DisponibilidadMedico/DisponibilidadMedico";
import GenericModal from "../GenericModal/GenericModal";
import { useEffect, useState } from "react";
import { IDisponibilidadMedicoUpdateRequest } from "../../../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import { start } from "repl";
import useToastit from "../../../hooks/useToastit";
import { genericMessages } from "../../../constants/genericMessages";

interface IHorarioMedicoModal {
  modalField: DisponibilidadMedico;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (disponibilidadUpdated: IDisponibilidadMedicoUpdateRequest) => void;
  handleDelete:(e: number)=>void;
}

function EditHorarioMedicoModal({
  modalField,
  show,
  handleClose,
  handleConfirm,
  handleDelete
}: IHorarioMedicoModal) {


 

  const [horarioInicio,setHorarioInicio] = useState<string>();
  const [horarioFin,setHorarioFin] = useState<string>();
const {error} = useToastit();
  useEffect(() => {
   setHorarioInicio(modalField.startTime.toString())
   setHorarioFin(modalField.endTime.toString())

  }, [modalField]);


  function confirmar() {
    if(horarioFin == undefined || horarioInicio == undefined || horarioFin == '' || horarioInicio == '') {
      error(genericMessages.camposIncompletos);

      return};
    let disponibilidadUpdated : IDisponibilidadMedicoUpdateRequest ={
      id : modalField.id,
      StartTime : horarioInicio,
      EndTime : horarioFin

    } 
    handleConfirm(disponibilidadUpdated)
  }
  function eliminar(){
    handleDelete(modalField.id)
  }
  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={confirmar}
        title={`Editar Horario del medico ${modalField.medico}, dia ${modalField.diaSemana}`}
        handleThirdButton = {eliminar}
        textThirdButton="Eliminar"
        useDisableConfirmBtn={true}

       >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
    
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Horario Inicio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setHorarioInicio(e.target.value)}
              value={horarioInicio}
            />
          </Form.Group>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Horario Fin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setHorarioFin(e.target.value)}
              value={horarioFin}
            />
          </Form.Group>
        </Form>
      </GenericModal>
    </>
  );
}

export default EditHorarioMedicoModal;
