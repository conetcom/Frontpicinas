import { useState, useEffect } from 'react';
import { useAuthContext } from '@/common/context';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardTitle } from '..';
import MessageList from './MessageList';
import MessageItem from './MessageItem';
import HttpClient from '@/common/helpers/httpClient';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeMessageId, setActiveMessageId] = useState(null);
  const { user } = useAuthContext();
  const [profileImage] = useState(user?.user?.profileImage);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const data = await HttpClient.get('messages', config);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.on('newMessage', (message) => {
      setMessages((prev) => [message, ...prev]);
    });

    socket.on('newReply', () => {
      fetchMessages();
    });

    return () => {
      socket.off('newMessage');
      socket.off('newReply');
    };
  }, []);

  const sendNewMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const user_id = user?.user?.id;
      const name = user?.user?.name || 'User';
      const avatar = profileImage;

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const messageData = { text: newMessage, sender: name, user_id, avatar };

      await HttpClient.post('savemessages', messageData, config);
      setNewMessage('');

      socket.emit('sendMessage', {
        to: 'all',
        from: user_id,
        content: newMessage,
        avatar,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  };

  const sendReply = async (messageId) => {
    if (!replyText) return;

    try {
      const token = localStorage.getItem('token');
      const user_id = user?.user?.id;

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const body = { reply: replyText, user_id };

      await HttpClient.post(`messages/${messageId}/reply`, body, config);

      setReplyText('');
      setActiveMessageId(null);
      fetchMessages();

      socket.emit('sendMessage', {
        to: 'all',
        from: user_id,
        content: replyText,
      });
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply');
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

        <form onSubmit={sendNewMessage} className="mb-3">
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
              <p className="inbox-item-author">{message.usuarios}</p>
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
                  <button className="btn btn-sm btn-primary" onClick={() => sendReply(message.id)}>
                    Enviar respuesta
                  </button>
                </div>
              )}

              {message.replies && message.replies.length > 0 && (
                <div className="ml-4 mt-2">
                  <strong>Respuestas:</strong>
                  {message.replies.map((reply) => (
                    <div key={reply.id} className="border p-2 mt-1 rounded">
                      <p>{reply.reply}</p>
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
