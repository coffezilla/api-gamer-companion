/* eslint-disable */
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IRdxUser } from '../redux/ducks/User';
import MainMenu from '../components/MainMenu';

import { getAllCharacters } from '../Api/characterHandle';

import { END_POINT_BASE } from '../Api';
import SelectButtonLayout from '../components/SelectButtonLayout/SelectButtonLayout';
import HeaderAdmin from '../components/HeaderAdmin';
import HeaderCharacter from '../components/HeaderCharacter/HeaderCharacter';
import HeaderGame from '../components/HeaderGame/HeaderGame';

const PageIndex = () => {
	const history = useHistory();
	const [dataCharacters, setDataCharacters] = useState<any>(null);
	const rdxPrefsGame = useSelector((state: IRdxUser) => state.prefs.game);

	const getCharacteres = async () => {
		setDataCharacters(null);

		getAllCharacters(rdxPrefsGame).then((res: any) => {
			console.log('modaro');
			if (res.data.status === 1) {
				setDataCharacters(res.data.characters);
				console.log('error', res.data);
			} else {
				console.log('error');
			}
		});
	};

	useEffect(() => {
		getCharacteres();
	}, [rdxPrefsGame]);

	return (
		<>
			<div className="bg-slate-200 min-h-screen w-full pb-20 pt-5">
				<HeaderAdmin />
				<HeaderGame title={rdxPrefsGame} />
				{/* <HeaderCharacter /> */}
				{/* <div className="container py-5 px-3 max-w-6xl flex justify-end space-x-3 items-center">
					<p className="text-gray-500 italic text-sm">renatojs.web@gmail.com</p>
					<button className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-xl inline-block px-3 py-1">
						Sair
					</button>
				</div> */}

				{/* <div className="container bg-white border py-5 px-10 rounded-lg max-w-6xl mb-3 flex justify-between space-x-5 items-center">
					<div className="flex space-x-5 items-center">
						<Link to="/">
							<div className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-md inline-block px-3 py-1">
								Voltar
							</div>
						</Link>
						<div className="rounded-md aspect-square bg-slate-300 block w-16 bg-[url('https://c4.wallpaperflare.com/wallpaper/975/1024/988/mortal-kombat-x-sub-zero-wallpaper-preview.jpg')] bg-cover" />
						<div>
							<h1 className="text-2xl font-bold">Flamengo</h1>
							<p className="text-md font-bold">Mortal Kombat X</p>
							<p className="text-sm text-gray-500">Personagem muito masa</p>
						</div>
					</div>
					<div className="flex space-x-5">
						<SelectButtonLayout selectGame />
					</div>
				</div> */}

				{/* <div className="container bg-white border py-5 px-10 rounded-lg max-w-6xl mb-3 flex justify-between space-x-5 items-center">
					<h1 className="text-2xl font-bold">MORTAL KOMBAT X</h1>
					<div className="flex space-x-5">
						<SelectButtonLayout selectLayout />
					</div>
				</div> */}

				<div className="container bg-white border p-10 rounded-lg max-w-6xl">
					{/* <h1 className="text-xl font-bold mb-2">MORTAL KOMBAT XI</h1> */}
					{/* <p className="mb-5">Escolha um personagem:</p> */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
						{dataCharacters ? (
							dataCharacters.length > 0 ? (
								dataCharacters.map((character: any) => {
									return (
										<button
											type="button"
											key={character._id}
											onClick={() => history.push(`/fighter/${character._id}`)}
											style={{
												backgroundImage: `url("${character.portrait}")`,
											}}
											className="rounded-md aspect-square bg-slate-300 bg-cover"
										>
											<div className="bg-white inline-block py-1 px-3 rounded-full">
												{character.name}
											</div>
										</button>
									);
								})
							) : (
								<p>Vazio</p>
							)
						) : (
							<p>Carregando...</p>
						)}
					</div>
					{/* <MainMenu /> */}
				</div>
			</div>
		</>
	);
};

export default PageIndex;
