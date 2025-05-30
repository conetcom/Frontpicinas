import {
	CheckInput,
	Form,
	PasswordInput,
	TextInput,
	PageBreadcrumb,
} from '@/components';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import AccountWrapper from '../AccountWrapper';
import useRegister from './useRegister';
import { useFormContext } from 'react-hook-form';

const BottomLink = () => {
	const { t } = useTranslation();

	return (
		<Row className="mt-3">
			<Col className="text-center">
				<p className="text-muted">
					{t('Already have account?')}
					<Link to={'/account/login'} className="text-muted ms-1">
						<b>{t('Log In')}</b>
					</Link>
				</p>
			</Col>
		</Row>
	);
};

const RoleSelect = () => {
	const { t } = useTranslation();
	const { register, formState } = useFormContext();
	const error = formState.errors?.rol;

	return (
		<div className="mb-3">
			<label htmlFor="rol" className="form-label">
				{t('Role')}
			</label>
			<select
				name="rol"
				id="rol"
				className={`form-control ${error ? 'is-invalid' : ''}`}
				{...register('rol')}
			>
				<option value="">{t('Select a role')}</option>
				<option value="user">{t('User')}</option>
				<option value="admin">{t('Admin')}</option>
			</select>
			{error && <div className="invalid-feedback">{error.message}</div>}
		</div>
	);
};

export default function Register() {
	const { t } = useTranslation();
	const { loading, register: onSubmit, isAuthenticated, schema } = useRegister();

	return (
		<>
			{isAuthenticated && <Navigate to="/" replace />}
			<PageBreadcrumb title="Register" />
			<AccountWrapper bottomLinks={<BottomLink />}>
				<div className="text-center w-75 m-auto">
					<h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Free Sign Up')}</h4>
					<p className="text-muted mb-4">
						{t("Don't have an account? Create your account, it takes less than a minute")}
					</p>
				</div>

				<Form
					onSubmit={onSubmit}
					schema={schema}
					defaultValues={{
						email: 'info@conetweb.com',
						username: 'conetcom',
						lastname: 'conetcom',
						password1: 'info2025',
						password2: 'info2025',
						rol: '',
					}}
				>
					<TextInput
						label={t('Name')}
						type="text"
						name="username"
						placeholder={t('Enter your name')}
						containerClass="mb-3"
					/>
					<TextInput
						label={t('Last name')}
						type="text"
						name="lastname"
						placeholder={t('Enter your last name')}
						containerClass="mb-3"
					/>
					<TextInput
						label={t('Email Address')}
						type="text"
						name="email"
						placeholder={t('Enter your email')}
						containerClass="mb-3"
					/>
					<PasswordInput
						label={t('Password')}
						name="password1"
						placeholder={t('Enter password')}
						containerClass="mb-3"
					/>
					<PasswordInput
						label={t('Confirm Password')}
						name="password2"
						placeholder={t('Confirm password')}
						containerClass="mb-3"
					/>

					{/* Selector de rol */}
					<RoleSelect />

					<CheckInput
						name="checkbox"
						type="checkbox"
						containerClass="mb-2"
						label={
							<>
								{t('I accept')}{' '}
								<span className="text-muted cursor-pointer">
									<Link to="/terms" target="_blank">
										{t('Terms and Conditions')}
									</Link>
								</span>
							</>
						}
						defaultChecked
					/>

					<div className="mb-3 text-center">
						<Button variant="primary" type="submit" disabled={loading}>
							{t('Sign Up')}
						</Button>
					</div>
				</Form>
			</AccountWrapper>
		</>
	);
}
