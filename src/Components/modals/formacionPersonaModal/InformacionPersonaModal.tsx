import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import GenericModal from "../GenericModal/GenericModal";
import {
  usePacienteContext,
  usePersonaInfoContext,
} from "../../../context/authContext";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../../hooks/personas/usePersonas";
import { Sexo } from "../../../types/Sexo.type";
import useToastit from "../../../hooks/useToastit";
import { getDate, getHour } from "../../../utils/formatDate";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";

interface IInformacionPersonaModal {
  modalField: IPacienteResponse;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: IPersonaResponse) => void;
}

function InformacionPersonaModal({
  modalField,
  show,
  handleClose,
  handleConfirm,
}: IInformacionPersonaModal) {

  const [nombre, setNombre] = useState<string>(modalField.nombre);
  const [apellido, setApellido] = useState<string>(modalField.apellido);
  const [fechaNacimiento, setFechaNacimiento] = useState<string>(
    getDate(modalField.fechaNacimiento)
  );
  const [telefono, setTelefono] = useState<string>(modalField.telefono);
  const [numeroDocumento, setNumeroDocumento] = useState<string>(
    modalField.numeroDocumento
  );
  const [sexo, setSexo] = useState<string>(modalField.sexo);
  const { pacienteInfo } = usePacienteContext();
  const { personaInfo } = usePersonaInfoContext();
  const { putPersona } = usePersonas();
  const { error } = useToastit();

  //utiliza el enum Sexo
  const valores = Object.keys(Sexo).filter((key) => !isNaN(Number(key)));
  const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));

  useEffect(() => {}, [pacienteInfo]);

  async function handlePersonaUpdate() {
    var persona = createPersonaUpdateObject();
    console.log(persona)
    var updatedPersona = await updatePersona(persona);

    if (updatedPersona == null) {
      error("Ha ocurrido un error, no se pudo completar la accion con éxito.");
      return;
    }
    handleConfirm(updatedPersona);
    handleClose();
  }

  function createPersonaUpdateObject(): IPersonaUpdate {
    var getSexoId = claves.indexOf(sexo) + 1; //arranca en 0 los id son 1,2,3

    var date = getDate(fechaNacimiento);
    var hour = getHour(fechaNacimiento);
    var fechaNacFormated = date + "T" + hour;

    var persona: IPersonaUpdate = {
      nombre: nombre,
      apellido: apellido,
      numeroDocumento: numeroDocumento,
      telefono: telefono,
      sexoId: getSexoId,
      fechaNacimiento: fechaNacFormated,
    };
    return persona;
  }
  async function updatePersona(
    persona: IPersonaUpdate
  ): Promise<IPersonaResponse | undefined> {
    if (personaInfo == null) return undefined;
    var updatedPersona: IPersonaResponse | undefined = await putPersona(
      persona,
      personaInfo.id.toString()
    );
    return updatedPersona;
  }

  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={handlePersonaUpdate}
        title="Editar Información Personal"
      >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
          <Form.Group controlId="formBasicnombre">
            <Form.Label style={{ textAlign: "left" }}>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ textAlign: "left" }}>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ textAlign: "left" }}>
              Fecha Nacimiento
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="Ingresar nombre"
              onChange={(e) => setFechaNacimiento(e.target.value)}
              value={fechaNacimiento}
            />
          </Form.Group>
          <Form.Group key="4">
            <Form.Label style={{ textAlign: "left" }}>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setTelefono(e.target.value)}
              value={telefono}
            />
          </Form.Group>
          <Form.Group key="5">
            <Form.Label style={{ textAlign: "left" }}>
              Número Documento
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombre"
              onChange={(e) => setNumeroDocumento(e.target.value)}
              value={numeroDocumento}
            />
          </Form.Group>

          <Form.Group key="6">
            <Form.Label style={{ textAlign: "left" }}>Sexo</Form.Label>
            <Form.Select onChange={(e) => setSexo(e.target.value)} value={sexo}>
              {claves.map((elem) => {
                return (
                  <option key={elem} value={elem}>
                    {elem}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Form>
      </GenericModal>
    </>
  );
}

export default InformacionPersonaModal;
