/* eslint-disable */
import { useHistory } from 'react-router-dom';
import MainMenu from '../components/MainMenu';

const PageIndex = () => {
	const history = useHistory();

	return (
		<>
			<div className="bg-slate-200 h-screen w-full py-5">
				<div className="container bg-white border p-10 rounded-lg max-w-6xl">
					<h1 className="text-xl font-bold mb-2">MORTAL KOMBAT XI</h1>
					<p className="mb-5">Escolha um personagem:</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
						<button
							type="button"
							onClick={() => history.push('/fighter/1')}
							className="rounded-md aspect-square bg-slate-300"
						>
							Fuck
						</button>
						<button
							type="button"
							onClick={() => history.push('/fighter/2')}
							className="rounded-md aspect-square bg-slate-300"
						>
							Fuck
						</button>
						<button
							type="button"
							onClick={() => history.push('/fighter/3')}
							className="rounded-md aspect-square bg-slate-300"
						>
							Fuck
						</button>
						<button
							type="button"
							onClick={() => history.push('/fighter/4')}
							className="rounded-md aspect-square bg-slate-300"
						>
							Fuck
						</button>
					</div>
					<MainMenu />
				</div>
			</div>
		</>
	);
};

export default PageIndex;
