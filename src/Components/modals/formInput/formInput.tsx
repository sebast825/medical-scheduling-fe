import { Form } from "react-bootstrap";
import { IGenericObject } from "../../../utils/objectsField";
import { getDate } from "../../../utils/formatDate";

interface IFormInput {
  element: IGenericObject;
  handleChange: (e: string, s: string) => void;
  getValue: (e: string) => string;
  typeInput?: string;
}

function FormInput({
  element,
  handleChange,
  getValue,
  typeInput = "text",
}: IFormInput) {
  function getMensajeError() {
    if (typeInput == "email") {
      return "El email ingresado no es valido";
    } else if (element.key == "numeroDocumento") {
      return "El numero de documento no es valido";
    }else{
      return "No campo no puede estar vacio";
    }
  }
  
  return (
    <Form.Group key={element.key} controlId="formBasicInput">
      <Form.Label>{element.label}</Form.Label>
      <Form.Control
        type={typeInput}
        required
        value={
          typeInput === "date"
            ? getDate(getValue(element.key))
            : getValue(element.key)
        }
        onChange={(e) => {
          handleChange(element.key, e.target.value);
          
        }}
         
        pattern={
          typeInput === "email"
            ? "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
            : undefined
        } // Patrón de validación de email
        isInvalid={
          (typeInput === "email" &&
            (!getValue(element.key).includes("@") ||
              !getValue(element.key).includes(".com"))) ||
          (element.key === "numeroDocumento" &&
            getValue(element.key).length !== 8) || 

            getValue(element.key).length == 0
          
        }
        // Mostrar como inválido si no incluye "@"
        // Mostrar como inválido si no incluye "@"
      />
      <Form.Control.Feedback type="invalid">
        {getMensajeError()}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default FormInput;
