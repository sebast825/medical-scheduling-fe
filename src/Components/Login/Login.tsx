import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { fetchLogin } from '../../services/apiService';
import { useUserToggleContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const cambiaLogin = useUserToggleContext();

  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    // Lógica para manejar el login
    console.log('nombre:', nombre);
    console.log('Password:', password);
    let UserName = 'Paciente';
    let Password = 'a';
    const loginData = { UserName, Password };
    try {
      const response = await fetchLogin('loginData');
      console.log('response');
      cambiaLogin(response);
      navigate('/'); // Redirigir después de un inicio de sesión exitoso
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión, por favor intente nuevamente.');
    }
  };

  return (
    <Container className='mt-2'>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit} className="d-flex flex-column" style={{ gap: '20px' }}>
            <Form.Group controlId="formBasicnombre">
              <Form.Label style={{ textAlign: 'left' }}>nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

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
