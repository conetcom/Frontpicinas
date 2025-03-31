import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardTitle } from '..';
import MessageList from './MessageList';
import MessageItem from './MessageItem';

// Componente de mensajes
const Messages = () => {
	// Estado para almacenar los mensajes
	const [messages, setMessages] = useState([]);

	// Hook para obtener los mensajes de la API al cargar el componente
	useEffect(() => {
		// Aquí llamamos a la API para obtener los mensajes
		fetch('https://piscina-api.onrender.com/api/usuarios/messages') // Cambia esta URL por la correcta de tu API
			.then((response) => response.json())
			.then((data) => setMessages(data)) // Actualiza el estado con los datos obtenidos
			.catch((error) => console.error('Error fetching messages:', error));
	}, []); // El array vacío [] significa que se ejecuta solo al montar el componente

	return (
		<Card>
			<Card.Body>
				<CardTitle
					containerClass="d-flex align-items-center justify-content-between mb-3"
					title="Messages"
					menuItems={[{ label: 'Settings' }, { label: 'Action' }]}
				/>

				<MessageList>
					{messages.map((message) => (
						<MessageItem key={message.id}>
							<div className="inbox-item-img">
								<img src={message.avatarUrl} className="rounded-circle" alt={message.author} />
							</div>
							<p className="inbox-item-author">{message.author}</p>
							<p className="inbox-item-text">{message.text}</p>
							<p className="inbox-item-date">
								<Link to="" className="btn btn-sm btn-link text-info font-13">
									Reply
								</Link>
							</p>
						</MessageItem>
					))}
				</MessageList>
			</Card.Body>
		</Card>
	);
};

export default Messages;

