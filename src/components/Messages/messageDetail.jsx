import React from 'react';
import { Card } from 'react-bootstrap';

const MessageDetail = ({ message }) => {
  if (!message) { 
    return <p>Selecciona un mensaje para verlo aquí</p>;
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="mb-2">{message.title}</h4>
        <p>{message.subText}</p>
        {message.time && (
          <small className="text-muted">Recibido: {message.time}</small>
        )}
      </Card.Body>
    </Card>
  );
};

export default MessageDetail;
