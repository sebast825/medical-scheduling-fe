import { Form } from "react-bootstrap";
import { IGenericObject } from "../../../utils/objectsField";
import { getDate } from "../../../utils/formatDate";

interface IFormInput {
  element: IGenericObject;
  handleChange: (e: string, s: string) => void;
  getValue: (e: string) => string;
  typeInput?: string;
}

function FormInput({ element, handleChange, getValue, typeInput="text"}: IFormInput) {
  return (
    <Form.Group key={element.key} controlId="formBasicInput">
      <Form.Label>{element.label}</Form.Label>
      <Form.Control
        type={typeInput}
        value={typeInput == "date" ? getDate(getValue(element.key)) : getValue(element.key)}
        onChange={(e) => {
          handleChange(element.key, e.target.value);
          console.log(getValue(element.key));
        }}
      />{" "}
    </Form.Group>
  );
}

export default FormInput;
