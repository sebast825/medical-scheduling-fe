import {  useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import ConfirmModal from "../../modals/ConfirmModal";
import { useUserContext } from "../../../context/authContext";
import GetJwtContent from "../../../utils/jwtUtils";
import { fetchCancelarTurno } from "../../../services/apiService";
import useWindowSize from "../../../hooks/ScreenSize";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import { getDate, getHour } from "../../../utils/formatDate";

type ICardTurno = {
 turno: TurnoResponse
  btnEvent?: (turno : TurnoResponse) => void;
};

function CardTurno({
 turno,
  btnEvent
}: ICardTurno) {

  const [screenSize, setScreenSize] = useState<number>(useWindowSize().width);

  var id = turno.id
  var nombre = turno.medico;
  var especialidad = turno.especialidad;
  var fecha = getDate(turno.fecha) + " " + getHour(turno.fecha);
  
  function IsMobile(): boolean {
    return screenSize < 600;
  }

  return (
    <>
   
      <Card className="d-flex m-2" key={id}>
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
                <Col md={6}>
                  <h2>{nombre}</h2>
                  <h6>{especialidad}</h6>
                </Col>
                <Col md={6}>
                  <h6>{fecha}</h6>
                </Col>
              </Col>
            )}

            {btnEvent != undefined ? (
              <Col xs={4} md={2}  className="d-flex align-items-center justify-content-center">
                <Button variant="warning" onClick={()=>btnEvent(turno)}>
                  Cancelar
                </Button>
              </Col>
            ) : null}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardTurno;
