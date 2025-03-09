import { Form } from "react-bootstrap";
import { LicenseCreateRequestDto } from "../../../types/Licenses/LicenseCreateRequestDto.type";
import GenericModal from "../GenericModal/GenericModal";
import { useState } from "react";
import { usePersonaInfoContext } from "../../../context/authContext";
import useToastit from "../../../hooks/useToastit";

interface ICreateLicenseModal {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (license: LicenseCreateRequestDto) => void;
}
function CreateLicenseModal({
  show,
  handleClose,
  handleConfirm,
}: ICreateLicenseModal) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const { personaInfo } = usePersonaInfoContext();
  const {warning} = useToastit();
  
  async function confirmar() {
    if(startDate == ""){
      warning("La fecha de inicio es requerida");
      return;
    }
    var license: LicenseCreateRequestDto = {
      MedicoId: personaInfo.id,
      StartDate: startDate,
      EndDate: endDate == "" ? null : endDate,
      Reason: reason,
    };
    await handleConfirm(license);
  }
  return (
    <GenericModal
      show={show}
      handleClose={handleClose}
      handleConfirm={confirmar}
      title={`Crear Licencia para el medico ${personaInfo.nombre} ${personaInfo.apellido}`}
      useDisableConfirmBtn={true}
    >
      <Form className="d-flex flex-column" style={{ gap: "10px" }}>
        <Form.Group controlId="startDate">
          <Form.Label style={{ textAlign: "left" }}>Fecha Inicio</Form.Label>
          <Form.Control
            type="date"
            placeholder=""
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            required
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label style={{ textAlign: "left" }}>Fecha Fin</Form.Label>
          <Form.Control
            type="date"
            placeholder=""
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />
        </Form.Group>

        <Form.Group controlId="reason">
          <Form.Label style={{ textAlign: "left" }}>Motivo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar motivo de la licencia"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          />
        </Form.Group>
      </Form>
    </GenericModal>
  );
}

export default CreateLicenseModal;
