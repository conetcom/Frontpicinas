import React, { createContext, useContext, useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

const notificationTypes = {
  error: 'danger',
  info: 'info',
  success: 'success',
  default: 'light',
};

function Toastr({ show, title, message, onClose, variant = 'light', delay = 5000 }) {
  return (
    <ToastContainer className="p-3" position="top-end">
      <Toast bg={variant.toLowerCase()} delay={delay} show={show} onClose={onClose} autohide>
        {title && (
          <Toast.Header className={`text-${variant}`}>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
        )}
        <Toast.Body className={['dark', 'danger'].includes(variant) ? 'text-white' : ''}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toastConfig, setToastConfig] = useState({
    show: false,
    title: '',
    message: '',
    variant: 'light',
  });

  const socket = io(import.meta.env.VITE_SOCKET_URL);

  // Mostrar toast
  const showNotification = ({ title, message, type }) => {
    setToastConfig({
      show: true,
      title,
      message,
      variant: notificationTypes[type] ?? 'light',
    });
  };

  const hideNotification = () => {
    setToastConfig({ ...toastConfig, show: false });
  };

  // Agregar notificación estructurada
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

  // WebSocket listeners
  useEffect(() => {
    socket.on('newMessage', (message) => {
      const notification = {
        title: message.username || 'Nuevo mensaje',
        subText: message.messages,
        avatar: message.avatar_url,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        variant: 'primary',
        icon: 'ri-message-2-line',
        isRead: false,
      };
      addNotification(notification);
      showNotification({ title: 'mensaje', message: message.messages, type: 'info' });
    });

    socket.on('newReply', (reply) => {
      const notification = {
        title: reply.username || 'Nueva respuesta',
        subText: reply.reply,
        avatar: reply.avatar_url,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        variant: 'info',
        icon: 'ri-reply-line',
        isRead: false,
      };
      addNotification(notification);
      showNotification({ title: 'respuesta', message: reply.reply, type: 'success' });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, notifications }}>
      <Toastr {...toastConfig} onClose={hideNotification} />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
