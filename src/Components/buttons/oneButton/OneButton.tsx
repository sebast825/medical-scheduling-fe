import { Button, ButtonGroup } from "react-bootstrap";
import "./OneButton.scss";

interface IOneButton {
  variant?: string;
  handleSubmit: () => void;
  text?: string;
  customClass?: string;
}

function OneButton({
  variant,
  handleSubmit,
  text = "Aceptar",
  customClass,
}: IOneButton) {
  return (
    <div
      className={`container justify-content-center d-flex p-md-4  noPaddingMarginTop p-2  OneButton ${customClass}`}
    >
      <ButtonGroup>
        <Button
          variant={variant != undefined ? variant : "primary"}
          onClick={handleSubmit}
          size="lg"
          className="button"
        >
          {" "}
          {text}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default OneButton;
