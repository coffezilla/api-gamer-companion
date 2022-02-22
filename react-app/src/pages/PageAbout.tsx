/* eslint-disable operator-linebreak */
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// import { rdxLoginUser } from '../redux/ducks/User';

// import { validateForm, IForm } from '../components/FormValidation';

// import { serverLoginUser } from '../components/Auth';

const PageAbout = () => {
	// const history = useHistory();
	// const [formFields, setFormFields] = useState<IForm['inputs']>([
	// 	{
	// 		name: 'email',
	// 		value: 'foo@mail.com',
	// 		error: '',
	// 		type: 'email',
	// 	},
	// 	{
	// 		name: 'password',
	// 		value: '123',
	// 		error: '',
	// 		type: 'password',
	// 	},
	// ]);

	// const dispatch = useDispatch();
	// const [isLogging, setIsLogging] = useState<boolean>(false);

	// const validationForm = () => {
	// 	const inputRequired = validateForm(formFields, setFormFields);
	// 	const hasNoErrors = inputRequired.hasPassed;

	// 	return hasNoErrors;
	// };

	// const handleChange = (e: any) => {
	// 	const isCheckBox = e.target.type === 'checkbox';
	// 	let currentValue = e.target.value;

	// 	// OPTIONAL: clean spaces
	// 	if (e.target.name === 'password') {
	// 		currentValue = currentValue.replace(/\s/g, '');
	// 		currentValue = currentValue.toLowerCase();
	// 	}

	// 	setFormFields(
	// 		formFields.map((field: any) => {
	// 			if (field.name === e.target.name) {
	// 				return {
	// 					...field,
	// 					value: isCheckBox ? e.target.checked : currentValue,
	// 					error: '',
	// 				};
	// 			}
	// 			return { ...field };
	// 		}),
	// 	);
	// };

	// const handleSubmit = (e: any) => {
	// 	e.preventDefault();
	// 	setIsLogging(true);
	// 	const isValid = validationForm();

	// 	if (isValid) {
	// 		// use async function for server validation
	// 		serverLoginUser(formFields).then((responseServerLogin) => {
	// 			if (responseServerLogin.data.status === 1) {
	// 				dispatch(rdxLoginUser());
	// 			} else {
	// 				setIsLogging(false);
	// 			}
	// 		});
	// 	}
	// };

	return (
		<>
			<div className=" bg-slate-200 h-screen w-full flex justify-center items-center">
				<div className="bg-white border md:max-w-[500px] w-full h-full md:h-auto p-3 md:p-10  md:rounded-lg ">
					<h1 className="text-xl font-bold text-center mb-5">GUIDANCE</h1>
					<p>
						Este é um projeto feito para servir como um guia para os jogadores de games em geral.
					</p>
				</div>
			</div>
		</>
	);
};

export default PageAbout;
