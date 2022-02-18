/* eslint-disable operator-linebreak */
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { rdxLoginUser } from '../redux/ducks/User';
import MainMenu from '../components/MainMenu';

import { validateForm, IForm } from '../components/FormValidation';

import { serverLoginUser } from '../components/Auth';

const PageLogin = () => {
	const [formFields, setFormFields] = useState<IForm['inputs']>([
		{
			name: 'email',
			value: 'foo@mail.com',
			error: '',
			type: 'email',
		},
		{
			name: 'password',
			value: '123',
			error: '',
			type: 'password',
		},
	]);

	const dispatch = useDispatch();
	const [isLogging, setIsLogging] = useState<boolean>(false);

	const validationForm = () => {
		const inputRequired = validateForm(formFields, setFormFields);
		const hasNoErrors = inputRequired.hasPassed;

		return hasNoErrors;
	};

	const handleChange = (e: any) => {
		const isCheckBox = e.target.type === 'checkbox';
		let currentValue = e.target.value;

		// OPTIONAL: clean spaces
		if (e.target.name === 'password') {
			currentValue = currentValue.replace(/\s/g, '');
			currentValue = currentValue.toLowerCase();
		}

		setFormFields(
			formFields.map((field: any) => {
				if (field.name === e.target.name) {
					return {
						...field,
						value: isCheckBox ? e.target.checked : currentValue,
						error: '',
					};
				}
				return { ...field };
			}),
		);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setIsLogging(true);
		const isValid = validationForm();

		if (isValid) {
			// use async function for server validation
			serverLoginUser(formFields).then((responseServerLogin) => {
				if (responseServerLogin.data.status === 1) {
					dispatch(rdxLoginUser());
				} else {
					setIsLogging(false);
				}
			});
		}
	};

	return (
		<>
			<h1>Page login</h1>
			{!isLogging ? (
				<form onSubmit={handleSubmit}>
					<label htmlFor={formFields[0].name}>
						My E-mail:
						<input
							type={formFields[0].type}
							name={formFields[0].name}
							id={formFields[0].name}
							maxLength={formFields[0].maxLength}
							value={formFields[0].value}
							onChange={handleChange}
						/>
						<span>{formFields[0].error}</span>
					</label>
					<br />

					<label htmlFor={formFields[1].name}>
						password:
						<input
							type={formFields[1].type}
							name={formFields[1].name}
							id={formFields[1].name}
							maxLength={formFields[1].maxLength}
							value={formFields[1].value}
							onChange={handleChange}
						/>
						<span>{formFields[1].error}</span>
					</label>
					<br />
					<button type="submit">Login</button>
				</form>
			) : (
				<p>logging...</p>
			)}
			<MainMenu />
		</>
	);
};

export default PageLogin;
