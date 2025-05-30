import { useState, useEffect } from "react";
import axios from "axios";
const appurl = import.meta.env.VITE_API_URL;
export const useCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem("token");
  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Cargar eventos desde el backend al montar el componente
  useEffect(() => {
    const fetchEvents = async () => {
  try {

    const res = await axios.get(`${appurl}events`, authConfig);
    const formattedEvents = res.data.map(ev => ({
      id: ev.id,
      title: ev.title,
      start: ev.start,
      end: ev.fin, // <- transformamos `fin` a `end`
      className: ev.category, // <- FullCalendar usa className para estilos
    }));
    setCalendarEvents(formattedEvents);
  } catch (err) {
  if (err.response) {
    // El servidor respondió con un código de error
    console.error("Error loading events - Response error:", err.response.status, err.response.data);
  } else if (err.request) {
    // No se recibió respuesta
    console.error("Error loading events - No response received:", err.request);
  } else {
    // Error de configuración u otro error
    console.error("Error loading events - Other error:", err.message);
  }
}

};
    fetchEvents();
  }, []);

  // Maneja la creación o edición del evento
  const handleEventSubmit = async (eventData) => {
    console.log("Token:", token);
    try {
      if (eventData.id) {
        // Editar evento
      await axios.put(`${appurl}events/${eventData.id}`, eventData, authConfig);
        setCalendarEvents((prev) =>
          prev.map((ev) => (ev.id === eventData.id ? eventData : ev))
        );
      } else {
        // Crear evento
        const res = await axios.post(`${appurl}events`, eventData, authConfig);
        setCalendarEvents((prev) => [...prev, res.data]);
      }
      setOpenModal(false);
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  // Eliminar evento
  const handleEventDelete = async (id) => {
   console.log("ID recibido para eliminar:", id, typeof id); // <--- Añade esto

    try {
      await axios.delete(`${appurl}events/${id}`, authConfig);
      setCalendarEvents((prev) => prev.filter((ev) => ev.id !== id));
      setOpenModal(false);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };
  
  // Click en un evento (para editar)
const handleEventClick = (clickInfo) => {
  const id = clickInfo.event.id;
  const event = calendarEvents.find(ev => ev.id.toString() === id.toString()); // por si el tipo difiere
  if (event) {
    setSelectedEvent(event);
    setOpenModal(true);
  }
};

  // Click en un día (crear nuevo evento)
  const handleDateClick = (selectInfo) => {
    setSelectedEvent({
      title: "",
      start: selectInfo.dateStr,
      fin: selectInfo.dateStr,
      category: "",
    });
    setOpenModal(true);
  };

  // Mover evento (drag & drop)
 const handleEventDrop = async (dropInfo) => {
  try {
    const originalEvent = calendarEvents.find(
      (ev) => ev.id === parseInt(dropInfo.event.id)
    );

    if (!originalEvent) {
      console.error("Evento no encontrado para ID:", dropInfo.event.id);
      return;
    }

    const updatedEvent = {
      ...originalEvent,
      start: dropInfo.event.start.toISOString(),
      fin: dropInfo.event.end.toISOString(), // Asegúrate de que tu backend espera "fin" y no "end"
    };

    console.log("Actualizando evento:", updatedEvent);

    // Llama al backend
    
    await axios.put(`${appurl}events/${updatedEvent.id}`, updatedEvent, authConfig);

    // Actualiza el estado en el frontend
    setCalendarEvents((prevEvents) =>
      prevEvents.map((ev) =>
        ev.id === updatedEvent.id ? updatedEvent : ev
      )
    );
  } catch (err) {
    console.error("Error al actualizar evento arrastrado:", err);
  }
};


 return {
  events: calendarEvents,
  eventData: selectedEvent,
  isOpen: openModal,
  onOpenModal: () => setOpenModal(true),
  onCloseModal: () => setOpenModal(false),
  isEditable: !!selectedEvent?.id,
  onEventClick: handleEventClick,
  onDateClick: handleDateClick,
  onAddEvent: handleEventSubmit,
  onUpdateEvent: handleEventSubmit,
  onRemoveEvent: handleEventDelete,
  onEventDrop: handleEventDrop,
};

};
export default useCalendar;