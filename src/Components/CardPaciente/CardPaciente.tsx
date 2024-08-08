import { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
// import { useMediaQuery } from 'react-responsive';
import ConfirmModal from "../modals/ConfirmModal";
import { useUserContext } from "../../context/authContext";
import GetJwtContent from "../../utils/jwtUtils";
import { fetchCancelarTurno } from "../../services/apiService";

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
  return (
    <>
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmAction}
        body="¿Estás seguro de que deseas realizar esta acción?"
      />

      <Card className="mb-3" key={id}>
        <Card.Body>
          <Row className="d-flex d-md-none">
            <Col xs={9}>
              <h2>{nombre}</h2>
              <h6>{especialidad}</h6>
              <h6>{fecha}</h6>
            </Col>

            {btnEvent != undefined ? (
              <Col
                xs={3}
                className="d-flex align-items-center justify-content-end"
              >
                <Button variant="primary" onClick={handleOpenModal}>
                  Button
                </Button>
              </Col>
            ) : null}
          </Row>

          {/* desktop */}
          <Row className="d-none d-md-flex">
            <Col md={4}>
              <h3>{nombre}</h3>
              <h6>{especialidad}</h6>
            </Col>
            <Col
              md={4}
              className="d-flex align-items-center justify-content-center"
            >
              <h5>{fecha}</h5>
            </Col>

            {btnEvent != undefined ? (
              <Col
                md={4}
                className="d-flex align-items-center justify-content-end"
              >
                <Button variant="primary" onClick={() => handleOpenModal()}>
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
