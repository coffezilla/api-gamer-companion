/* eslint-disable */
import { Link } from 'react-router-dom';
import SelectButtonLayout from '../SelectButtonLayout';

const HeaderCharacter = ({ name, game, description, portrait }: any) => {
	const backgroundPortrait = portrait;
	return (
		<>
			<div className="container bg-white border py-5 px-10 rounded-lg max-w-6xl mb-3 flex justify-between space-x-5 items-center">
				<div className="flex space-x-5 items-center">
					<Link to="/">
						<div className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-md inline-block px-3 py-1">
							Voltar
						</div>
					</Link>
					<div
						className={`rounded-md aspect-square bg-slate-300 block w-16 bg-cover`}
						style={{
							backgroundImage: `url("${backgroundPortrait}")`,
						}}
					/>
					<div>
						<h1 className="text-2xl font-bold">{name}</h1>
						<p className="text-md font-bold">{game}</p>
						<p className="text-sm text-gray-500">{description && description}</p>
					</div>
				</div>
				<div className="flex space-x-5">
					<SelectButtonLayout selectLayout />
				</div>
			</div>
		</>
	);
};

export default HeaderCharacter;
