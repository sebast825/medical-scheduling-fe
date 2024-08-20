import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { IGenericObject } from "../../../utils/objectsField";
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";
import useManageObjectList from "../../../hooks/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";
import ModalInput from "../formInput/formInput";
import FormInput from "../formInput/formInput";
import useGenericObjectFielf, { IObjectField } from "../../../hooks/objectField/useGenericObjetField";
import { usePersonaInfoContext } from "../../../context/authContext";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../../hooks/personas/usePersonas";
import FormSelect from "../formSelect/FormSelect";
import { Sexo } from "../../../types/Sexo.type";

interface IInformacionPersonaModal {
  nombre: IGenericObject;
  apellido: IGenericObject;
  fechaNacimiento: IGenericObject;
  telefono: IGenericObject;
  numeroDocumento: IGenericObject;
  sexo: IGenericObject;
  show: boolean;
  handleClose: () => void;

}

function InformacionPersonaModal({
  nombre,
  apellido,
  fechaNacimiento,
  telefono,
  numeroDocumento,
  sexo,
  show,
  handleClose,

}: IInformacionPersonaModal) {
  const { handleChange, getValue, inputValues} = useManageObjectList([
    nombre,
    apellido,
    fechaNacimiento,
    telefono,
    numeroDocumento,
    sexo,
  ]);
  const { personaInfo } = usePersonaInfoContext();
  const { putPersona } = usePersonas();
  const { updateModalFields } = useGenericObjectFielf();

    //utiliza el enum Sexo
    const valores = Object.keys(Sexo).filter((key) => !isNaN(Number(key)));
    const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));


  async function updatePersona() {
    var persona: IPersonaUpdate = personaInfo; //persona.sexoId = 2;
    var udpatedPersona = await putPersona(persona, personaInfo.id);
    console.log(udpatedPersona);
  }

  function recibirInfoUpdated(e : any){
    e.preventDefault();
    inputValues.forEach(elem => console.log(elem));
    var getNombre = getValue("nombre");
    var getApellido = getValue("apellido");
    var getNumeroDocumento = getValue("numeroDocumento");
    var getTelefono   = getValue("telefono");
    var getSexo = getValue("sexo");
    var getSexoId = claves.indexOf(getSexo);
    var getFechaNacimiento = getValue("fechaNacimiento");

    console.log(getNombre)
    const objetUpdate : IPersonaUpdate = {
       nombre : getNombre ,
       apellido : getApellido,
       numeroDocumento: getNumeroDocumento,
       telefono: getTelefono,
       sexoId: getSexoId,
       fechaNacimiento : getFechaNacimiento,
     } 
     console.log(objetUpdate)

    // console.log(modalFields)
    
  }


function saludar(){

}
  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={saludar}
        title="Editar Información Personal"
      >
        <Form >
          <FormInput
            element={nombre}
            handleChange={handleChange}
            getValue={getValue}
            typeInput="email"
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
        <Button onClick={(e)=>recibirInfoUpdated(e)} variant="primary" type="submit">
          Enviar
        </Button>
        </Form>
      </GenericModal>
    </>
  );
}

export default InformacionPersonaModal;

