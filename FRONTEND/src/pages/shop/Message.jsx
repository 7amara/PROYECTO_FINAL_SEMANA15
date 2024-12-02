import React, { useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages((prev) => [...prev, { message }]);
      setMessage('');
    }
  };

  return (
    <Container>
           <h5 className="mt-4 mb-3">Envíanos tu consulta aquí:</h5>
      <Row>
        <Col>
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
            <Table striped bordered hover>
              <tbody>
                {messages.map((msg, index) => (
                  <tr key={index}>
                    <td>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Escribe tu mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="primary" onClick={sendMessage} style={{ marginLeft: '10px' }}>
              Enviar
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
