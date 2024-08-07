import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
type ICardPaciente={
   nombre :string,
   especialidad :string,
   fecha :string,
   
}

 function CardPaciente({ nombre, especialidad, fecha } : ICardPaciente) {
//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
return (
   <Card className="mb-3">
     <Card.Body>
       <Row className="d-flex d-md-none">
         <Col xs={9}>
           <h2>{nombre}</h2>
           <h6>{especialidad}</h6>
           <h6>{fecha}</h6>
         </Col>
         
         <Col xs={3} className="d-flex align-items-center justify-content-end">
           <Button variant="primary">Button</Button>
         </Col>

         
       </Row>

       {/* desktop */}
       <Row className="d-none d-md-flex">
       <Col md={4}>
         <h3>{nombre}</h3>
         <h6>{especialidad}</h6>
         </Col>
         <Col md={4} className="d-flex align-items-center justify-content-center">
         <h5>{fecha}</h5>

         </Col>
         <Col md={4} className="d-flex align-items-center justify-content-end">
           <Button variant="primary">Button</Button>
         </Col>
       </Row>
     </Card.Body>
   </Card>
 );
}

export default CardPaciente;
