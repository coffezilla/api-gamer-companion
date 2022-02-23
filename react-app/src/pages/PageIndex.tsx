/* eslint-disable */
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { IRdxUser } from '../redux/ducks/User';

import { getAllCharacters } from '../Api/characterHandle';

import HeaderAdmin from '../components/HeaderAdmin';
import HeaderGame from '../components/HeaderGame/HeaderGame';

const PageIndex = () => {
	const history = useHistory();
	const [dataCharacters, setDataCharacters] = useState<any>(null);
	const rdxPrefsGame = useSelector((state: IRdxUser) => state.prefs.game);

	const getCharacteres = async () => {
		if (rdxPrefsGame !== null) {
			setDataCharacters(null);
			getAllCharacters(rdxPrefsGame).then((res: any) => {
				if (res.data.status === 1) {
					setDataCharacters(res.data.characters);
				}
			});
		}
	};

	useEffect(() => {
		getCharacteres();
	}, [rdxPrefsGame]);

	return (
		<>
			<div className="bg-slate-200 min-h-screen w-full p-0 md:p-3 xl:p-3 ">
				<HeaderAdmin />
				{(dataCharacters !== null || rdxPrefsGame === null) && <HeaderGame title={rdxPrefsGame} />}

				<div className="container bg-white border p-3 md:p-10 md:rounded-lg max-w-6xl">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
											className="rounded-md aspect-square bg-slate-300 bg-cover flex justify-center items-end p-3 md:p-5"
										>
											<div className="bg-white inline-block py-1 px-3 rounded-full text-xs md:text-md ">
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
				</div>
			</div>
		</>
	);
};

export default PageIndex;
