import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { IGenericObject } from "../../../types/IGenericObject.type";
import useManageObjectList from "../../../hooks/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";
import FormInput from "../formInput/formInput";
import useGenericObjectFielf from "../../../hooks/objectField/useGenericObjetField";
import { usePersonaInfoContext } from "../../../context/authContext";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../../hooks/personas/usePersonas";
import FormSelect from "../formSelect/FormSelect";
import { Sexo } from "../../../types/Sexo.type";
import useToastit from "../../../hooks/useToastit";
import { getDate, getHour } from "../../../utils/formatDate";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import validarInputForm from "../../../utils/validarDatos";
import { IPacienteUpdate } from "../../../types/Paciente/PacienteUpdate.type";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import { IPacienteResponse } from "../../../types/Paciente/PacienteResponse.type";

interface IInformacionPacienteModal {
  modalField: IGenericObject[];
  show: boolean;
  handleClose: () => void;
}

function InformacionPacienteModal({
  modalField,
  show,
  handleClose,
}: IInformacionPacienteModal) {
  var telefonoEmergencia: IGenericObject = modalField[0];
  var nombreEmergencia: IGenericObject = modalField[1];
  const { handleChange, getValue, inputValues } = useManageObjectList([
    telefonoEmergencia,
    nombreEmergencia
  ]);

  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();
  const { putPaciente} = usePacientes();
  const { updateModalFields } = useGenericObjectFielf();
  const { error } = useToastit();
  //utiliza el enum Sexo
  const valores = Object.keys(Sexo).filter((key) => !isNaN(Number(key)));
  const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));

  useEffect(() => {}, [personaInfo]);

  async function updatePersona() {
    var paciente: IPacienteUpdate | undefined = recibirInfoUpdated(); //persona.sexoId = 2;
    if (paciente == undefined) return;
    var updatedPaciente: IPacienteResponse | undefined = await putPaciente(
      paciente,
      personaInfo.id
    );
    if (updatedPaciente != undefined) {
      setPersonaInfo(updatedPaciente);
    }
  }

  function recibirInfoUpdated(): IPacienteUpdate | undefined {
    var datosOk: boolean[] = inputValues.map((elem) => validarInputForm(elem.value, elem.key, elem.typeInput));
    if (datosOk.some((value) => value == false)) {
      error("DATOS INVALIDOS");
      return;
    }
    handleClose();
    var getTelefonoEmergencia = getValue("telefonoEmergencia");
    var getNombreEmergencia = getValue("nombreEmergencia");


    const objetUpdate: IPacienteUpdate = {
      TelefonoEmergencia: getTelefonoEmergencia,
      NombreEmergencia: getNombreEmergencia,
 
    };
    return objetUpdate;
  }

 

  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={updatePersona}
        title="Editar Información Personal"
      >
        <Form>
          <FormInput
            element={telefonoEmergencia}
            handleChange={handleChange}
            getValue={getValue}
          />
          <FormInput
            element={nombreEmergencia}
            handleChange={handleChange}
            getValue={getValue}
          />

        </Form>
      </GenericModal>
    </>
  );
}

export default InformacionPacienteModal;
