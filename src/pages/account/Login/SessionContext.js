import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
const SessionContext = createContext();

// Crear el proveedor del contexto
export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  // Cargar la sesión al cargar la aplicación
  useEffect(() => {
    const savedSession = localStorage.getItem('sessionData');
    if (savedSession) {
      setSessionData(JSON.parse(savedSession)); // Cargar datos de la sesión desde localStorage
    }
  }, []);

  // Función para guardar la sesión (después de success: true)
  const saveSession = (data) => {
    localStorage.setItem('sessionData', JSON.stringify(data)); // Guardar en localStorage
    setSessionData(data); // Actualizar el estado del contexto
  };

  // Función para cerrar sesión
  const clearSession = () => {
    localStorage.removeItem('sessionData'); // Eliminar la sesión del almacenamiento local
    setSessionData(null); // Limpiar el estado
  };

  return (
    <SessionContext.Provider value={{ sessionData, saveSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
