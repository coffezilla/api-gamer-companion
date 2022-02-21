/* eslint-disable */

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IRdxUser } from '../../redux/ducks/User';
import ButtonController from '../ButtonController';

const CombinationInjector = ({ value, onChange, setForm, form }: any) => {
	const [holdButton, setHoldButton] = useState<Boolean>(false);
	const [combination, setCombination] = useState<any[]>([]);
	const rdxPrefsButtonLayout = useSelector((state: IRdxUser) => state.prefs.buttonLayout);

	//
	const handleHoldButton = () => {
		setHoldButton(!holdButton);
	};

	//
	const handleDeleteButton = () => {
		combination.pop();
		setCombination([...combination]);
		onChange({ target: { name: 'combination', type: 'text', value: combination } }, form, setForm);
	};

	//
	const handleAddButton = (button: Number) => {
		let currentCombination = combination;

		if (holdButton) {
			const lastButtonHold = currentCombination.length === 0 ? [] : currentCombination.slice(-1)[0];
			let currentButtonHold = [];

			// check if is array
			if (lastButtonHold.length >= 1) {
				currentCombination.pop();
				currentButtonHold = [...lastButtonHold, button];
			} else {
				currentButtonHold = [button];
			}

			currentCombination = [...currentCombination, currentButtonHold];
		} else {
			currentCombination = [...currentCombination, button];
		}

		setCombination(currentCombination);
		onChange(
			{ target: { name: 'combination', type: 'text', value: currentCombination } },
			form,
			setForm,
		);
	};

	useEffect(() => {
		console.log('return');
		setCombination(value);
	}, [value]);

	return (
		<>
			<h1>Contact</h1>
			<div className="bg-red-">
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(1)}
				>
					<ButtonController layout={rdxPrefsButtonLayout} id={1} />
				</button>
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(2)}
				>
					<ButtonController layout={rdxPrefsButtonLayout} id={2} />
				</button>
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(3)}
				>
					<ButtonController layout={rdxPrefsButtonLayout} id={3} />
				</button>
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(4)}
				>
					<ButtonController layout={rdxPrefsButtonLayout} id={4} />
				</button>

				<button type="button" className="p-1 bg-gray-400 hover:bg-gray-500">
					1
				</button>
				<button type="button" className="p-1 bg-gray-400 hover:bg-gray-500">
					2
				</button>
				<button type="button" className="p-1 bg-gray-400 hover:bg-gray-500">
					3
				</button>
				<button type="button" className="p-1 bg-gray-400 hover:bg-gray-500">
					4
				</button>
				<button type="button" className="p-1 bg-gray-400 hover:bg-gray-500">
					5
				</button>
				<button type="button" className="p-1 bg-gray-400 hover:bg-gray-500">
					6
				</button>

				<button
					type="button"
					className={`p-1  hover:bg-gray-500 ${holdButton ? 'bg-gray-500' : 'bg-gray-400'}`}
					onClick={() => handleHoldButton()}
				>
					HOLD
				</button>
				<button
					type="button"
					className={`p-1 bg-gray-400 hover:bg-gray-500`}
					onClick={() => handleDeleteButton()}
				>
					DELETE
				</button>
				<pre>{JSON.stringify(combination, null, 1)}</pre>
				<pre>hold: {JSON.stringify(holdButton, null, 1)}</pre>
			</div>
		</>
	);
};

export default CombinationInjector;
