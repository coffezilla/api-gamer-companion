/* eslint-disable */
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import ModalCustom from '../components/ModalCustom';
import CommandsList from '../components/CommandsList';
import { validateForm, IForm } from '../components/FormValidation';
import { postFatality } from '../Api/characterHandle';

import { END_POINT_BASE } from '../Api';

type modalIndex = 'MY_MODAL' | 'SECOND_MODAL';

const PageFighter = () => {
	const history = useHistory();
	const [isLogging, setIsLogging] = useState<boolean>(false);
	const [formFields, setFormFields] = useState<IForm['inputs']>([
		{
			name: 'name',
			value: '',
			error: '',
			type: 'text',
		},
		{
			name: 'requirement',
			value: 'Perto',
			error: '',
			type: 'select',
		},
		{
			name: 'group',
			value: 'Fatality',
			error: '',
			type: 'select',
		},
		{
			name: 'combination',
			value: [7, 7, 7, 7],
			error: '',
			type: 'text',
		},
	]);

	const { fid } = useParams<any>();
	const [dataCharacter, setDataCharacter] = useState<any>(null);
	const [modalState, setModalState] = useState({
		MY_MODAL: { status: false },
		SECOND_MODAL: { status: false },
	});

	// MODAL
	const openModal = (modalName: modalIndex) => {
		setModalState({ ...modalState, [modalName]: { status: true } });
	};

	const closeModal = (modalName: modalIndex) => {
		const documentBody: HTMLBodyElement | null = document.querySelector('body');
		if (documentBody !== null) {
			documentBody.className = '';
		}
		setModalState({ ...modalState, [modalName]: { status: false } });
	};

	// FORM
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
			console.log('ALERTADO COM SUCESSO!');
			postFatality(fid, formFields[0].value, formFields[3].value).then((res) => {
				console.log('aksdjfkasjfkad', res.data);
				if (res.data.status === 1) {
					console.log(res);
					console.log('SALVOU');
					getCharacter();
					setFormFields([
						{ ...formFields[0], value: '' },
						{ ...formFields[1], value: '' },
						{ ...formFields[2], value: '' },
						{ ...formFields[3], value: [] },
					]);
					closeModal('MY_MODAL');
					// const [formFields, setFormFields] = useState<IForm['inputs']>([
					// 	{
					// 		name: 'email',
					// 		value: 'foo@mail.com',
					// 		error: '',
					// 		type: 'email',
					// 	},
					// 	{
					// 		name: 'requirement',
					// 		value: 'Perto',
					// 		error: '',
					// 		type: 'select',
					// 	},
					// 	{
					// 		name: 'group',
					// 		value: 'Fatality',
					// 		error: '',
					// 		type: 'select',
					// 	},
					// ]);
				} else {
					alert('erro');
				}

				setIsLogging(false);
			});
			// serverLoginUser(formFields).then((responseServerLogin) => {
			// 	if (responseServerLogin.data.status === 1) {
			// 		dispatch(rdxLoginUser());
			// 	} else {
			// 		setIsLogging(false);
			// 	}
			// });
		}
	};

	const getCharacter = async () => {
		setDataCharacter(null);
		await axios({
			method: 'get',
			url: `${END_POINT_BASE}/characters/${fid}`,
		}).then((res) => {
			setDataCharacter(res.data[0]);

			console.log('personagem', res.data[0]);
		});
	};

	useEffect(() => {
		getCharacter();
		openModal('MY_MODAL');
	}, []);

	return (
		<>
			<ModalCustom
				status={modalState.MY_MODAL.status}
				closeModal={closeModal}
				modal="MY_MODAL"
				className="rounded-lg p-5"
			>
				<h1 className="text-xl font-bold text-center mb-2">CADASTRAR FATALITY</h1>

				{!isLogging ? (
					<form onSubmit={handleSubmit}>
						<label htmlFor={formFields[0].name} className="block mb-3">
							<span className="block mb-2">Nome do comando:</span>
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
							<span className="block mb-2">Requisito:</span>
							<select
								value={formFields[1].value}
								name={formFields[1].name}
								id={formFields[1].name}
								onChange={handleChange}
								className="border block px-3 py-2 w-full rounded-md"
							>
								<option value="Perto">1 - Perto</option>
								<option value="Longe">2 - Longe</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFields[1].error}</span>
						</label>

						<label htmlFor={formFields[2].name} className="block mb-3">
							<span className="block mb-2">Tipo de movimento:</span>
							<select
								value={formFields[2].value}
								name={formFields[2].name}
								id={formFields[2].name}
								onChange={handleChange}
								className="border block px-3 py-2 w-full rounded-md"
							>
								<option value="fatality">1 - Fatality</option>
								<option value="brutality">2 - Brutality</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFields[2].error}</span>
						</label>

						<button
							type="submit"
							className="border block px-3 py-2 w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow mb-3"
						>
							Cadastrar comando
						</button>
					</form>
				) : (
					<p>logging...</p>
				)}

				<pre>{JSON.stringify(formFields, null, 1)}</pre>
				<button type="button" onClick={() => closeModal('MY_MODAL')}>
					CLOSE BUTTON
				</button>
			</ModalCustom>

			<div className="bg-slate-200 h-screen w-full py-5">
				<div className="container bg-white border p-10 rounded-lg max-w-6xl">
					<Link to="/">
						<div className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-xl inline-block px-3 py-1 mb-5">
							Voltar
						</div>
					</Link>
					{dataCharacter && <h1 className="text-xl font-bold mb-5">{dataCharacter.name}</h1>}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
						<div id="col1">
							<button type="button" onClick={() => openModal('MY_MODAL')}>
								Open My Sample Modal
							</button>
							{dataCharacter ? (
								<CommandsList title="Fatality" dataMoves={dataCharacter.fatalities} />
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								<CommandsList title="Brutality" dataMoves={dataCharacter.brutalities} />
							) : (
								<p>Carregando...</p>
							)}
						</div>
						<div id="col2">
							{dataCharacter ? (
								<CommandsList title="Combos" dataMoves={dataCharacter.combos} />
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								<CommandsList title="Moves" dataMoves={dataCharacter.moves} />
							) : (
								<p>Carregando...</p>
							)}
						</div>
					</div>
					<MainMenu />
				</div>
			</div>
		</>
	);
};

export default PageFighter;
