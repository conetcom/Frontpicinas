import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import { Form as RHForm } from '@/components';
import { PasswordInput, TextAreaInput, TextInput } from '@/components';
import { useAuthContext } from '@/common/context';
import { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL; // ✅ Usamos la variable de entorno

const PersonalInfo = ({ personalData, handleInputChange }) => {
	const { user } = useAuthContext();

	return (
		<>
			<h5 className="mb-4 text-uppercase">
				<i className="mdi mdi-account-circle me-1"></i> Personal Info
			</h5>
			<Row>
				<Col md={6}>
					<TextInput
						label="First Name"
						type="text"
						name="firstName"
						placeholder={user?.name}
						value={personalData.firstName}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="Last Name"
						type="text"
						name="lastName"
						placeholder={user?.lastname}
						value={personalData.lastName}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<TextAreaInput
						label="Bio"
						name="userbio"
						placeholder={user?.userbio}
						value={personalData.bio}
						rows={4}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
			</Row>
		</>
	);
};

const CompanyInfo = ({ companyData, handleInputChange }) => {
	return (
		<>
			<h5 className="mb-3 text-uppercase bg-light p-2">
				<i className="mdi mdi-office-building me-1"></i> Company Info
			</h5>
			<Row>
				<Col md={6}>
					<TextInput
						label="Company Name"
						type="text"
						name="companyName"
						placeholder="Enter company name"
						value={companyData.companyName}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="NIT"
						type="text"
						name="nit"
						placeholder="Enter NIT"
						value={companyData.nit}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="Address"
						type="text"
						name="adress"
						placeholder="Enter address"
						value={companyData.adress}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<TextInput
						label="Phone"
						type="text"
						name="phone"
						placeholder="Enter phone"
						value={companyData.phone}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="Website"
						type="text"
						name="website"
						placeholder="Enter website URL"
						value={companyData.website}
						containerClass={'mb-3'}
						onChange={handleInputChange}
					/>
				</Col>
			</Row>
		</>
	);
};

const Social = ({ socialData, handleInputChange }) => {
	const socialInfo = [
		{ label: 'Facebook', name: 'facebook', icon: 'mdi mdi-facebook', placeholder: 'Url' },
		{ label: 'Twitter', name: 'twitter', icon: 'mdi mdi-twitter', placeholder: 'Username' },
		{ label: 'Instagram', name: 'instagram', icon: 'mdi mdi-instagram', placeholder: 'Url' },
		{ label: 'Linkedin', name: 'linkedin', icon: 'mdi mdi-linkedin', placeholder: 'Url' },
		{ label: 'Skype', name: 'skype', icon: 'mdi mdi-skype', placeholder: '@username' },
		{ label: 'Github', name: 'github', icon: 'mdi mdi-github', placeholder: 'Username' }
	];

	return (
		<>
			<h5 className="mb-3 text-uppercase bg-light p-2">
				<i className="mdi mdi-earth me-1"></i> Social
			</h5>
			<Row>
				{socialInfo.map((item) => (
					<Col key={item.name} md={6} className="mb-3">
						<Form.Label>{item.label}</Form.Label>
						<InputGroup className="mb-0">
							<span className="input-group-text">
								<i className={item.icon}></i>
							</span>
							<Form.Control
								placeholder={item.placeholder}
								name={item.name}
								value={socialData[item.name]}
								onChange={handleInputChange}
							/>
						</InputGroup>
					</Col>
				))}
			</Row>
		</>
	);
};

const Settings = () => {
	const { user } = useAuthContext();

	const [personalData, setPersonalData] = useState({
		firstName: user?.name || '',
		lastName: user?.lastname || '',
		bio: user?.userbio || '',
		email: user?.email || '',
		userId: user?.id || ''
	});
	
	const [companyData, setCompanyData] = useState({
		companyName: '',
		nit: '',
		adress: '',
		phone: '',
		website: ''
	});

	const [socialData, setSocialData] = useState({
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: '',
		skype: '',
		github: ''
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (['firstName', 'lastName', 'userbio'].includes(name)) {
			setPersonalData((prev) => ({ ...prev, [name]: value }));
		} else if (['companyName', 'nit', 'adress', 'phone', 'website'].includes(name)) {
			setCompanyData((prev) => ({ ...prev, [name]: value }));
		} else {
			setSocialData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			// Personal Info Update
			await axios.post(`${apiUrl}usuarios/update/${user?.id}`, personalData);
			console.log('Información personal actualizada');

			// Company Info Update
			await axios.post(`${apiUrl}clientes/update/${user?.id}`, companyData);
			console.log('Información de la empresa actualizada');

			// Social Info Update
			await axios.post(`${apiUrl}user/social`, { userId: user?.id, ...socialData });
			console.log('Información social actualizada');
			
		} catch (error) {
			console.error('Error actualizando información', error);
		}
	};

	return (
		<RHForm onSubmit={handleFormSubmit}>
			<PersonalInfo personalData={personalData} handleInputChange={handleInputChange} />
			<CompanyInfo companyData={companyData} handleInputChange={handleInputChange} />
			<Social socialData={socialData} handleInputChange={handleInputChange} />

			<div className="text-end">
				<button type="submit" className="btn btn-primary">
					Guardar Cambios
				</button>
			</div>
		</RHForm>
	);
};

export default Settings;
