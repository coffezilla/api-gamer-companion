/* eslint-disable */
import { Link } from 'react-router-dom';
import SelectButtonLayout from '../SelectButtonLayout';

const HeaderCharacter = ({ name, game, description, portrait }: any) => {
	const backgroundPortrait = portrait;
	return (
		<>
			<div className="container bg-white border py-3 md:py-5 px-3 md:px-10 md:rounded-lg max-w-6xl md:mb-3 md:flex justify-between md:space-x-5 items-center">
				<div className="flex space-x-5 items-center pb-3 md:pb-0">
					<Link to="/">
						<div className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-md inline-block px-3 py-1">
							Voltar
						</div>
					</Link>
					<div
						className={`rounded-md aspect-square bg-slate-300 block w-8 md:w-16 bg-cover`}
						style={{
							backgroundImage: `url("${backgroundPortrait}")`,
						}}
					/>
					<div>
						<h1 className="text-lg md:text-2xl leading-5 font-bold">{name}</h1>
						<p className="text-xs md:text-md  leading-3 font-bold">{game}</p>
						<p className="text-xs text-gray-500">{description && description}</p>
					</div>
				</div>
				<div className="md:flex space-x-5">
					<SelectButtonLayout selectLayout />
				</div>
			</div>
		</>
	);
};

export default HeaderCharacter;
