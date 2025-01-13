import { Modal, Button } from "react-bootstrap";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";
import useConfirmBtnAviability from "../../../hooks/confirmBtnAviability/useConfirmBtnAviability";
import { useEffect } from "react";

type IGenericModal = {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  // body: any;
  children: React.ReactNode;
  handleThirdButton?: () => void;
  textThirdButton?: string;
  useDisableConfirmBtn?: boolean;
};

function GenericModal({
  show,
  handleClose,
  handleConfirm,
  title,
  children,
  handleThirdButton,
  textThirdButton,
  useDisableConfirmBtn,
}: IGenericModal) {
  const { btnStatus, handleFunctionnAndButton } = useConfirmBtnAviability();
  useEffect(() => {}, [btnStatus]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        {handleThirdButton && (
          <ConfirmButton
            variant="danger"
            handleConfirm={() => handleFunctionnAndButton(handleThirdButton)}
            setButtonStatus={btnStatus}
            text={textThirdButton}
          />
        )}

        <Button variant="dark" onClick={handleClose}>
          Cancelar
        </Button>
        {useDisableConfirmBtn ? (
          <ConfirmButton
            handleConfirm={() => handleFunctionnAndButton(handleConfirm)}
            setButtonStatus={btnStatus}
          />
        ) : (
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;
