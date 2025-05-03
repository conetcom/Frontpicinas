// src/services/messageService.js
import HttpClient from '@/common/helpers/httpClient';

// Obtener todos los mensajes
export const fetchMessages = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await HttpClient.get('messages', config);
  return data;
};

// Enviar una nueva respuesta a un mensaje existente
export const sendReply = async ({ token, messageId, replyText, user_id }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = { reply: replyText, user_id };

  const response = await HttpClient.post(`messages/${messageId}/reply`, body, config);
  return response;
};

// Enviar un nuevo mensaje
export const sendNewMessage = async ({ token, newMessage, name, user_id, avatar }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const messageData = { text: newMessage, sender: name, user_id, avatar };

  const response = await HttpClient.post('savemessages', messageData, config);
  return response;
};
