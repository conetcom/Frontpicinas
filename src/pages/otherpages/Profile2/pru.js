
   
  // Función para manejar el click en "Reply"
  const handleReplyClick = (messageId) => {
    setActiveMessageId(messageId); // Establece el ID del mensaje al que se está respondiendo
  };

  // Función para manejar el envío de la respuesta
  const sendReply = async (messageId) => {
    if (!replyText) return; // No envía si el campo está vacío

    try {
      const response = await fetch(`https://piscina-api.onrender.com/api/usuarios/messages/${messageId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegúrate de enviar el token de autenticación si es necesario
        },
        body: JSON.stringify({ reply: replyText }), // Envía la respuesta en el cuerpo
      });

      if (response.ok) {
        alert('Reply sent successfully');
        setReplyText(''); // Limpiar el campo de respuesta
        setActiveMessageId(null); // Restablecer el ID del mensaje activo después de enviar
      } else {
        alert('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply');
    }
  };

//Función para enviar un nuevo mensaje
  const sendNewMessage = async () => {
    if (!newMessageText) return; // No enviar si el campo está vacío

    try {
      const response = await fetch('https://piscina-api.onrender.com/api/usuarios/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegúrate de enviar el token de autenticación si es necesario
        },
        body: JSON.stringify({ text: newMessageText }), // Enviar el mensaje en el cuerpo
      });

      if (response.ok) {
        alert('Message sent successfully');
        setNewMessageText(''); // Limpiar el campo del nuevo mensaje
        // Si deseas recargar los mensajes después de enviar, puedes llamar a loadMessages() aquí
        // loadMessages(); // Recargar mensajes
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  };

  return (
    <Card>
      <Card.Body>
        <CardTitle
          containerClass="d-flex align-items-center justify-content-between mb-3"
          title="Messages"
          menuItems={[{ label: 'Settings' }, { label: 'Action' }]}
        />

        {/* Mostrar los mensajes existentes*/} 
        <MessageList>
          {messages.map((message) => (
            <MessageItem key={message.id}>
              <div className="inbox-item-img">
                <img src={message.avatarUrl} className="rounded-circle" alt={message.author} />
              </div>
              <p className="inbox-item-author">{message.author}</p>
              <p className="inbox-item-text">{message.text}</p>
              <p className="inbox-item-date">
                <Link
                  to="#"
                  className="btn btn-sm btn-link text-info font-13"
                  onClick={() => handleReplyClick(message.id)}
                >
                  Reply
                </Link>
              </p>

              {/* Mostrar el área de texto para la respuesta si este mensaje está activo */}
              {activeMessageId === message.id && (
                <div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply"
                  ></textarea>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => sendReply(message.id)}
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </MessageItem>
          ))}
        </MessageList>

        {/* Campo para escribir un nuevo mensaje */}
        <div>
          <textarea
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Write your new message"
          ></textarea>
          <button
            className="btn btn-sm btn-primary"
            onClick={sendNewMessage}
          >
            Send New Message
          </button>
        </div>
      </Card.Body>
    </Card>
  );


export default Messages;