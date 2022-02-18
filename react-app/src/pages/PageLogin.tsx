/* eslint-disable operator-linebreak */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { rdxLoginUser } from '../redux/ducks/User';
import MainMenu from '../components/MainMenu';

import { validateForm, IForm } from '../components/FormValidation';

import { serverLoginUser } from '../components/Auth';

const PageLogin = () => {
	const history = useHistory();
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
			<div className=" bg-slate-200 h-screen w-full py-5">
				<div className="bg-white border max-w-lg p-10 rounded-lg mx-auto">
					<h1 className="text-xl font-bold text-center mb-5">LOGIN ADMINISTRADOR</h1>

					{!isLogging ? (
						<form onSubmit={handleSubmit}>
							<label htmlFor={formFields[0].name} className="block mb-3">
								<span className="block mb-2">E-mail:</span>
								<input
									type={formFields[0].type}
									name={formFields[0].name}
									id={formFields[0].name}
									maxLength={formFields[0].maxLength}
									value={formFields[0].value}
									onChange={handleChange}
									className="border block px-3 py-2 w-full rounded-md"
								/>
								<span className="text-sm text-red-500 italic">{formFields[0].error}</span>
							</label>

							<label htmlFor={formFields[1].name} className="block mb-3">
								<span className="block mb-2">Senha:</span>
								<input
									type={formFields[1].type}
									name={formFields[1].name}
									id={formFields[1].name}
									maxLength={formFields[1].maxLength}
									value={formFields[1].value}
									onChange={handleChange}
									className="border block px-3 py-2 w-full rounded-md"
								/>
								<span className="text-sm text-red-500 italic">{formFields[1].error}</span>
							</label>

							<button
								type="submit"
								className="border block px-3 py-2 w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow mb-3"
							>
								Fazer login
							</button>
							<button
								type="button"
								onClick={() => history.push('/')}
								className="border block px-3 py-2 w-full rounded-md bg-white hover:bg-gray-50 text-gray-600 "
							>
								Cancelar
							</button>
						</form>
					) : (
						<p>logging...</p>
					)}
					<MainMenu />
				</div>
			</div>
		</>
	);
};

export default PageLogin;
