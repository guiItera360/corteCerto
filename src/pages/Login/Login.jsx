import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/usuarios');
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <div className="bg-dark bg-opacity-75 p-4 rounded-3 shadow">
              <h2 className="text-center text-white mb-4">BarberPro</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary">
                      <User size={20} className="text-light" />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-dark text-light border-secondary"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary">
                      <Lock size={20} className="text-light" />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-dark text-light border-secondary"
                    />
                  </div>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2"
                >
                  Acessar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}