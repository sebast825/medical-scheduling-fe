import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { IGenericObject } from "../../../utils/objectsField";
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";
import useManageObjectList from "../../../hooks/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";
import ModalInput from "../formInput/formInput";
import FormInput from "../formInput/formInput";

interface IInformacionPersonaModal {
  nombre: IGenericObject;
  apellido: IGenericObject;
  fechaNacimiento: IGenericObject;
  telefono: IGenericObject;
  numeroDocumento: IGenericObject;
  sexo: IGenericObject;
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;

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
  handleConfirm,
}: IInformacionPersonaModal) {
  const { handleChange, getValue, inputValues} = useManageObjectList([
    nombre,
    apellido,
    fechaNacimiento,
    telefono,
    numeroDocumento,
    sexo,
  ]);
  
  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
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
          />
   
          <FormInput
            element={numeroDocumento}
            handleChange={handleChange}
            getValue={getValue}
          />
          <FormInput
            element={sexo}
            handleChange={handleChange}
            getValue={getValue}
          />
        </Form>
      </GenericModal>
    </>
  );
}

export default InformacionPersonaModal;
