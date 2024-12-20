import { Form } from "react-bootstrap";
import { DisponibilidadMedico } from "../../../../types/DisponibilidadMedico/DisponibilidadMedico";
import GenericModal from "../../GenericModal/GenericModal";
import { useEffect, useState } from "react";
import { DisponibilidadMedicoCreate } from "../../../../types/DisponibilidadMedico/DisponibilidadMedicoCreate";

interface ICreateHorarioMedicoModal {
  modalField: DisponibilidadMedico;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (disponibilidadUpdated: DisponibilidadMedicoCreate) => void;
}

function CreateHorarioMedicoModal({
  modalField,
  show,
  handleClose,
  handleConfirm,
}: ICreateHorarioMedicoModal) {
  const [horarioInicio, setHorarioInicio] = useState<string>();
  const [horarioFin, setHorarioFin] = useState<string>();
  const [diaSemana, setDiaSemana] = useState<string>();

  useEffect(() => {
    setHorarioInicio(modalField.startTime.toString());
    setHorarioFin(modalField.endTime.toString());
  }, [modalField]);

  function confirmar() {
    console.log("entra");
    if (horarioFin == undefined || horarioInicio == undefined) return;
    let disponibilidadUpdated: DisponibilidadMedicoCreate = {
      MedicoId: 1,
      DiaSemanaId: 1,
      StartTime: horarioInicio,
      EndTime: horarioFin,
    };
    handleConfirm(disponibilidadUpdated);
  }

  const diasSemana = [
    { id: 1, nombre: "Lunes" },
    { id: 2, nombre: "Martes" },
    { id: 3, nombre: "Miércoles" },
    { id: 4, nombre: "Jueves" },
    { id: 5, nombre: "Viernes" },
    { id: 6, nombre: "Sábado" },
    { id: 7, nombre: "Domingo" },
  ];

  useEffect(()=>{
    console.log(diaSemana)
  },[diaSemana])

  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={confirmar}
        title={`Editar Horario del medico ${modalField.medico}, dia ${modalField.diaSemana}`}
      >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
        <Form.Group key="6">
            <Form.Label style={{ textAlign: "left" }}>Sexo</Form.Label>
            <Form.Select onChange={(e) => setDiaSemana(e.target.value)} value={diaSemana}>
              {diasSemana.map((dia) => {
                return <option key={dia.id} value={dia.id}>{dia.nombre}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>
              Horario Inicio
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Formato hh:mm"
              onChange={(e) => setHorarioInicio(e.target.value)}
              value={horarioInicio}
            />
          </Form.Group>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Horario Fin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Formato hh:mm"
              onChange={(e) => setHorarioFin(e.target.value)}
              value={horarioFin}
            />
          </Form.Group>
        </Form>
      </GenericModal>
    </>
  );
}

export default CreateHorarioMedicoModal;
