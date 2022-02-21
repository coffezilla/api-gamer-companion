/* eslint-disable */
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { rdxChangeButtonLayout, rdxChangeGame } from '../../redux/ducks/User';
import { setLocalStoragePrefs, getHasLocalStoragePrefs } from '../../helpers/handleStorage';

const SelectButtonLayout = () => {
	const dispatch = useDispatch();
	const [buttonLayout, setButtonLayout] = useState<any>(null);
	const [gameFilter, setGameFilter] = useState<any>(null);

	//
	const updatePrefs = async (button: Number, game: String) => {
		setLocalStoragePrefs({ prefs: { buttonLayout: button, game: game } });
	};

	const handleSelectButtons = (e: any) => {
		setButtonLayout(parseInt(e.target.value));
		updatePrefs(parseInt(e.target.value), gameFilter);
		dispatch(rdxChangeButtonLayout(parseInt(e.target.value)));
	};

	const handleSelectGame = (e: any) => {
		setGameFilter(e.target.value);
		updatePrefs(buttonLayout, e.target.value);
		dispatch(rdxChangeGame(e.target.value));
	};

	const getCurrentPrefs = async () => {
		const localStoragePrefs = getHasLocalStoragePrefs();
		if (localStoragePrefs.status) {
			console.log('cha', localStoragePrefs);
			setButtonLayout(localStoragePrefs.data.buttonLayout);
			setGameFilter(localStoragePrefs.data.game);
			dispatch(rdxChangeButtonLayout(localStoragePrefs.data.buttonLayout));
			dispatch(rdxChangeGame(localStoragePrefs.data.game));
		} else {
			setButtonLayout(0);
			setGameFilter('');
			await setLocalStoragePrefs({ prefs: { buttonLayout: 0, game: '' } });
			dispatch(rdxChangeButtonLayout(0));
			dispatch(rdxChangeGame(''));
		}
	};

	useEffect(() => {
		getCurrentPrefs();
	}, []);

	return (
		<>
			<div>
				{buttonLayout !== null && (
					<select onChange={handleSelectButtons} value={buttonLayout}>
						<option value="0">0 - Generic</option>
						<option value="1">1 - Playstation</option>
						<option value="2">2 - XBox</option>
						<option value="3">3 - Switch</option>
						<option value="4">4 - Number</option>
					</select>
				)}
			</div>
			<br />
			<div>
				{buttonLayout !== null && (
					<select onChange={handleSelectGame} value={gameFilter}>
						<option value="">0 - Todos</option>
						<option value="Mortal Kombat IX">0 - Mortal Kombat IX</option>
						<option value="Mortal Kombat X">1 - Mortal Kombat X</option>
						<option value="Mortal Kombat XI">2 - Mortal Kombat XI</option>
					</select>
				)}
			</div>
		</>
	);
};

export default SelectButtonLayout;
