import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Lógica para manejar el login
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
   <Container className='mt-2'>
      
   <Row className="justify-content-md-center">
     <Col md={4}> 
       <h2 className="text-center">Login</h2>
       <Form onSubmit={handleSubmit}className="d-flex flex-column" style={{ gap: '20px' }}>
         <Form.Group controlId="formBasicEmail">
           <Form.Label style={{ textAlign: 'left' }}>Email address</Form.Label> {/* Alinea el Form.Label a la izquierda con estilos personalizados */}
           <Form.Control
             type="email"
             placeholder="Ingresar email"             
             onChange={(e) =>setEmail(e.target.value)}
               value={email}
           />
         </Form.Group>
       
         <Form.Group controlId="formBasicPassword" >
           <Form.Label>Password</Form.Label>
           <Form.Control
             type="password"
             placeholder="Password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </Form.Group>
 
         <Button className='mt-2' variant="primary" type="submit">
           Submit
         </Button>
       </Form>
     </Col>
   </Row>
 </Container>
  );
};

export default LoginForm;
