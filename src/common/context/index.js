/*
export * from './useAuthContext';
export { useTheme, ThemeProvider } from './useThemeContext';
export * from './useNotificationContext'; */
// src/common/context/index.js

export { useAuthContext, AuthProvider } from './useAuthContext';
export { useNotificationContext } from './useNotificationContext';
export * from './useThemeContext';
// Agrega más si tienes otros contextos
export { NotificationProvider, useNotifications } from './useNotificationContext';
