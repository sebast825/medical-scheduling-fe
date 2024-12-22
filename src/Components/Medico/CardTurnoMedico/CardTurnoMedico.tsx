import {  useState } from "react";
import { Card, Button, Row, Col, ButtonGroup, Dropdown } from "react-bootstrap";
import ConfirmModal from "../../modals/ConfirmModal";
import { useUserContext, useUserInfo } from "../../../context/authContext";
import GetJwtContent from "../../../utils/jwtUtils";
import { fetchActualizarEstadoTurno, fetchCancelarTurno } from "../../../services/apiService";
import useWindowSize from "../../../hooks/ScreenSize";
import { TurnoResponse } from "../../../types/turno/TurnoResponse.type";
import { getDate, getHour } from "../../../utils/formatDate";
import { ESTADOS_TURNO } from "../../../utils/estadoTurno";
import "./CardTurnoMedico.scss"

type ICardTurnoMedico = {
 turno: TurnoResponse
  btnEvent: (turno : TurnoResponse) => void;
};

function CardTurnoMedico({
 turno,
  btnEvent
}: ICardTurnoMedico) {

  const [screenSize] = useState<number>(useWindowSize().width);
  const user = useUserInfo();
  var id = turno.id
  var paciente = turno.paciente;
  var estadoTurno = turno.estado;
  var fecha = `${getHour(turno.fecha)} Hs.`;
  
  
  function IsMobile(): boolean {
    return screenSize < 600;
  }
  
  async function cancelarTurno(): Promise<void> {

    if(user == null)return;    
    var cancelarTurno = await fetchCancelarTurno(user, turno.id);
    if (cancelarTurno.estado == ESTADOS_TURNO.CANCELADO) {
       btnEvent(cancelarTurno)
    }
  }
  async function updateStatusTurno(nuevoEstado : string): Promise<void> {

    if(user == null)return;    
    var updateStatus = await fetchActualizarEstadoTurno(user, turno.id.toString(), nuevoEstado);
    if (updateStatus.estado == nuevoEstado) {
       btnEvent(updateStatus)
    }
  }



  return (
    <>
   
      <Card className="d-flex m-2" key={id}>
        <Card.Body className={`${turno.estado}`}>
          <Row className="d-flex flex-row">
            {IsMobile() ? (
              <Col xs={8}  className="col-8 flex-column">
              <h2>{paciente}</h2>
              <h6>{estadoTurno}</h6>
              <h6>{fecha}</h6>
            </Col>
            ) : (
              <Col md={10} className="row justify-content-center align-items-center">
                <Col md={6}>
                  <h2>{paciente}</h2>
                  <h6>{estadoTurno}</h6>
                </Col>
                <Col md={6}>
                  <h6>{fecha}</h6>
                </Col>
              </Col>
            )}
              <Col xs={4} md={2}  className="d-flex align-items-center justify-content-center">

                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      variant="primary"
                      id="dropdown-basic"
                      
                    >Estado</Dropdown.Toggle>
                      
                    <Dropdown.Menu>
                      <Dropdown.Item
                        //className="tezt-algin-right"
                        onClick={() =>  updateStatusTurno(ESTADOS_TURNO.LLAMANDO)}
                      >
                        Llamar
                      </Dropdown.Item>
                      <Dropdown.Item
                        //className="tezt-algin-right"
                        onClick={() => updateStatusTurno(ESTADOS_TURNO.EN_PROGRESO)}
                      >
                        En Progreso
                      </Dropdown.Item>
                      
                      <Dropdown.Item
                        //className="tezt-algin-right"
                        onClick={() => updateStatusTurno(ESTADOS_TURNO.COMPLETADO)}
                      >
                        Completado
                        </Dropdown.Item>
                        <Dropdown.Item
                        //className="tezt-algin-right"
                        onClick={() => updateStatusTurno(ESTADOS_TURNO.NO_ASISTIDO)}
                      >
                        No Asiste
                        </Dropdown.Item>
                        <Dropdown.Item
                        //className="tezt-algin-right"
                        onClick={() => updateStatusTurno(ESTADOS_TURNO.PROGRAMADO)}
                      >
                        Programada
                      </Dropdown.Item>
                      </Dropdown.Menu>
                      </Dropdown>
                      </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardTurnoMedico;

/*   {btnEvent != undefined ? (
              <Col xs={4} md={2}  className="d-flex align-items-center justify-content-center">
                <Button variant="primary" onClick={()=>btnEvent(turno)}>
                  Actualizar Estado
                </Button>
              </Col>
            ) : null} 
             
            
            PROGRAMADO: 'Programada',
CANCELADO: 'Cancelada',
COMPLETADO: 'Completada',
LLAMANDO: 'LLamando',
EN_PROGRESO: 'EnProgreso',
FINALIZADO: 'Finalizada',
NO_ASISTIDO: 'NoAsistida'*/