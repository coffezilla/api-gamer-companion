/* eslint-disable */
import { useSelector } from 'react-redux';
import { IRdxUser } from '../../redux/ducks/User';

interface IPropsButton {
	layout?: IRdxUser['prefs']['buttonLayout'];
	id: number;
	size?: string;
	type?: 'SUM' | 'DIVIDE';
	sequel?: number;
	last?: boolean;
}

const ButtonController = ({
	id,
	size = 'w-5 lg:w-6 2xl:w-8',
	sequel,
	type,
	last,
}: IPropsButton) => {
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
				buttonLayout = 'nt';
				break;
			case 4:
				buttonLayout = 'nb';
				break;
			default:
				buttonLayout = 'df';
		}
		buttonPath = `/images/${buttonLayout}_${id}.png`;
	}

	return (
		<>
			<img src={buttonPath} className={`${size} object-cover rounded-full`} />
			{type && !last && (
				<p className="text-center text-lg md:text-xl h-6 xl:h-7 2xl:h-8 ">
					{type === 'SUM' ? '+' : ','}
				</p>
			)}
		</>
	);
};

export default ButtonController;
