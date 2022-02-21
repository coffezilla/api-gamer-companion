/* eslint-disable */

import { useState, useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import ButtonController from '../components/ButtonController';

const PageContact = () => {
	const [holdButton, setHoldButton] = useState<Boolean>(false);
	const [combination, setCombination] = useState<any[]>([]);

	//
	const handleHoldButton = () => {
		setHoldButton(!holdButton);
	};

	//
	const handleDeleteButton = () => {
		combination.pop();
		setCombination([...combination]);
	};

	//
	const handleAddButton = (button: Number) => {
		let currentCombination = combination;

		if (holdButton) {
			const lastButtonHold = currentCombination.slice(-1)[0];
			let currentButtonHold = [];

			// // check if is array
			if (lastButtonHold.length >= 1) {
				currentCombination.pop();
				currentButtonHold = [...lastButtonHold, 'y'];
			} else {
				currentButtonHold = ['x'];
			}

			currentCombination = [...currentCombination, currentButtonHold];
		} else {
			currentCombination = [...currentCombination, button];
		}

		setCombination(currentCombination);
	};

	return (
		<>
			<h1>Contact</h1>
			<div className="bg-red-">
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(1)}
				>
					<ButtonController layout={1} id={1} />
				</button>
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(2)}
				>
					<ButtonController layout={1} id={2} />
				</button>
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(3)}
				>
					<ButtonController layout={1} id={3} />
				</button>
				<button
					type="button"
					className="p-1 bg-gray-400 hover:bg-gray-500"
					onClick={() => handleAddButton(4)}
				>
					<ButtonController layout={1} id={4} />
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
			<MainMenu />
		</>
	);
};

export default PageContact;
