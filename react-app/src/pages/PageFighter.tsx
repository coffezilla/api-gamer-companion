/* eslint-disable */
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import ModalCustom from '../components/ModalCustom';
import CommandsList from '../components/CommandsList';
import { validateForm, IForm } from '../components/FormValidation';
import {
	postMoveGroup,
	getMoveGroupData,
	editMoveGroup,
	deleteMoveGroup,
} from '../Api/characterHandle';

import { END_POINT_BASE } from '../Api';

type modalIndex = 'MODAL_ADD_MOVE' | 'MODAL_EDIT_MOVE';

const PageFighter = () => {
	const history = useHistory();
	const [isLogging, setIsLogging] = useState<boolean>(false);

	// edit move
	const [formFieldsEdit, setFormFieldsEdit] = useState<IForm['inputs']>([
		{
			name: 'name',
			value: '',
			error: '',
			type: 'text',
			isRequired: true,
		},
		{
			name: 'requirement',
			value: 'Longe',
			error: '',
			type: 'select',
		},
		{
			name: 'group',
			value: 'fatalities',
			error: '',
			type: 'select',
		},
		{
			name: 'combination',
			value: [],
			error: '',
			type: 'text',
		},
		{
			name: 'slug',
			value: '',
			error: '',
			type: 'text',
		},
		{
			name: 'annotation',
			value: '',
			error: '',
			type: 'text',
		},
	]);

	// new move
	const [formFields, setFormFields] = useState<IForm['inputs']>([
		{
			name: 'name',
			value: '',
			error: '',
			type: 'text',
			isRequired: true,
		},
		{
			name: 'requirement',
			value: 'Perto',
			error: '',
			type: 'select',
		},
		{
			name: 'group',
			value: 'fatalities',
			error: '',
			type: 'select',
		},
		{
			name: 'combination',
			value: [],
			error: '',
			type: 'text',
		},
		{
			name: 'group',
			value: '',
			error: '',
			type: 'text',
		},
		{
			name: 'annotation',
			value: '',
			error: '',
			type: 'text',
		},
	]);

	const { fid } = useParams<any>();
	const [dataCharacter, setDataCharacter] = useState<any>(null);
	const [modalState, setModalState] = useState({
		MODAL_ADD_MOVE: { status: false },
		MODAL_EDIT_MOVE: { status: false },
	});

	// MODAL
	const openModal = (
		modalName: modalIndex,
		modalData: { slug: String; group: String } | null = { slug: '', group: '' },
	) => {
		setModalState({ ...modalState, [modalName]: { status: true } });

		//
		if (modalName === 'MODAL_EDIT_MOVE') {
			setFormFieldsEdit([
				{ ...formFieldsEdit[0], value: '' },
				{ ...formFieldsEdit[1], value: '' },
				{ ...formFieldsEdit[2], value: '' },
				{ ...formFieldsEdit[3], value: [] },
				{ ...formFieldsEdit[4], value: '' },
				{ ...formFieldsEdit[5], value: '' },
			]);
			// console.log('adicionar novos', modalData);
			if (modalData) {
				getDataMove(modalData.slug, modalData.group);
				// alert(modalData.group);
			}
		}
	};

	const closeModal = (modalName: modalIndex) => {
		const documentBody: HTMLBodyElement | null = document.querySelector('body');
		if (documentBody !== null) {
			documentBody.className = '';
		}
		setModalState({ ...modalState, [modalName]: { status: false } });
	};

	// FORM EDITION
	const getDataMove = async (slug: String, group: String) => {
		console.log('find', slug);
		getMoveGroupData(fid, group, slug).then((res: any) => {
			if (res.data.status === 1) {
				console.log('man', res.data.move);
				setFormFieldsEdit([
					{ ...formFieldsEdit[0], value: res.data.move.name },
					{ ...formFieldsEdit[1], value: res.data.move.commands.requirement },
					{ ...formFieldsEdit[2], value: group },
					{ ...formFieldsEdit[3], value: res.data.move.commands.combination },
					{ ...formFieldsEdit[4], value: res.data.move.slug },
					{ ...formFieldsEdit[5], value: res.data.move.annotation },
				]);
			}
		});
		// get data from server
	};

	// BUTTON ADD
	const handleAddGroupMove = (groupMove: String) => {
		setFormFields([
			{ ...formFields[0] },
			{ ...formFields[1] },
			{ ...formFields[2] },
			{ ...formFields[3] },
			{ ...formFields[4], value: groupMove },
			{ ...formFields[5] },
		]);
		openModal('MODAL_ADD_MOVE');
		console.log('sao paulo', groupMove);
	};

	// FORM
	const validationForm = (form: any, setForm: any) => {
		const inputRequired = validateForm(form, setForm);
		const hasNoErrors = inputRequired.hasPassed;

		return hasNoErrors;
	};

	const handleChange = (e: any, form: any, setForm: any) => {
		const isCheckBox = e.target.type === 'checkbox';
		let currentValue = e.target.value;

		// OPTIONAL: clean spaces
		if (e.target.name === 'password') {
			currentValue = currentValue.replace(/\s/g, '');
			currentValue = currentValue.toLowerCase();
		}

		setForm(
			form.map((field: any) => {
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

	const handleSubmitAdd = (e: any) => {
		console.log('quinto');
		e.preventDefault();

		const isValid = validationForm(formFields, setFormFields);

		if (isValid) {
			setIsLogging(true);
			// use async function for server validation
			postMoveGroup(
				fid,
				formFields[4].value,
				formFields[0].value,
				formFields[3].value,
				formFields[5].value,
				formFields[1].value,
			).then((res) => {
				console.log('aksdjfkasjfkad', res.data);
				if (res.data.status === 1) {
					getCharacter();
					setFormFields([
						{ ...formFields[0], value: '' },
						{ ...formFields[1] },
						{ ...formFields[2], value: '' },
						{ ...formFields[3], value: [] },
						{ ...formFields[4], value: '' },
						{ ...formFields[5], value: '' },
					]);
					closeModal('MODAL_ADD_MOVE');
				} else {
					alert('erro');
				}

				setIsLogging(false);
			});
		}
	};

	const handleSubmitEdit = (e: any) => {
		e.preventDefault();
		const isValid = validationForm(formFieldsEdit, setFormFieldsEdit);

		if (isValid) {
			setIsLogging(true);
			editMoveGroup(
				fid,
				formFieldsEdit[2].value,
				formFieldsEdit[4].value,
				formFieldsEdit[0].value,
				formFieldsEdit[3].value,
				formFieldsEdit[5].value,
				formFieldsEdit[1].value,
			).then((res) => {
				if (res.data.status === 1) {
					getCharacter();
					closeModal('MODAL_EDIT_MOVE');
					console.log('done');
				} else {
					console.log('error');
				}
				setIsLogging(false);
			});
		}
	};

	const handleSubmitDelete = (e: any) => {
		e.preventDefault();
		setIsLogging(true);
		deleteMoveGroup(fid, formFieldsEdit[2].value, formFieldsEdit[4].value).then((res) => {
			if (res.data.status === 1) {
				getCharacter();
				console.log('deletar move');
				closeModal('MODAL_EDIT_MOVE');
			} else {
				console.log('nao deletou');
			}
			setIsLogging(false);
		});
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
		// openModal('MODAL_ADD_MOVE');
	}, []);

	return (
		<>
			<ModalCustom
				status={modalState.MODAL_ADD_MOVE.status}
				closeModal={closeModal}
				modal="MODAL_ADD_MOVE"
				className="rounded-lg p-5"
			>
				<h1 className="text-xl font-bold text-center mb-2">CADASTRAR COMANDO</h1>

				{!isLogging ? (
					<form onSubmit={handleSubmitAdd}>
						<label htmlFor={formFields[0].name} className="block mb-3">
							<span className="block mb-2">Nome do comando:</span>
							<input
								type={formFields[0].type}
								name={formFields[0].name}
								id={formFields[0].name}
								maxLength={formFields[0].maxLength}
								value={formFields[0].value}
								onChange={(e: any) => handleChange(e, formFields, setFormFields)}
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
								onChange={(e: any) => handleChange(e, formFields, setFormFields)}
								className="border block px-3 py-2 w-full rounded-md"
							>
								<option value="Perto">1 - Perto</option>
								<option value="Longe">2 - Longe</option>
								<option value="Meia tela">3 - Meia tela</option>
								<option value="No canto">4 - No canto</option>
								<option value="No alto">5 - No alto</option>
								<option value="Agachado">6 - Agachado</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFields[1].error}</span>
						</label>

						<label htmlFor={formFields[5].name} className="block mb-3">
							<span className="block mb-2">Anotação:</span>
							<input
								type={formFields[5].type}
								name={formFields[5].name}
								id={formFields[5].name}
								maxLength={formFields[5].maxLength}
								value={formFields[5].value}
								onChange={(e: any) => handleChange(e, formFields, setFormFields)}
								className="border block px-3 py-2 w-full rounded-md"
							/>
							<span className="text-sm text-red-500 italic">{formFields[5].error}</span>
						</label>

						{/* <label htmlFor={formFields[2].name} className="block mb-3">
							<span className="block mb-2">Tipo de movimento:</span>
							<select
								value={formFields[2].value}
								name={formFields[2].name}
								id={formFields[2].name}
								onChange={(e: any) => handleChange(e, formFields, setFormFields)}
								className="border block px-3 py-2 w-full rounded-md"
							>
								<option value="fatality">1 - Fatality</option>
								<option value="brutality">2 - Brutality</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFields[2].error}</span>
						</label> */}

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

				{/* <pre>{JSON.stringify(formFields, null, 1)}</pre> */}
				<button type="button" onClick={() => closeModal('MODAL_ADD_MOVE')}>
					CLOSE BUTTON
				</button>
			</ModalCustom>

			<ModalCustom
				status={modalState.MODAL_EDIT_MOVE.status}
				closeModal={closeModal}
				modal="MODAL_EDIT_MOVE"
				className="rounded-lg p-5"
			>
				<h1 className="text-xl font-bold text-center mb-2">EDITAR FATALITY</h1>

				{!isLogging ? (
					<form onSubmit={handleSubmitEdit}>
						<label htmlFor={formFieldsEdit[0].name} className="block mb-3">
							<span className="block mb-2">Nome do comando:</span>
							<input
								type={formFieldsEdit[0].type}
								name={formFieldsEdit[0].name}
								id={formFieldsEdit[0].name}
								maxLength={formFieldsEdit[0].maxLength}
								value={formFieldsEdit[0].value}
								onChange={(e: any) => handleChange(e, formFieldsEdit, setFormFieldsEdit)}
								className="border block px-3 py-2 w-full rounded-md"
							/>
							<span className="text-sm text-red-500 italic">{formFieldsEdit[0].error}</span>
						</label>

						<label htmlFor={formFieldsEdit[1].name} className="block mb-3">
							<span className="block mb-2">Requisito:</span>
							<select
								value={formFieldsEdit[1].value}
								name={formFieldsEdit[1].name}
								id={formFieldsEdit[1].name}
								onChange={(e: any) => handleChange(e, formFieldsEdit, setFormFieldsEdit)}
								className="border block px-3 py-2 w-full rounded-md"
							>
								<option value="Perto">1 - Perto</option>
								<option value="Longe">2 - Longe</option>
								<option value="Meia tela">3 - Meia tela</option>
								<option value="No canto">4 - No canto</option>
								<option value="No alto">5 - No alto</option>
								<option value="Agachado">6 - Agachado</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFieldsEdit[1].error}</span>
						</label>

						<label htmlFor={formFieldsEdit[5].name} className="block mb-3">
							<span className="block mb-2">Anotação:</span>
							<input
								type={formFieldsEdit[5].type}
								name={formFieldsEdit[5].name}
								id={formFieldsEdit[5].name}
								maxLength={formFieldsEdit[5].maxLength}
								value={formFieldsEdit[5].value}
								onChange={(e: any) => handleChange(e, formFieldsEdit, setFormFieldsEdit)}
								className="border block px-3 py-2 w-full rounded-md"
							/>
							<span className="text-sm text-red-500 italic">{formFieldsEdit[5].error}</span>
						</label>

						{/* <label htmlFor={formFieldsEdit[2].name} className="block mb-3">
							<span className="block mb-2">Tipo de movimento:</span>
							<select
								value={formFieldsEdit[2].value}
								name={formFieldsEdit[2].name}
								id={formFieldsEdit[2].name}
								onChange={(e: any) => handleChange(e, formFieldsEdit, setFormFieldsEdit)}
								className="border block px-3 py-2 w-full rounded-md"
							>
								<option value="fatality">1 - Fatality</option>
								<option value="brutality">2 - Brutality</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFieldsEdit[2].error}</span>
						</label> */}

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

				{/* <pre>{JSON.stringify(formFieldsEdit, null, 1)}</pre> */}
				<button type="button" onClick={() => closeModal('MODAL_EDIT_MOVE')}>
					CLOSE BUTTON
				</button>
				<button type="button" onClick={handleSubmitDelete}>
					DELETAR FATALITY
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
							<button type="button" onClick={() => handleAddGroupMove('fatalities')}>
								CADASTRAR FATALITY
							</button>
							<br />
							<button type="button" onClick={() => handleAddGroupMove('brutalities')}>
								CADASTRAR BRUTALITY
							</button>
							<br />
							<button type="button" onClick={() => handleAddGroupMove('combos')}>
								CADASTRAR COMBOS
							</button>
							<br />
							<button type="button" onClick={() => handleAddGroupMove('moves')}>
								CADASTRAR MOVES
							</button>

							{dataCharacter ? (
								<CommandsList
									title="Fatality"
									group="fatalities"
									dataMoves={dataCharacter.fatalities}
									modal={openModal}
								/>
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								<CommandsList
									group="brutalities"
									title="Brutality"
									dataMoves={dataCharacter.brutalities}
									modal={openModal}
								/>
							) : (
								<p>Carregando...</p>
							)}
						</div>
						<div id="col2">
							{dataCharacter ? (
								<CommandsList
									group="combos"
									title="Combos"
									dataMoves={dataCharacter.combos}
									modal={openModal}
								/>
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								<CommandsList
									group="moves"
									title="Moves"
									dataMoves={dataCharacter.moves}
									modal={openModal}
								/>
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
