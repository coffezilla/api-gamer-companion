/* eslint-disable */
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clearLocalStorageAuth } from '../../helpers/handleStorage';
import { rdxLogoutUser, IRdxUser } from '../../redux/ducks/User';
import SelectButtonLayout from '../SelectButtonLayout';

const HeaderAdmin = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	// const rdxUser = useSelector((state: IRdxUser) => state);
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);
	const logoutUser = () => {
		clearLocalStorageAuth();
		dispatch(rdxLogoutUser());
		history.push('/login');
	};

	if (!rdxUserisAuth) {
		return <></>;
	}

	return (
		<>
			<div className="container pb-5 px-3 max-w-6xl flex justify-end space-x-3 items-center">
				<p className="text-gray-500 italic text-sm">Logado como editor</p>
				<button
					type="button"
					onClick={logoutUser}
					className="bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white rounded-xl inline-block px-3 py-1"
				>
					Sair
				</button>
			</div>
		</>
	);
};

export default HeaderAdmin;
