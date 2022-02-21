/* eslint-disable */

import { IRdxUser } from '../../redux/ducks/User';

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

export default ButtonController;
