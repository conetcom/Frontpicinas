import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import { Form as RHForm } from '@/components';
import { Link } from 'react-router-dom';
import { PasswordInput, TextAreaInput, TextInput } from '@/components';
import { useAuthContext } from '@/common/context';
import { useState } from 'react';


const PersonalInfo = () => {
	const { user} = useAuthContext();

		const [personalData, setPersonalData] = useState({
		  id: user?.id,
		  firstName: user?.name || '',
		  lastName: user?.lastname || '',
		  bio: user?.userbio || '',
		  email: user?.email || ''
		});
	  
		const handleInputChange = (e) => {
		  const { name, value } = e.target;
		  setPersonalData((prevData) => ({
			...prevData,
			[name]: value,
		  }));
		};
	  
		const handlePersonalInfoSubmit = async (e) => {
		  e.preventDefault();
		  
		  try {
			await axios.post('https://piscina-api.onrender.com/api/user/update', personalData); // Cambia por el endpoint correcto
			console.log('Información personal actualizada');
		  } catch (error) {
			console.error('Error actualizando información personal', error);
		  }
		};
	
	return (
		<RHForm onSubmit={handlePersonalInfoSubmit}>
		<>
			<h5 className="mb-4 text-uppercase">
				<i className="mdi mdi-account-circle me-1"></i> Personal Info
			</h5>
			<Row>
				<Col md={6}>
					<TextInput
						label="First Name"
						type="text"
						name="username"
						placeholder= {user?.name}
						containerClass={'mb-3'}
						key="firstnameuser"
						onChange={handleInputChange}

					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="Last Name"
						type="text"
						name="lastname"
						placeholder= {user?.lastname}
						containerClass={'mb-3'}
						key="lastname"
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
						rows={4}
						containerClass={'mb-3'}
						key="userbio"
						onChange={handleInputChange}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={6} className="mb-3">
					
					<span className="form-text text-muted">
						<h5>
							If you want to change email please <Link to="">click</Link> here.
						</h5>
					</span>
				</Col>
				<Col md={6} className="mb-3">
					
					<span className="form-text text-muted">
						<h5>
							If you want to change password please <Link to="">click</Link> here.
						</h5>
					</span>
				</Col>
			</Row>
		</>
		<button type="submit" className="btn btn-success mt-2">
        Save
      </button>
		</RHForm>
	);
};

const CompanyInfo = () => {
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
						name="companyname"
						placeholder="Enter company name"
						containerClass={'mb-3'}
						key="companyname"
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="Website"
						type="text"
						name="cwebsite"
						placeholder="Enter website url"
						containerClass={'mb-3'}
						key="cwebsite"
					/>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<TextInput
						label="Company Name"
						type="text"
						name="companyname"
						placeholder="Enter company name"
						containerClass={'mb-3'}
						key="companyname"
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="Website"
						type="text"
						name="cwebsite"
						placeholder="Enter website url"
						containerClass={'mb-3'}
						key="cwebsite"
					/>
				</Col>
			</Row>
		</>
		
	);
};

const Social = ({ socialinfo }) => {
	return (
		<>
			<h5 className="mb-3 text-uppercase bg-light p-2">
				<i className="mdi mdi-earth me-1"></i> Social
			</h5>

			<Row>
				{socialinfo.map((item, index) => {
					return (
						<Col key={index.toString()} md={6} className="mb-3">
							<Form.Label> {item.label} </Form.Label>
							<InputGroup className="mb-0">
								<span className="input-group-text">
									<i className={item.icon}></i>
								</span>
								<Form.Control placeholder={item.placeholder} />
							</InputGroup>
						</Col>
					);
				})}
			</Row>
		</>
	);
};

const Settings = () => {
	const socialInfo = [
		{
			label: 'Facebook',
			icon: 'mdi mdi-facebook',
			placeholder: 'Url',
		},
		{
			label: 'Twitter',
			icon: 'mdi mdi-twitter',
			placeholder: 'Username',
		},
		{
			label: 'Instagram',
			icon: 'mdi mdi-instagram',
			placeholder: 'Url',
		},
		{
			label: 'Linkedin',
			icon: 'mdi mdi-linkedin',
			placeholder: 'Url',
		},
		{
			label: 'Skype',
			icon: 'mdi mdi-skype',
			placeholder: '@username',
		},
		{
			label: 'Github',
			icon: 'mdi mdi-github',
			placeholder: 'Username',
		},
	];

	return (
		<RHForm onSubmit={(e) => e.preventDefault()}>
			<PersonalInfo />
			<CompanyInfo />
			<Social socialinfo={socialInfo} />

			<div className="text-end">
				<button type="submit" className="btn btn-success mt-2">
					<i className="mdi mdi-content-save"></i> Save
				</button>
			</div>
		</RHForm>
	);
};

export default Settings;
