import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = io(import.meta.env.VITE_SOCKET_URL);

  const addNotification = (newNotiMessage) => {
    setNotifications((prev) => {
      const today = prev.find((item) => item.day === 'Hoy');
      if (today) {
        return prev.map((item) =>
          item.day === 'Hoy'
            ? { ...item, messages: [newNotiMessage, ...item.messages] }
            : item
        );
      } else {
        return [{ day: 'Hoy', messages: [newNotiMessage] }, ...prev];
      }
    });
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      addNotification({
        title: message.username || 'Nuevo mensaje',
        subText: message.messages,
        avatar: message.avatar_url,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        variant: 'primary',
        icon: 'ri-message-2-line',
        isRead: false,
      });
    });

    socket.on('newReply', (reply) => {
      addNotification({
        title: reply.username || 'Nueva respuesta',
        subText: reply.reply,
        avatar: reply.avatar_url,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        variant: 'info',
        icon: 'ri-reply-line',
        isRead: false,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// ✅ Solo este hook es necesario
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
