import { useState, useEffect } from 'react';
import { useAuthContext } from '@/common/context';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardTitle } from '..';
import MessageList from './MessageList';
import MessageItem from './MessageItem';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeMessageId, setActiveMessageId] = useState(null);
  const { user } = useAuthContext();
  const [profileImage] = useState(user?.user?.profileImage);

  useEffect(() => {
    // Solicitar todos los mensajes al montar
    socket.emit('getAllMessages');

    // Escuchar mensajes del servidor
    socket.on('allMessages', (data) => setMessages(data));
    socket.on('newMessage', (message) => setMessages(prev => [message, ...prev]));
    socket.on('newReply', (updatedMessage) => {
      setMessages(prev => prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg));
    });

    return () => {
      socket.off('allMessages');
      socket.off('newMessage');
      socket.off('newReply');
    };
  }, []);

  const handleSendNewMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
  
    const user_id = user?.user?.id;
    const username = user?.user?.name || user?.user?.username;
    const avatar = user?.user?.profileImage || '';
  
    socket.emit('sendMessage', {
      user_id,
      content: newMessage,
      name: username,
      avatar,
    });
  
    setNewMessage('');
  };
  
  const handleSendReply = (messageId) => {
    if (!replyText.trim()) return;
  
    const user_id = user?.user?.id;
    const username = user?.user?.name || user?.user?.username;
    const avatar = user?.user?.profileImage || '';
  
    socket.emit('sendReply', {
      messageId,
      reply: replyText,
      userId: user_id,
      name: username,
      avatar,
    });
  
    setReplyText('');
    setActiveMessageId(null);
  };
  

  return (
    <Card>
      <Card.Body>
        <CardTitle
          containerClass="d-flex align-items-center justify-content-between mb-3"
          title="Messages"
          menuItems={[{ label: 'Settings' }, { label: 'Action' }]}
        />

        <form onSubmit={handleSendNewMessage} className="mb-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="form-control mb-2"
            placeholder="Escribe un mensaje nuevo..."
          />
          <button type="submit" className="btn btn-primary btn-sm">Enviar mensaje</button>
        </form>

        <MessageList>
          {messages.map((message) => (
            <MessageItem key={message.id}>
              <div className="inbox-item-img">
                <img src={message.avatar_url} className="rounded-circle" alt="avatar" />
              </div>
              <p className="inbox-item-author">{message.username}</p>
              <p className="inbox-item-text">{message.messages}</p>

              <p className="inbox-item-date">
                <Link to="#" className="btn btn-sm btn-link text-info font-13" onClick={() => setActiveMessageId(message.id)}>
                  Responder
                </Link>
              </p>

              {activeMessageId === message.id && (
                <div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="form-control mb-2"
                    placeholder="Escribe tu respuesta"
                  ></textarea>
                  <button className="btn btn-sm btn-primary" onClick={() => handleSendReply(message.id)}>
                    Enviar respuesta
                  </button>
                </div>
              )}

{message.replies && message.replies.length > 0 && (
  <div className="ml-4 mt-2">
    <strong>Respuestas:</strong>
    {message.replies.map((reply) => (
      <div key={reply.id} className="d-flex align-items-start gap-2 border p-2 mt-2 rounded">
        <img
          src={reply.avatar_url || 'https://via.placeholder.com/32'}
          alt="avatar"
          className="rounded-circle"
          width={32}
          height={32}
        />
        <div>
          <strong>{reply.username || 'Usuario'}</strong>
          <p className="mb-0">{reply.reply}</p>
        </div>
      </div>
    ))}
  </div>
)}

            </MessageItem>
          ))}
        </MessageList>
      </Card.Body>
    </Card>
  );
};

export default Messages;
