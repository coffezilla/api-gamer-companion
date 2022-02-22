import SelectButtonLayout from '../SelectButtonLayout';

const HeaderGame = ({ title }: any) => {
	return (
		<>
			<div className="container bg-white border py-5 px-10 rounded-lg max-w-6xl mb-3 flex justify-between space-x-5 items-center">
				<h1 className="text-2xl font-bold uppercase">{title === '' ? 'Todos os jogos' : title}</h1>
				<div className="flex space-x-5">
					<SelectButtonLayout selectGame />
				</div>
			</div>
		</>
	);
};

export default HeaderGame;
