/* eslint-disable */
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { rdxChangeButtonLayout } from '../../redux/ducks/User';
import { setLocalStoragePrefs, getHasLocalStoragePrefs } from '../../helpers/handleStorage';

const SelectButtonLayout = () => {
	const dispatch = useDispatch();
	const [buttonLayout, setButtonLayout] = useState<any>(null);

	const handleSelect = async (e: any) => {
		setButtonLayout(e.target.value);
		await setLocalStoragePrefs({ prefs: { buttonLayout: parseInt(e.target.value) } });
		dispatch(rdxChangeButtonLayout(parseInt(e.target.value)));
	};

	const getCurrentButtonLayoutData = async () => {
		const localStoragePrefs = getHasLocalStoragePrefs();
		if (localStoragePrefs.status) {
			console.log('cha', localStoragePrefs);
			setButtonLayout(localStoragePrefs.data.buttonLayout);
			dispatch(rdxChangeButtonLayout(localStoragePrefs.data.buttonLayout));
		} else {
			console.log('xxx', localStoragePrefs);
			setButtonLayout(0);
			await setLocalStoragePrefs({ prefs: { buttonLayout: 0 } });
			dispatch(rdxChangeButtonLayout(0));
		}
	};

	useEffect(() => {
		getCurrentButtonLayoutData();
	}, []);

	return (
		<div>
			{buttonLayout !== null && (
				<select onChange={handleSelect} value={buttonLayout}>
					<option value="0">0 - Generic</option>
					<option value="1">1 - Playstation</option>
					<option value="2">2 - XBox</option>
					<option value="3">3 - Switch</option>
					<option value="4">4 - Number</option>
				</select>
			)}
		</div>
	);
};

export default SelectButtonLayout;
