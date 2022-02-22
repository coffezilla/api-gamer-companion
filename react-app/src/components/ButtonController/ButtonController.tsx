/* eslint-disable */
import { useSelector } from 'react-redux';
import { IRdxUser } from '../../redux/ducks/User';

interface IPropsButton {
	layout?: IRdxUser['prefs']['buttonLayout'];
	id: Number;
	size?: Number;
}

const ButtonController = ({ layout, id, size = 6 }: IPropsButton) => {
	const rdxPrefsButtonLayout = useSelector((state: IRdxUser) => state.prefs.buttonLayout);
	let buttonPath = '';
	let buttonLayout = 'df';

	if (id <= 4) {
		buttonPath = `/images/dir_${id}.png`;
	} else {
		switch (rdxPrefsButtonLayout) {
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

	return <img src={buttonPath} className={`w-${size} h-${size} object-cover rounded-full`} />;
};

export default ButtonController;
