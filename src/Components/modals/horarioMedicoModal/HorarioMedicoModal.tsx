import { Form } from "react-bootstrap";
import { DisponibilidadMedico } from "../../../types/DisponibilidadMedico/DisponibilidadMedico";
import GenericModal from "../GenericModal/GenericModal";
import { useEffect, useState } from "react";

interface IHorarioMedicoModal {
  modalField: DisponibilidadMedico;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: DisponibilidadMedico) => void;
}

function HorarioMedicoModal({
  modalField,
  show,
  handleClose,
  handleConfirm,
}: IHorarioMedicoModal) {
  function confirmar() {
    console.log("confirado");
  }
  const [diaSemana, setDiaSemana] = useState<string>();
  const [horarioInicio,setHorarioInicio] = useState<string>();
  const [horarioFin,setHorarioFin] = useState<string>();

  useEffect(() => {
   setDiaSemana(modalField.diaSemana);
   setHorarioInicio(modalField.startTime.toString())
   setHorarioFin(modalField.endTime.toString())

  }, [modalField]);
  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={confirmar}
        title={`Editar Horario del medico ${modalField.medico}`}
             >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Dia Semana</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setDiaSemana(e.target.value)}
              value={diaSemana}
            />
          </Form.Group>
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

export default HorarioMedicoModal;
