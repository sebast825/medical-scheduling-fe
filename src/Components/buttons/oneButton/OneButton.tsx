import { Button, ButtonGroup } from "react-bootstrap";
import "./OneButton.scss";

interface IOneButton {
  variant?: string;
  handleSubmit: () => void;
  text?: string;
  customClass?: string;
  sizeClass ? : string
}

function OneButton({
  variant,
  handleSubmit,
  text = "Aceptar",
  customClass,
  sizeClass = "sm" // btn-lg | btn-sm
}: IOneButton) {
  return (
    <div
      className={`container justify-content-center d-flex p-md-4   p-2  OneButton ${customClass}`}
    >
        <Button
          variant={variant != undefined ? variant : "primary"}
          onClick={handleSubmit}
          //size={size != undefined ? undefined : "lg"}
          className={`button ${sizeClass}`}
          style={{maxWidth:"max-content"}}
        >
          {" "}
          {text}
        </Button>
    </div>
  );
}

export default OneButton;
