import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
// import { useMediaQuery } from 'react-responsive';
type ICardPaciente = {
  id : number;
  nombre: string;
  especialidad: string;
  fecha: string;
  btnEvent?: (e:number) => Promise<void>;
};

function CardPaciente({
  id,
  nombre,
  especialidad,
  fecha,
  btnEvent,
}: ICardPaciente) {
  //   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <Card className="mb-3" key={id}>
      <Card.Body>
        <Row className="d-flex d-md-none">
          <Col xs={9}>
            <h2>{nombre}</h2>
            <h6>{especialidad}</h6>
            <h6>{fecha}</h6>
          </Col>


          {btnEvent != undefined ? (
                     <Col xs={3} className="d-flex align-items-center justify-content-end">

              <Button variant="primary" onClick={() => btnEvent(id)}>Button</Button>
               
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
              <Button variant="primary" onClick={() => btnEvent(id)}>Button</Button>
               
            </Col>
          ) : null}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CardPaciente;
