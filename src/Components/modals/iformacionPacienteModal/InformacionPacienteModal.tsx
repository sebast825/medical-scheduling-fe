import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { IGenericObject } from "../../../types/IGenericObject.type";
import useManageObjectList from "../../../hooks/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";
import FormInput from "../formInput/formInput";
import { usePersonaInfoContext } from "../../../context/authContext";
import { Sexo } from "../../../types/Sexo.type";
import useToastit from "../../../hooks/useToastit";
import validarInputForm from "../../../utils/validarDatos";
import { IPacienteUpdate } from "../../../types/Paciente/PacienteUpdate.type";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import { IPacienteResponse } from "../../../types/Paciente/PacienteResponse.type";

interface IInformacionPacienteModal {
  modalField: IGenericObject[];
  show: boolean;
  handleClose: () => void;
  handleConfirm : (pacienteResponse : IPacienteResponse) => void;
}

function InformacionPacienteModal({
  modalField,
  show,
  handleClose,
  handleConfirm
}: IInformacionPacienteModal) {
  var telefonoEmergencia: IGenericObject = modalField[0];
  var nombreEmergencia: IGenericObject = modalField[1];
  const { handleChange, getValue, inputValues } = useManageObjectList([
    telefonoEmergencia,
    nombreEmergencia
  ]);

  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();
  const { putPaciente} = usePacientes();
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
      handleConfirm(updatedPaciente);
      // setPersonaInfo(updatedPaciente);
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
