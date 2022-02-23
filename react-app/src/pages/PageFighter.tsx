/* eslint-disable */
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ModalCustom from '../components/ModalCustom';
import { IRdxUser } from '../redux/ducks/User';
import CommandsList from '../components/CommandsList';
import Swal from 'sweetalert2';

import { validateForm, IForm } from '../components/FormValidation';
import {
	postMoveGroup,
	getMoveGroupData,
	editMoveGroup,
	deleteMoveGroup,
	getDataCharacters,
} from '../Api/characterHandle';

import CombinationInjector from '../components/CombinationInjector/CombinationInjector';
import HeaderCharacter from '../components/HeaderCharacter/HeaderCharacter';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import ButtonController from '../components/ButtonController/ButtonController';

type modalIndex = 'MODAL_ADD_MOVE' | 'MODAL_EDIT_MOVE';

const PageFighter = () => {
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
			value: '',
			error: '',
			type: 'select',
		},
		{
			name: 'group',
			value: '',
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
	// OBS: 2 are not used instead is 4
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
			value: '',
			error: '',
			type: 'select',
		},
		{
			name: 'group',
			value: '',
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
			if (modalData) {
				getDataMove(modalData.slug, modalData.group);
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
		getMoveGroupData(fid, group, slug).then((res: any) => {
			if (res.data.status === 1) {
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
		e.preventDefault();

		const isValid = validationForm(formFields, setFormFields);

		if (isValid) {
			setIsLoading(true);
			// use async function for server validation
			postMoveGroup(
				fid,
				formFields[4].value,
				formFields[0].value,
				formFields[3].value,
				formFields[5].value,
				formFields[1].value,
			).then((res) => {
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
				}

				setIsLoading(false);
			});
		}
	};

	const handleSubmitEdit = (e: any) => {
		e.preventDefault();
		const isValid = validationForm(formFieldsEdit, setFormFieldsEdit);

		if (isValid) {
			setIsLoading(true);
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
				}
				setIsLoading(false);
			});
		}
	};

	const handleSubmitDelete = (e: any) => {
		e.preventDefault();

		Swal.fire({
			title: 'Deletar este golpe?',
			showCancelButton: true,
			confirmButtonText: 'Sim',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				setIsLoading(true);
				deleteMoveGroup(fid, formFieldsEdit[2].value, formFieldsEdit[4].value).then((res) => {
					if (res.data.status === 1) {
						getCharacter();
						closeModal('MODAL_EDIT_MOVE');
					}
					setIsLoading(false);
				});
			}
		});
	};

	const getCharacter = async () => {
		await getDataCharacters(fid).then((res: any) => {
			if (res.data.status === 1) {
				setDataCharacter(res.data.character);
			}
		});
	};

	useEffect(() => {
		getCharacter();
	}, []);

	return (
		<>
			<ModalCustom
				status={modalState.MODAL_ADD_MOVE.status}
				closeModal={closeModal}
				modal="MODAL_ADD_MOVE"
				className="md:rounded-lg p-3 md:p-5"
			>
				<h1 className="text-lg md:text-xl leading-5 uppercase font-bold mb-5">
					CADASTRAR: {formFields[4].value}
				</h1>

				{!isLoading ? (
					<form onSubmit={handleSubmitAdd}>
						<label htmlFor={formFields[0].name} className="block mb-3">
							<span className="block mb-1 font-bold text-xs md:text-md">Nome do comando:</span>
							<input
								type={formFields[0].type}
								name={formFields[0].name}
								id={formFields[0].name}
								maxLength={formFields[0].maxLength}
								value={formFields[0].value}
								onChange={(e: any) => handleChange(e, formFields, setFormFields)}
								className="border block px-3 py-2 w-full rounded-md "
							/>
							<span className="text-sm text-red-500 italic">{formFields[0].error}</span>
						</label>

						<label htmlFor={formFields[1].name} className="block mb-3">
							<span className="block mb-1 font-bold text-xs md:text-md">Requisito:</span>
							<select
								value={formFields[1].value}
								name={formFields[1].name}
								id={formFields[1].name}
								onChange={(e: any) => handleChange(e, formFields, setFormFields)}
								className="border block px-3 py-2 w-full rounded-md appearance-none"
							>
								<option value="">Sem requisito</option>
								<option value="Perto">Perto</option>
								<option value="Longe">Longe</option>
								<option value="Distância de um pulo">Distância de um pulo</option>
								<option value="Meia tela">Meia tela</option>
								<option value="No canto">No canto</option>
								<option value="No alto">No alto</option>
								<option value="Agachado">Agachado</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFields[1].error}</span>
						</label>

						<label htmlFor={formFields[5].name} className="block mb-3">
							<span className="block mb-1 font-bold text-xs md:text-md">Anotação:</span>
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

						<label className="block mb-3">
							<span className="block mb-1 font-bold text-xs md:text-md">Combinação:</span>
							<div className="text-sm items-end flex flex-wrap space-x-2 space-y-2 border px-3 pb-4 w-full rounded-md min-h-[60px] mb-3">
								{formFields[3].value.map((command: any, index: number) => {
									return (
										<div className="flex space-x-2 items-end" key={`${command}${index}`}>
											{index !== 0 && (
												<p className="text-center text-lg md:text-lg lg:text-md xl:text-xl  h-6 lg:h-7 2xl:h-8">
													,
												</p>
											)}
											{command.length > 1 ? (
												command.map((subCommand: any, subIndex: number) => {
													return (
														<div className="flex space-x-2 items-end" key={`${command}${subIndex}`}>
															{subIndex !== 0 && (
																<p className="text-center text-lg md:text-lg lg:text-md xl:text-xl  h-6 lg:h-7 2xl:h-8">
																	+
																</p>
															)}
															<ButtonController id={subCommand} />
														</div>
													);
												})
											) : (
												<ButtonController id={command} />
											)}
										</div>
									);
								})}
							</div>
						</label>

						<CombinationInjector
							value={formFields[3].value}
							onChange={handleChange}
							form={formFields}
							setForm={setFormFields}
						/>

						<button
							type="submit"
							className="border block px-3 py-2 w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow mb-3"
						>
							Cadastrar comando
						</button>

						<button
							type="button"
							onClick={() => closeModal('MODAL_ADD_MOVE')}
							className="border block px-3 py-2 w-full rounded-md bg-white hover:bg-gray-50 text-gray-600 "
						>
							Cancelar
						</button>
					</form>
				) : (
					<p>Carregando...</p>
				)}
			</ModalCustom>

			<ModalCustom
				status={modalState.MODAL_EDIT_MOVE.status}
				closeModal={closeModal}
				modal="MODAL_EDIT_MOVE"
				className="md:rounded-lg p-3 md:p-5"
			>
				<h1 className="text-lg md:text-xl leading-5 uppercase font-bold mb-5">
					EDIÇÃO: {formFieldsEdit[2].value}
				</h1>

				{!isLoading && formFieldsEdit[0].value !== '' ? (
					<form onSubmit={handleSubmitEdit}>
						<label htmlFor={formFieldsEdit[0].name} className="block mb-3 font-bold">
							<span className="block mb-1 font-bold text-xs md:text-md">Nome do comando:</span>
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

						<label htmlFor={formFieldsEdit[1].name} className="block mb-3 font-bold">
							<span className="block mb-1 font-bold text-xs md:text-md">Requisito:</span>
							<select
								value={formFieldsEdit[1].value}
								name={formFieldsEdit[1].name}
								id={formFieldsEdit[1].name}
								onChange={(e: any) => handleChange(e, formFieldsEdit, setFormFieldsEdit)}
								className="border block px-3 py-2 w-full rounded-md appearance-none"
							>
								<option value="">Sem requisito</option>
								<option value="Perto">Perto</option>
								<option value="Longe">Longe</option>
								<option value="Distância de um pulo">Distância de um pulo</option>
								<option value="Meia tela">Meia tela</option>
								<option value="No canto">No canto</option>
								<option value="No alto">No alto</option>
								<option value="Agachado">Agachado</option>
							</select>
							<span className="text-sm text-red-500 italic">{formFieldsEdit[1].error}</span>
						</label>

						<label htmlFor={formFieldsEdit[5].name} className="block mb-3 font-bold">
							<span className="block mb-1 font-bold text-xs md:text-md">Anotação:</span>
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

						<label className="block mb-3">
							<span className="block mb-2 font-bold">Combinação:</span>
							<div className="text-sm items-end flex flex-wrap space-x-2 space-y-2 border px-3 pb-4 w-full rounded-md min-h-[60px] mb-3">
								{formFieldsEdit[3].value.map((command: any, index: number) => {
									return (
										<div className="flex space-x-2 items-end" key={`${command}${index}`}>
											{index !== 0 && (
												<p className="text-center text-lg md:text-lg lg:text-md xl:text-xl  h-6 lg:h-7 2xl:h-8">
													,
												</p>
											)}
											{command.length > 1 ? (
												command.map((subCommand: any, subIndex: number) => {
													return (
														<div className="flex space-x-2 items-end" key={`${command}${subIndex}`}>
															{subIndex !== 0 && (
																<p className="text-center text-lg md:text-lg lg:text-md xl:text-xl  h-6 lg:h-7 2xl:h-8">
																	+
																</p>
															)}
															<ButtonController id={subCommand} />
														</div>
													);
												})
											) : (
												<ButtonController id={command} />
											)}
										</div>
									);
								})}
							</div>
						</label>

						<CombinationInjector
							value={formFieldsEdit[3].value}
							onChange={handleChange}
							form={formFieldsEdit}
							setForm={setFormFieldsEdit}
						/>

						<button
							type="submit"
							className="border block px-3 py-2 w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white shadow mb-3"
						>
							Cadastrar comando
						</button>

						<button
							type="button"
							onClick={() => closeModal('MODAL_EDIT_MOVE')}
							className="border block px-3 py-2 w-full rounded-md bg-white hover:bg-gray-50 text-gray-600 mb-3"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={handleSubmitDelete}
							className="bg-red-50 hover:bg-red-600 text-red-800 hover:text-white rounded-md inline-block px-3 py-1 text-sm"
						>
							Deletar
						</button>
					</form>
				) : (
					<p>Carregando...</p>
				)}
			</ModalCustom>

			<div className="bg-slate-200 min-h-screen w-full p-0 md:p-3 xl:p-3 ">
				<HeaderAdmin />
				{dataCharacter && (
					<HeaderCharacter
						name={dataCharacter.name}
						game={dataCharacter.game}
						description=""
						portrait={dataCharacter.portrait}
					/>
				)}
				<div className="container bg-white border p-3 md:p-10 md:rounded-lg max-w-6xl">
					<div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10">
						<div id="col1">
							{dataCharacter ? (
								(dataCharacter.moves.length > 0 || rdxUserisAuth) && (
									<CommandsList
										group="moves"
										title="Moves"
										handleAdd={handleAddGroupMove}
										dataMoves={dataCharacter.moves}
										modal={openModal}
									/>
								)
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								(dataCharacter.specials.length > 0 || rdxUserisAuth) && (
									<CommandsList
										title="Specials"
										group="specials"
										handleAdd={handleAddGroupMove}
										dataMoves={dataCharacter.specials}
										modal={openModal}
									/>
								)
							) : (
								<p>Carregando...</p>
							)}
						</div>
						<div id="col2">
							{dataCharacter ? (
								(dataCharacter.combos.length > 0 || rdxUserisAuth) && (
									<CommandsList
										group="combos"
										title="Combos"
										handleAdd={handleAddGroupMove}
										dataMoves={dataCharacter.combos}
										modal={openModal}
									/>
								)
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								(dataCharacter.fatalities.length > 0 || rdxUserisAuth) && (
									<CommandsList
										title="Fatality"
										group="fatalities"
										handleAdd={handleAddGroupMove}
										dataMoves={dataCharacter.fatalities}
										modal={openModal}
									/>
								)
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								(dataCharacter.brutalities.length > 0 || rdxUserisAuth) && (
									<CommandsList
										group="brutalities"
										title="Brutality"
										handleAdd={handleAddGroupMove}
										dataMoves={dataCharacter.brutalities}
										modal={openModal}
									/>
								)
							) : (
								<p>Carregando...</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageFighter;
