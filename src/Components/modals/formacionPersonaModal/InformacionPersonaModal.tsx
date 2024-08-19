import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { IGenericObject } from "../../../utils/objectsField";

interface IInformacionPersonaModal {
  nombre: IGenericObject;
  apellido: IGenericObject;
  fechaNacimiento: IGenericObject;
  telefono: IGenericObject;
  numeroDocumento: IGenericObject;
  sexo: IGenericObject;
}


function InformacionPersonaModal({ nombre,apellido,fechaNacimiento,telefono,numeroDocumento,sexo  }: IInformacionPersonaModal) {
  const [inputValues, setinputValues] = useState<IGenericObject[]>();
   useEffect(()=>{
      setinputValues([nombre,apellido,fechaNacimiento,telefono,numeroDocumento,sexo])
   },[])   
   useEffect(()=>{

      inputValues?.forEach(elem => console.log(elem))
   },[])
  return (
    <>
     {/* <Form>


      <Form.Group key={nombre.key} controlId="formBasicInput">
        <Form.Label>{nombre.label}</Form.Label>
        <Form.Control
          type="text"
          value={nombre.value || ""}
          onChange={(e) => {
            handleChange(nombre.key, e.target.value);
            console.log(nombre);
          }}
        />
      </Form.Group>
      </Form>  */}
    </>
  );
}

export default InformacionPersonaModal;
