/* eslint-disable */
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IRdxUser } from '../redux/ducks/User';
import MainMenu from '../components/MainMenu';

import { getAllCharacters } from '../Api/characterHandle';

import { END_POINT_BASE } from '../Api';

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
			<div className="bg-slate-200 h-screen w-full py-5">
				<div className="container bg-white border p-10 rounded-lg max-w-6xl">
					<h1 className="text-xl font-bold mb-2">MORTAL KOMBAT XI</h1>
					<p className="mb-5">Escolha um personagem:</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
						{dataCharacters ? (
							dataCharacters.length > 0 ? (
								dataCharacters.map((character: any) => {
									return (
										<button
											type="button"
											key={character._id}
											onClick={() => history.push(`/fighter/${character._id}`)}
											className="rounded-md aspect-square bg-slate-300 bg-[url('https://c4.wallpaperflare.com/wallpaper/975/1024/988/mortal-kombat-x-sub-zero-wallpaper-preview.jpg')] bg-cover"
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
					<MainMenu />
				</div>
			</div>
		</>
	);
};

export default PageIndex;
