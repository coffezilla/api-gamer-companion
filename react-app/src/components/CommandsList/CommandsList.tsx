/* eslint-disable */
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { IRdxUser } from '../../redux/ducks/User';
import ButtonController from '../ButtonController';

interface IPros {
	title: String;
	group: String;
	dataMoves: any;
	modal?: any;
	handleAdd: any;
}

// interface IPropsButton {
// 	layout: IRdxUser['prefs']['buttonLayout'];
// 	id: Number;
// }

// const ButtonController = ({ layout, id }: IPropsButton) => {
// 	let buttonPath = '';
// 	let buttonLayout = 'df';

// 	if (id <= 4) {
// 		buttonPath = `/images/dir_${id}.png`;
// 	} else {
// 		switch (layout) {
// 			case 0:
// 				buttonLayout = 'gn';
// 				break;
// 			case 1:
// 				buttonLayout = 'ps';
// 				break;
// 			case 2:
// 				buttonLayout = 'xb';
// 				break;
// 			case 3:
// 				buttonLayout = 'sw';
// 				break;
// 			case 4:
// 				buttonLayout = 'nb';
// 				break;
// 			default:
// 				buttonLayout = 'df';
// 		}
// 		buttonPath = `/images/${buttonLayout}_${id}.png`;
// 	}

// 	return <img src={buttonPath} className="w-5 object-cover bg-red-100 rounded-full" />;
// };

const CommandsList = ({ title, group, dataMoves, modal, handleAdd }: IPros) => {
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);
	// const rdxPrefsButtonLayout = useSelector((state: IRdxUser) => state.prefs.buttonLayout);

	return (
		<>
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-2xl font-bold  text-violet-600">{title}</h2>

				{rdxUserisAuth && (
					<button
						type="button"
						onClick={() => handleAdd(group)}
						className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-md inline-block px-3 py-1 text-sm"
					>
						Adicionar {title}
					</button>
				)}
				{/* <Link to="/">
					<div className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-md inline-block px-3 py-1">
						Voltar
					</div>
				</Link> */}
			</div>
			<div className="block mb-5">
				{dataMoves.length > 0 ? (
					<ul className="">
						{dataMoves.map((moveGroup: any) => {
							return (
								<li className="bg-gray-50 p-5 rounded-lg mb-1" key={moveGroup._id}>
									<div className="-mt-3  flex space-x-2 justify-between">
										<div className="font-bold basis-1/3 shrink-0 pt-3">
											<button
												onClick={() =>
													rdxUserisAuth &&
													modal('MODAL_EDIT_MOVE', { slug: moveGroup.slug, group: group })
												}
												className="text-left font-bold"
											>
												{moveGroup.name}
											</button>
											{/* <pre>{JSON.stringify(moveGroup, null, 1)}</pre> */}
										</div>
										<div className="text-sm items-end flex flex-wrap space-x-2 space-y-2">
											{moveGroup.commands.combination.map((command: any, index: number) => {
												return (
													<div className="flex space-x-2 items-center" key={`${command}${index}`}>
														{index !== 0 && <p className="text-center text-lg">,</p>}
														{command.length > 1 ? (
															command.map((subCommand: any, subIndex: number) => {
																return (
																	<div
																		className="flex space-x-2 items-center"
																		key={`${command}${subIndex}`}
																	>
																		{subIndex !== 0 && <p className="text-center text-lg">+</p>}
																		<ButtonController id={subCommand} size={30} />
																	</div>
																);
															})
														) : (
															<ButtonController id={command} size={30} />
														)}
													</div>
												);
											})}
										</div>
									</div>

									{(moveGroup.commands.requirement !== '' || moveGroup.annotation !== '') && (
										<div className="mt-2">
											{moveGroup.commands.requirement !== '' && (
												<p className="text-sm">
													<span className="font-bold">Requisitos:</span>{' '}
													{moveGroup.commands.requirement}
												</p>
											)}

											{moveGroup.annotation !== '' && (
												<p className="text-sm">
													<span className="font-bold">Nota:</span> {moveGroup.annotation}
												</p>
											)}
										</div>
									)}
								</li>
							);
						})}
					</ul>
				) : (
					<p>0 {title}</p>
				)}
			</div>
		</>
	);
};

export default CommandsList;
