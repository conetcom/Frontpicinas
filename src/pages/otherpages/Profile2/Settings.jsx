import { Row, Col, InputGroup, Form } from 'react-bootstrap';
import { Form as RHForm } from '@/components';
import { Link } from 'react-router-dom';
import { PasswordInput, TextAreaInput, TextInput } from '@/components';
import { useAuthContext } from '@/common/context';
import { useState } from 'react';

const PersonalInfo = () => {
const { user} = useAuthContext();
console.log(user);
  const [personalData, setPersonalData] = useState({
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
      await axios.post('/api/update-personal-info', personalData); // Cambia por el endpoint correcto
      console.log('Información personal actualizada');
    } catch (error) {
      console.error('Error actualizando información personal', error);
    }
  };

  return (
    <RHForm onSubmit={handlePersonalInfoSubmit}>
      <TextInput
        label="First Name"
        type="text"
        name="firstName"
		placeholder={firstName}
        value={personalData.firstName}
        onChange={handleInputChange}
      />
      <TextInput
        label="Last Name"
        type="text"
        name="lastName"
		placeholder={lastName}
        value={personalData.lastName}
        onChange={handleInputChange}
      />
      <TextAreaInput
        label="Bio"
        name="bio"
		placeholder={bio}
        value={personalData.bio}
        onChange={handleInputChange}
        rows={4}
      />
      <TextInput
        label="Email"
        type="email"
        name="email"
		placeholder={email}
        value={personalData.email}
        onChange={handleInputChange}
      />
      <button type="submit" className="btn btn-success mt-2">
        Save
      </button>
    </RHForm>
  );
};


/*
const PersonalInfo = () => {
	const { user} = useAuthContext();

	return (
		<>
			<h5 className="mb-4 text-uppercase">
				<i className="mdi mdi-account-circle me-1"></i> Información Personal 
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
					/>
				</Col>
			</Row>
			<Row>
				<Col md={6} className="mb-3">
					<TextInput
						label="Email Address"
						type="email"
						name="usermail"
						placeholder="Enter email"
						key="useremail"
					/>
					<span className="form-text text-muted">
						<small>
							If you want to change email please <Link to="">click</Link> here.
						</small>
					</span>
				</Col>
				<Col md={6} className="mb-3">
					<PasswordInput
						label="Password"
						name="userpassword"
						placeholder="Enter password"
						key="userpassword"
					/>
					<span className="form-text text-muted">
						<small>
							If you want to change password please <Link to="">click</Link> here.
						</small>
					</span>
				</Col>
			</Row>
		</>
	);
}; */

const CompanyInfo = () => {
	return (
		<>
			<h5 className="mb-3 text-uppercase bg-light p-2">
				<i className="mdi mdi-office-building me-1"></i> Información Compañia
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
						label="Email"
						type="text"
						name="email"
						placeholder="Enter Email"
						containerClass={'mb-3'}
						key="email"
					/>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<TextInput
						label="Telefono"
						type="text"
						name="phone"
						placeholder="Enter phone Number"
						containerClass={'mb-3'}
						key="phone"
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="direccion"
						type="text"
						name="direccion"
						placeholder="Enter Adress"
						containerClass={'mb-3'}
						key="direccion"
					/>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<TextInput
						label="Nit"
						type="text"
						name="nit"
						placeholder="Enter NIT Number"
						containerClass={'mb-3'}
						key="nit"
					/>
				</Col>
				<Col md={6}>
					<TextInput
						label="Website"
						type="text"
						name="website"
						placeholder="Enter Website"
						containerClass={'mb-3'}
						key="Website"
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
