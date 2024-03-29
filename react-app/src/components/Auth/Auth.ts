/* eslint-disable operator-linebreak */

import axios from 'axios';
import {
	setLocalStorageAuth,
	getHasLocalStorageAuth,
	clearLocalStorageAuth,
} from '../../helpers/handleStorage';

import { END_POINT_BASE } from '../../Api';

// ENDPOINTS COLLECTION
// local and server
const ENDPOINT_LOGIN = `${END_POINT_BASE}/login`;
const ENDPOINT_CHECK_AUTH = `${END_POINT_BASE}/check-auth`;

// interfaces
export interface IStAuth {
	auth?: {
		timestamp?: string;
		token?: string;
		email?: string;
	};
}

export interface IStForm {
	inputs: {
		name: string;
		value: any;
		error: string;
		type: string;
	}[];
}

// check auth when page is reloaded
export const getAuth = async () => {
	const localStorageAuth = getHasLocalStorageAuth();
	const hasLocalStorageAuth = localStorageAuth.status;
	let serverResponse: {
		data: {
			status: number;
			token?: string;
			timestamp?: string;
			user?: number;
			email?: string;
			message?: string;
		};
	} = {
		data: {
			status: 0,
		},
	};

	if (hasLocalStorageAuth) {
		await axios({
			method: 'get',
			url: `${ENDPOINT_CHECK_AUTH}?email=${localStorageAuth.data.email}`,
			headers: { Authorization: `Bearer ${localStorageAuth.data.token}` },
		})
			.then((responseAuth) => {
				if (responseAuth.data.status === 1) {
					serverResponse = {
						data: {
							status: responseAuth.data.status,
							token: responseAuth.data.token,
							timestamp: responseAuth.data.timestamp,
							email: responseAuth.data.email,
						},
					};
				} else {
					clearLocalStorageAuth();
				}
			})
			.catch((error) => {
				clearLocalStorageAuth();
				console.log(error);
			});
	}
	return serverResponse;
};

// send post to login
export const serverLoginUser = async (formLogin: IStForm['inputs']) => {
	let serverResponse: {
		data: {
			status: number;
			token?: string;
			timestamp?: string;
			user?: number;
			email?: string;
			message?: string;
		};
	} = {
		data: {
			status: 0,
		},
	};

	await axios({
		method: 'post',
		url: ENDPOINT_LOGIN,
		data: { email: formLogin[0].value, password: formLogin[1].value },
	}).then((responseLogin) => {
		if (responseLogin.data.status === 1) {
			serverResponse = {
				data: {
					token: responseLogin.data.token,
					status: responseLogin.data.status,
					timestamp: responseLogin.data.timestamp,
					user: responseLogin.data.user.id,
					email: responseLogin.data.user.email,
					message: responseLogin.data.message,
				},
			};

			const newLocalStorage: IStAuth = {
				auth: {
					token: responseLogin.data.token,
					email: responseLogin.data.user.email,
					timestamp: responseLogin.data.timestamp,
				},
			};
			setLocalStorageAuth(newLocalStorage);
		} else if (responseLogin.data.status === 2) {
			serverResponse = {
				data: {
					status: responseLogin.data.status,
					message: responseLogin.data.message,
				},
			};
		} else if (responseLogin.data.status === 3) {
			serverResponse = {
				data: {
					status: responseLogin.data.status,
					message: responseLogin.data.message,
				},
			};
		} else {
			serverResponse = {
				data: {
					status: responseLogin.data.status,
					message: responseLogin.data.message,
				},
			};
		}

		// alert(serverResponse.data.message);
	});

	return serverResponse;
};
