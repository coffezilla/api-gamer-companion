/* eslint-disable */
import { useSelector } from 'react-redux';

import { IRdxUser } from '../../redux/ducks/User';
import ButtonController from '../ButtonController';

interface IPros {
	title: String;
	group: String;
	dataMoves: any;
	modal?: any;
	handleAdd: any;
}

const CommandsList = ({ title, group, dataMoves, modal, handleAdd }: IPros) => {
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);

	return (
		<>
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-lg md:text-2xl font-bold  text-violet-600">{title}</h2>

				{rdxUserisAuth && (
					<button
						type="button"
						onClick={() => handleAdd(group)}
						className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-md inline-block px-3 py-1 text-sm"
					>
						Adicionar {title}
					</button>
				)}
			</div>
			<div className="block mb-5">
				{dataMoves.length > 0 ? (
					<ul className="">
						{dataMoves.map((moveGroup: any) => {
							return (
								<li className="bg-gray-200 p-3 md:p-5 rounded-lg mb-1" key={moveGroup._id}>
									<div className="-mt-3  flex space-x-2 justify-between ">
										<div className="font-bold basis-1/2 sm:basis-1/3  shrink-0 pt-3 md:pt-3">
											<button
												onClick={() =>
													rdxUserisAuth &&
													modal('MODAL_EDIT_MOVE', { slug: moveGroup.slug, group: group })
												}
												className="text-left font-bold"
											>
												{moveGroup.name}
											</button>
										</div>
										<div className="text-sm items-end  flex flex-wrap space-x-2 space-y-2 justify-end">
											{moveGroup.commands.combination.map((command: any, index: number) => {
												return (
													<div
														className="flex space-x-2 items-end"
														key={`${moveGroup._id}${index}`}
													>
														{index !== 0 && (
															<p className="text-center text-lg md:text-lg lg:text-md xl:text-xl  h-6 lg:h-7 2xl:h-8">
																,
															</p>
														)}
														{command.length > 1 ? (
															command.map((subCommand: any, subIndex: number) => {
																return (
																	<div
																		className="flex space-x-2 items-end"
																		key={`${moveGroup._id}${subIndex}`}
																	>
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
