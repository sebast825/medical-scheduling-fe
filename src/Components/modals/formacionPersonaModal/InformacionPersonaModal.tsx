import { useEffect, useState } from "react";
import { Form }   from "react-bootstrap";
import { IGenericObject } from "../../../utils/objectsField";
import { useBootstrapMinBreakpoint } from "react-bootstrap/esm/ThemeProvider";
import useManageObjectList from "../../../hooks/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";

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
  title: string;

}




function InformacionPersonaModal({ nombre,apellido,fechaNacimiento,telefono,numeroDocumento,sexo ,  show,
  handleClose,
  handleConfirm,
  title,
  
 }: IInformacionPersonaModal) {
  const {handleChange,getValue} = useManageObjectList([nombre,apellido,fechaNacimiento,telefono,numeroDocumento,sexo])


  return (
    <>
    <GenericModal  show={show}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
            title="Editar Información Personal"
          >
     <Form>


      <Form.Group key={nombre.key} controlId="formBasicInput">
        <Form.Label>{nombre.label}</Form.Label>
        <Form.Control
          type="text"
          value={getValue(nombre.key)}
          onChange={(e) => {
            handleChange(nombre.key, e.target.value);
            console.log(getValue(nombre.key))
          }}
        />      </Form.Group>
           <Form.Group key={apellido.key} controlId="formBasicInput">
        <Form.Label>{apellido.label}</Form.Label>
        <Form.Control
          type="text"
          value={getValue(apellido.key)}
          onChange={(e) => {
            handleChange(apellido.key, e.target.value);
            console.log(getValue(apellido.key))
          }}
        />      </Form.Group>


      </Form> 

      </GenericModal>
    </>
  );
}

export default InformacionPersonaModal;
