import {  useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import ConfirmModal from "../modals/ConfirmModal";
import { useUserContext } from "../../context/authContext";
import GetJwtContent from "../../utils/jwtUtils";
import { fetchCancelarTurno } from "../../services/apiService";
import useWindowSize from "../../hooks/ScreenSize";

type ICardPaciente = {
  id: number;
  nombre: string;
  especialidad: string;
  fecha: string;
  btnEvent?: (e: number) => Promise<void>;
};

function CardPaciente({
  id,
  nombre,
  especialidad,
  fecha,
  btnEvent,
}: ICardPaciente) {
  const user = useUserContext();
  //ConfirmModal
  const [screenSize, setScreenSize] = useState<number>(useWindowSize().width);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [bodyConfirmModal, setBodyConfirmModal] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmAction = (): void => {
    // Acción que deseas confirmar
    cancelarTurno(id);
    console.log("Acción confirmada");

    handleCloseModal();
  };

  async function cancelarTurno(e: number): Promise<void> {
    var params: any = GetJwtContent(user);
    var cancelarTurno = await fetchCancelarTurno(user, e, params.PersonaId);
    if (cancelarTurno.estado == "Cancelada") {
      console.log("turno cancelado");
    }
  }
  function getColClasses(isMobile: boolean) {
    return isMobile ? "d-flex d-md-none" : "d-none d-md-flex";
  }

  function IsMobile(): boolean {
    return screenSize < 600;
  }

  return (
    <>
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmAction}
        body="¿Estás seguro de que deseas realizar esta acción?"
      />
      <Card className="d-flex" key={id}>
        <Card.Body>
          <Row className="d-flex flex-row">
            {IsMobile() ? (
              <Col xs={8}  className="col-8 flex-column">
              <h2>{nombre}</h2>
              <h6>{especialidad}</h6>
              <h6>{fecha}</h6>
            </Col>
            ) : (
              <Col md={10} className="row justify-content-center align-items-center">
                <Col xs={4} md={6}>
                  <h2>{nombre}</h2>
                  <h6>{especialidad}</h6>
                </Col>
                <Col xs={4} md={6}>
                  <h6>{fecha}</h6>
                </Col>
              </Col>
            )}

            {btnEvent != undefined ? (
              <Col xs={4} md={2}  className="d-flex align-items-center justify-content-center">
                <Button variant="primary" onClick={handleOpenModal}>
                  Button
                </Button>
              </Col>
            ) : null}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardPaciente;
