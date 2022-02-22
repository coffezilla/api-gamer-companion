/* eslint-disable */

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IRdxUser } from '../../redux/ducks/User';
import ButtonController from '../ButtonController';

const ButtonPressing = ({ buttonIndex, buttonLayout, handleClick }: any) => {
	return (
		<button
			type="button"
			className="p-1 bg-gray-100 hover:bg-violet-500 rounded-full"
			onClick={() => handleClick(buttonIndex)}
		>
			<ButtonController layout={buttonLayout} id={buttonIndex} size={40} />
		</button>
	);
};

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
			<div className="grid grid-cols-8 gap-4 my-5">
				<div className="text-center">
					<ButtonPressing
						buttonIndex={1}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={2}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={3}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={4}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={5}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={6}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={7}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={8}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={9}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={10}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={11}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={12}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={13}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>
				<div className="text-center">
					<ButtonPressing
						buttonIndex={14}
						buttonLayout={rdxPrefsButtonLayout}
						handleClick={handleAddButton}
					/>
				</div>

				<div className="text-center">
					<button
						type="button"
						className={`p-1 ${
							holdButton ? 'bg-violet-500' : 'bg-gray-100'
						} hover:bg-violet-500 rounded-full`}
						onClick={() => handleHoldButton()}
					>
						<ButtonController layout={rdxPrefsButtonLayout} id={15} size={40} />
					</button>
				</div>

				<div className="text-center">
					<button
						type="button"
						className="p-1 bg-gray-100 hover:bg-red-400 rounded-full"
						onClick={() => handleDeleteButton()}
					>
						<ButtonController layout={rdxPrefsButtonLayout} id={16} size={40} />
					</button>
				</div>

				{/* <pre>{JSON.stringify(combination, null, 1)}</pre> */}
				{/* <pre>hold: {JSON.stringify(holdButton, null, 1)}</pre> */}
			</div>
		</>
	);
};

export default CombinationInjector;
