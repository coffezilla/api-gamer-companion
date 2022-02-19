/* eslint-disable */
import { useHistory, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import axios from 'axios';
import CommandsList from '../components/CommandsList';

import { END_POINT_BASE } from '../Api';

const PageFighter = () => {
	const history = useHistory();
	const { fid } = useParams<any>();
	const [dataCharacter, setDataCharacter] = useState<any>(null);

	const getCharacter = async () => {
		setDataCharacter(null);
		await axios({
			method: 'get',
			url: `${END_POINT_BASE}/characters/${fid}`,
		}).then((res) => {
			setDataCharacter(res.data[0]);

			console.log('personagem', res.data[0]);
		});
	};

	useEffect(() => {
		getCharacter();
	}, []);

	return (
		<>
			<div className="bg-slate-200 h-screen w-full py-5">
				<div className="container bg-white border p-10 rounded-lg max-w-6xl">
					<Link to="/">
						<div className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-xl inline-block px-3 py-1 mb-5">
							Voltar
						</div>
					</Link>
					{dataCharacter && <h1 className="text-xl font-bold mb-5">{dataCharacter.name}</h1>}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
						<div id="col1">
							{dataCharacter ? (
								<CommandsList title="Fatality" dataMoves={dataCharacter.fatalities} />
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								<CommandsList title="Brutality" dataMoves={dataCharacter.brutalities} />
							) : (
								<p>Carregando...</p>
							)}
						</div>
						<div id="col2">
							{dataCharacter ? (
								<CommandsList title="Combos" dataMoves={dataCharacter.combos} />
							) : (
								<p>Carregando...</p>
							)}

							{dataCharacter ? (
								<CommandsList title="Moves" dataMoves={dataCharacter.moves} />
							) : (
								<p>Carregando...</p>
							)}
						</div>
					</div>
					<MainMenu />
				</div>
			</div>
		</>
	);
};

export default PageFighter;
