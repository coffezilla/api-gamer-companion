/* eslint-disable */
import { useHistory, Link, useParams } from 'react-router-dom';
import MainMenu from '../components/MainMenu';

const PageFighter = () => {
	const history = useHistory();
	const { fid } = useParams<any>();
	console.log('change', fid);

	return (
		<>
			<div className="bg-slate-200 h-screen w-full py-5">
				<div className="container bg-white border p-10 rounded-lg max-w-6xl">
					<Link to="/">
						<div className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-xl inline-block px-3 py-1 mb-5">
							Voltar
						</div>
					</Link>
					<h1 className="text-xl font-bold mb-5">FIGHTER {fid}</h1>
					{/* <p className="mb-2">Fighter {fid}</p> */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
						<div>
							<div className="block mb-5">
								<h2 className="text-lg font-bold mb-2">Fatality</h2>
								<ul className="divide-y divide-gray-100">
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asf kajs f</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
								</ul>
							</div>

							<div className="block mb-5">
								<h2 className="text-lg font-bold mb-2">Brutality</h2>
								<ul className="divide-y divide-gray-100">
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asf kajs f</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
								</ul>
							</div>
						</div>
						<div>
							<div className="block mb-5">
								<h2 className="text-lg font-bold mb-2">Golpes</h2>
								<ul className="divide-y divide-gray-100">
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asf kajs f</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
								</ul>
							</div>

							<div className="block mb-5">
								<h2 className="text-lg font-bold mb-2">Combos</h2>
								<ul className="divide-y divide-gray-100">
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asf kajs f</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
									<li className="py-2 flex space-x-2 items-center">
										<div className="font-bold basis-1/3">Fatality asdf</div>
										<div className="text-sm">1, 2, 4, voltar, soco</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<MainMenu />
				</div>
			</div>
		</>
	);
};

export default PageFighter;
