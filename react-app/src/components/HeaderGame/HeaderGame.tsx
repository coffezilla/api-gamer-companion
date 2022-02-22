import SelectButtonLayout from '../SelectButtonLayout';

const HeaderGame = ({ title }: any) => {
	return (
		<>
			<div className="container bg-white border py-3 md:py-5 px-3 md:px-10 md:rounded-lg md:max-w-6xl md:mb-3 md:flex justify-between md:space-x-5 items-center">
				<h1 className="text-lg md:text-2xl font-bold uppercase">
					{title === '' ? 'Todos os jogos' : title}
				</h1>
				<div className="md:flex md:space-x-5">
					<SelectButtonLayout selectGame />
				</div>
			</div>
		</>
	);
};

export default HeaderGame;
