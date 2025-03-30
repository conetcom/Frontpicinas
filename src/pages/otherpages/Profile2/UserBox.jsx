import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/common/context';
import axios from 'axios'; // Para hacer la solicitud al backend
import { useState } from 'react'; // Asegúrate de importar useState


import profileImg from '@/assets/images/users/avatar-1.jpg';

const UserBox = () => {
	// Obtener la información del usuario y estado de autenticación desde el contexto
	const { user} = useAuthContext();
	
	// Estado para la imagen seleccionada
	const [selectedFile, setSelectedFile] = useState(null);

	// Estado para mostrar el estado de la subida
	const [uploadStatus, setUploadStatus] = useState('');

	// Estado para la imagen actual del perfil (inicia con la del contexto o la predeterminada)
	const [profileImage, setProfileImage] = useState(user?.profileImage || profileImg);

	// Manejar el cambio de la imagen seleccionada
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	// Enviar la imagen al backend
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Verificar si hay una imagen seleccionada
		if (!selectedFile) {
			setUploadStatus('Por favor selecciona una imagen.');
			return;
		}

		// Crear un objeto FormData para enviar el archivo
		const formData = new FormData();
		formData.append('foto_perfil_url', selectedFile);
		formData.append('user_id',user?.id); // Aquí usamos el ID real del usuario desde el contexto

		try {
			// Hacer la solicitud POST al backend
			const response = await axios.post('https://piscina-api.onrender.com/api/user/upload-profile-pic', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		
  // Imprime la respuesta completa para verificar la estructura
  console.log('Respuesta completa del servidor:', res.data);
			
  if (res.data.success) {
				// Actualizar la imagen en el frontend con la URL recibida
                            
				setProfileImage(res.data.data.profileImage); // Corregido: Asegurarse de acceder al campo correcto
				console.log('Nueva imagen de perfil:', res.data.data.user.profileImage); // Para verificar qué se recibe
		
				// Actualizar el estado de la subida
				setUploadStatus('Foto de perfil actualizada exitosamente.');
			} else {
				setUploadStatus('Hubo un problema al actualizar la foto de perfil.');
			}
		} catch (error) {
			console.error('Error al subir la imagen:', error);
			setUploadStatus('Error al subir la imagen.');
		}
	};

	return (
		<Card className="text-center">
			<Card.Body>
				<img src={profileImage} className="rounded-circle avatar-lg img-thumbnail" alt="" />
				<h4 className="mb-0 mt-2">{user?.name || 'Dominic Keller'}</h4>
				<p className="text-muted font-14">{user?.rol || 'Founder'}</p>
				<button type="button" className="btn btn-success btn-sm mb-2">
					Follow
				</button>
				<button type="button" className="btn btn-danger btn-sm mb-2">
					Message
				</button>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="profilePicUpload">Cambiar Foto de Perfil:</label>
						<input
							type="file"
							id="profilePicUpload"
							accept="image/*"
							onChange={handleFileChange}
							className="form-control mb-2"
						/>
					</div>
					<button type="submit" className="btn btn-primary mb-2">
						Actualizar Foto
					</button>
				</form>
				{uploadStatus && <p>{uploadStatus}</p>}
				{/* Información adicional del usuario */}
				
				<div className="text-start mt-3">
					<h4 className="font-13 text-uppercase">About Me :</h4>
					<p className="text-muted font-13 mb-3">
					{user?.userbio || 'Hi, I am a user and this is my bio.'} {/* Biografía del usuario */}
					
					</p>
					<p className="text-muted mb-2 font-13">
						<strong>Full Name :</strong>
						<span className="ms-2">{user?.name} {user?.lastname}</span>
					</p>

					<p className="text-muted mb-2 font-13">
						<strong>Mobile :</strong>
						<span className="ms-2">(123) 123 1234</span>
					</p>

					<p className="text-muted mb-2 font-13">
						<strong>Email :</strong>
						<span className="ms-2 ">{user?.email || 'user@email.domain'}</span>
					</p>

					<p className="text-muted mb-1 font-13">
						<strong>Location :</strong>
						<span className="ms-2">{user?.location || 'USA'}</span>
					</p>
				</div>
				<ul className="social-list list-inline mt-3 mb-0">
					<li className="list-inline-item">
						<Link to="" className="social-list-item border-primary text-primary">
							<i className="mdi mdi-facebook"></i>
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="" className="social-list-item border-danger text-danger">
							<i className="mdi mdi-google"></i>
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="" className="social-list-item border-info text-info">
							<i className="mdi mdi-twitter"></i>
						</Link>
					</li>
					<li className="list-inline-item">
						<Link to="" className="social-list-item border-secondary text-secondary">
							<i className="mdi mdi-github"></i>
						</Link>
					</li>
				</ul>
			</Card.Body>
		</Card>
	);
};

export default UserBox;
