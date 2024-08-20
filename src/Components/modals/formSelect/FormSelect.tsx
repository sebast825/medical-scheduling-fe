import { Form } from "react-bootstrap";
import { IGenericObject } from "../../../utils/objectsField";
import { getDate } from "../../../utils/formatDate";

interface IFormSelect {
  element: IGenericObject;
  handleChange: (e: string, s: string) => void;
  getValue: (e: string) => string;
  typeInput?: string;
//   options: [string,number][];
  options: string[]
}

function FormSelect({
  element,
  handleChange,
  getValue,
  typeInput = "text",
  options,
}: IFormSelect) {
  return (
    <Form.Group key={element.key} controlId="formBasicInput">
      <Form.Label>{element.label}</Form.Label>
      <Form.Select
        value={getValue(element.key)}
        onChange={(e) => {
          handleChange(element.key, e.target.value);
          console.log(getValue(element.key));
        }}
      >
        <option value="">Selecciona una opción</option>
        {options.map((elem) => (
          <option key={elem} value={elem}>{elem}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default FormSelect;
