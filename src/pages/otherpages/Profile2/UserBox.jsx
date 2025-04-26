import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/common/context';
import axios from 'axios';
import { useState } from 'react';
import profileImg from '@/assets/images/users/avatar-1.jpg';

const apiUrl = import.meta.env.VITE_API_URL;

const UserBox = () => {
	const { user } = useAuthContext();
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploadStatus, setUploadStatus] = useState('');
	const [profileImage, setProfileImage] = useState(user?.user?.profileImage || profileImg);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!selectedFile) return setUploadStatus('Por favor selecciona una imagen.');

		const formData = new FormData();
		formData.append('image', selectedFile);
		formData.append('user_id', user?.user?.id);

		try {
			const token = localStorage.getItem('token');
			const response = await axios.post(`${apiUrl}upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.data.success) {
				setProfileImage(response.data.data.profileImage);
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
				<h4 className="mb-0 mt-2">{user?.user?.name || 'Wilmer M'}</h4>
				<p className="text-muted font-14">{user?.user?.rol || 'Founder'}</p>
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
					<button type="submit" className="btn btn-primary mb-2">Actualizar Foto</button>
				</form>
				{uploadStatus && <p>{uploadStatus}</p>}
				<div className="text-start mt-3">
					<h4 className="font-13 text-uppercase">About Me :</h4>
					<p className="text-muted font-13 mb-3">{user?.user?.userbio || 'Hi, I am a user and this is my bio.'}</p>
					<p className="text-muted mb-2 font-13">
						<strong>Full Name :</strong>
						<span className="ms-2">{user?.user?.name} {user?.user?.lastname}</span>
					</p>
					<p className="text-muted mb-2 font-13">
						<strong>Mobile :</strong>
						<span className="ms-2">(123) 123 1234</span>
					</p>
					<p className="text-muted mb-2 font-13">
						<strong>Email :</strong>
						<span className="ms-2 ">{user?.user?.email || 'user@email.domain'}</span>
					</p>
					<p className="text-muted mb-1 font-13">
						<strong>Location :</strong>
						<span className="ms-2">{user?.user?.location || 'USA'}</span>
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
