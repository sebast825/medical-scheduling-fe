import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  IGenericObject,
  personaModalFields,
} from "../../../utils/objectsField";
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";
import useManageObjectList from "../../../hooks/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";
import ModalInput from "../formInput/formInput";
import FormInput from "../formInput/formInput";
import useGenericObjectFielf, {
  IObjectField,
} from "../../../hooks/objectField/useGenericObjetField";
import { usePersonaInfoContext } from "../../../context/authContext";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../../hooks/personas/usePersonas";
import FormSelect from "../formSelect/FormSelect";
import { Sexo } from "../../../types/Sexo.type";
import useToastit from "../../../hooks/useToastit";
import { formatDate, getDate, getHour } from "../../../utils/formatDate";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";

interface IInformacionPersonaModal {
  modalField: IGenericObject[];
  show: boolean;
  handleClose: () => void;
}

function InformacionPersonaModal({
  modalField,
  show,
  handleClose,
}: IInformacionPersonaModal) {
  var nombre: IGenericObject = modalField[0];
  var apellido: IGenericObject = modalField[1];
  var fechaNacimiento: IGenericObject = modalField[2];
  var telefono: IGenericObject = modalField[3];
  var numeroDocumento: IGenericObject = modalField[4];
  var sexo: IGenericObject = modalField[5];

  const { handleChange, getValue, inputValues } = useManageObjectList([
    nombre,
    apellido,
    fechaNacimiento,
    telefono,
    numeroDocumento,
    sexo,
  ]);
  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();
  const { putPersona } = usePersonas();
  const { updateModalFields } = useGenericObjectFielf();
  const { error } = useToastit();
  //utiliza el enum Sexo
  const valores = Object.keys(Sexo).filter((key) => !isNaN(Number(key)));
  const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));

  useEffect(() => {}, [personaInfo]);

  async function updatePersona() {
    var persona: IPersonaUpdate | undefined = recibirInfoUpdated(); //persona.sexoId = 2;
    if (persona == undefined) return;
    var updatedPersona: IPersonaResponse | undefined = await putPersona(
      persona,
      personaInfo.id
    );
    if (updatedPersona != undefined) {
      console.log(updatedPersona);
      setPersonaInfo(updatedPersona);
    }
  }

  function recibirInfoUpdated(): IPersonaUpdate | undefined {
    var datosOk: boolean[] = inputValues.map((elem) => validarDatos(elem));
    if (datosOk.some((value) => value == false)) {
      error("DATOS INVALIDOS");
      console.log("DATOS INVALIDOS");
      return;
    }
    handleClose();
    var getNombre = getValue("nombre");
    var getApellido = getValue("apellido");
    var getNumeroDocumento = getValue("numeroDocumento");
    var getTelefono = getValue("telefono");
    var getSexo = getValue("sexo");
    var getSexoId = claves.indexOf(getSexo) + 1; //arranca en 0 los id son 1,2,3
    var getFechaNacimiento = getValue("fechaNacimiento");
    var date = getDate(getFechaNacimiento);
    var hour = getHour(getFechaNacimiento);
    var fechaNacFormated = date + "T" + hour;

    const objetUpdate: IPersonaUpdate = {
      nombre: getNombre,
      apellido: getApellido,
      numeroDocumento: getNumeroDocumento,
      telefono: getTelefono,
      sexoId: getSexoId,
      fechaNacimiento: fechaNacFormated,
    };
    console.log(objetUpdate);
    return objetUpdate;
  }

  function validarDatos(dato: IGenericObject): boolean {
    var dataValue = getValue(dato.key);
    if (dato.value == undefined) return false;
    if (
      dato.key === "email" &&
      (!dataValue.includes("@") || !dataValue.includes(".com"))
    ) {
      console.log(dato);
      return false;
    } else if (dato.key === "numeroDocumento" && dataValue.length !== 8) {
      console.log(dato);
      return false;
    } else if (dataValue.length == 0) {
      console.log(dato);
      return false;
    } else if (dato.key === "telefono" && !Number(dataValue)) {
      console.log(Number(dataValue));
      console.log(dato);
      return false;
    } else {
      return true;
    }
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
            element={nombre}
            handleChange={handleChange}
            getValue={getValue}
          />
          <FormInput
            element={apellido}
            handleChange={handleChange}
            getValue={getValue}
          />
          <FormInput
            element={fechaNacimiento}
            handleChange={handleChange}
            getValue={getValue}
            typeInput="date"
          />
          <FormInput
            element={telefono}
            handleChange={handleChange}
            getValue={getValue}
            typeInput="tel"
          />

          <FormInput
            element={numeroDocumento}
            handleChange={handleChange}
            getValue={getValue}
            typeInput="number"
          />
          <FormInput
            element={sexo}
            handleChange={handleChange}
            getValue={getValue}
          />
          <FormSelect
            element={sexo}
            handleChange={handleChange}
            getValue={getValue}
            options={claves}
          />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </GenericModal>
    </>
  );
}

export default InformacionPersonaModal;
