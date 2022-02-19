/* eslint-disable */
import { useSelector } from 'react-redux';

import { IRdxUser } from '../../redux/ducks/User';

interface IPros {
	title: String;
	dataMoves: any;
}

interface IPropsButton {
	layout: IRdxUser['prefs']['buttonLayout'];
	id: Number;
}

const ButtonController = ({ layout, id }: IPropsButton) => {
	let buttonPath = '';
	let buttonLayout = 'df';

	if (id <= 4) {
		buttonPath = `/images/dir_${id}.png`;
	} else {
		switch (layout) {
			case 0:
				buttonLayout = 'gn';
				break;
			case 1:
				buttonLayout = 'ps';
				break;
			case 2:
				buttonLayout = 'xb';
				break;
			case 3:
				buttonLayout = 'sw';
				break;
			case 4:
				buttonLayout = 'nb';
				break;
			default:
				buttonLayout = 'df';
		}
		buttonPath = `/images/${buttonLayout}_${id}.png`;
	}

	return <img src={buttonPath} className="w-5 object-cover bg-red-100 rounded-full" />;
};

const CommandsList = ({ title, dataMoves }: IPros) => {
	const rdxPrefsButtonLayout = useSelector((state: IRdxUser) => state.prefs.buttonLayout);
	console.log('sapato', typeof rdxPrefsButtonLayout);
	const buttonsCommand = [3, 2, [6, 8, 8]];

	return (
		<div className="block mb-5 rounded-lg p-5 bg-gray-100">
			<h2 className="text-lg font-bold mb-2">{title}</h2>
			{dataMoves.length > 0 ? (
				<ul className="divide-y divide-gray-100">
					{dataMoves.map((fatality: any) => {
						return (
							<li className="py-2 flex space-x-2 items-center" key={fatality._id}>
								<div className="font-bold basis-1/3">{fatality.name}</div>
								<div className="text-sm items-center flex space-x-2">
									{buttonsCommand.map((command: any, index: number) => {
										return (
											<>
												{index !== 0 && <p className=" text-center text-lg">,</p>}
												{command.length > 1 ? (
													command.map((subCommand: any, subIndex: number) => {
														return (
															<>
																{subIndex !== 0 && <p className=" text-center text-lg">+</p>}
																<ButtonController
																	layout={rdxPrefsButtonLayout}
																	id={subCommand}
																	key={subIndex}
																/>
															</>
														);
													})
												) : (
													<ButtonController
														layout={rdxPrefsButtonLayout}
														id={command}
														key={index}
													/>
												)}
											</>
										);
									})}
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<p>0 {title}</p>
			)}
		</div>
	);
};

export default CommandsList;
