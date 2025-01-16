import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { genericMessages } from "../../../constants/genericMessages";
import useToastit from "../../../hooks/useToastit";

interface IConfirmButton {
  handleConfirm: () => void;
  text?: string;
  variant?: string;
  setButtonStatus?: boolean;
}

function ConfirmButton(props: IConfirmButton) {
  const {
    handleConfirm,
    text = "ConfirmarBtn",
    variant = "primary",
    setButtonStatus = false,
  } = props;

  const [isButtonDisabel, setIsButtonDisabel] = useState<boolean>(false);

  useEffect(() => {}, [isButtonDisabel]);
  useEffect(() => {
    setIsButtonDisabel(setButtonStatus);
  }, [setButtonStatus]);
  function handleBtnConfirm() {
    setIsButtonDisabel(true);

      handleConfirm();
    
  }

  return (
    <Button
      variant={variant}
      onClick={() => handleBtnConfirm()}
      disabled={isButtonDisabel}
    >
      {isButtonDisabel ? "Solicitud Enviada" : text}
    </Button>
  );
}

export default ConfirmButton;
