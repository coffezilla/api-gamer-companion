/* eslint-disable */
// import axios from 'axios';

// import { END_POINT_BASE } from './Api';

// // localstorage
// import { readItemFromStorage } from '../helpers/handleStorage';

import axios from 'axios';
import {
	setLocalStorageAuth,
	getHasLocalStorageAuth,
	clearLocalStorageAuth,
} from '../helpers/handleStorage';

import { END_POINT_BASE } from './Api';

// GET
// available categories
// export const getCategoriesAvailable = async () => {
// 	let userAuthToken = null;
// 	await readItemFromStorage().then((responseStorage) => {
// 		userAuthToken = responseStorage.auth.token;
// 	});

// 	let serverResponse = { data: { status: 0 } };

// 	const END_POINT = END_POINT_BASE + '/messages/get-categories-available';
// 	await axios({
// 		method: 'get',
// 		url: END_POINT,
// 		headers: { Authorization: `Bearer xyz` },
// 	})
// 		.then((response) => {
// 			// 1 - done
// 			if (response.data.status === 1) {
// 				serverResponse = {
// 					data: {
// 						status: response.data.status,
// 						categories: response.data.categories,
// 					},
// 				};
// 			} else {
// 				serverResponse = {
// 					data: {
// 						status: response.data.status,
// 						message: response.data.message,
// 					},
// 				};
// 			}
// 		})
// 		.catch((error) => {});

// 	return serverResponse;
// };

export const postFatality = async (charId, name, command) => {
	const localStorageAuth = getHasLocalStorageAuth();
	const hasLocalStorageAuth = localStorageAuth.status;
	let serverResponse = {
		data: {
			status: 0,
		},
	};

	if (hasLocalStorageAuth) {
		await axios({
			method: 'post',
			url: `${END_POINT_BASE}/characters/${charId}/fatalities`,
			data: {
				name: name,
				commands: {
					combination: command,
					requirement: 'close',
				},
			},
			headers: { Authorization: `Bearer ${localStorageAuth.data.token}` },
		})
			.then((responsePostFatality) => {
				console.log('fata', responsePostFatality);
				if (responsePostFatality.data.status === 1) {
					serverResponse = {
						data: {
							status: responsePostFatality.data.status,
						},
					};
				} else {
					// clearLocalStorageAuth();
				}
			})
			.catch((error) => {
				// clearLocalStorageAuth();
				console.log(error);
			});
	}
	return serverResponse;
};

// GET
// get user data to edit
// export const getMessageData = async (filterCategories) => {
// 	let userAuthToken = null;
// 	await readItemFromStorage().then((responseStorage) => {
// 		userAuthToken = responseStorage.auth.token;
// 	});

// 	let serverResponse = { data: { status: 0 } };
// 	const GET_PARAMS = `?categories=${filterCategories}`;

// 	const END_POINT = END_POINT_BASE + '/messages/get-messages' + GET_PARAMS;
// 	await axios({
// 		method: 'get',
// 		url: END_POINT,
// 		headers: { Authorization: `Bearer ${userAuthToken}` },
// 	})
// 		.then((response) => {
// 			console.log('mensagensz:', response.data.message);
// 			// 1 - done
// 			if (response.data.status === 1) {
// 				serverResponse = {
// 					data: {
// 						status: response.data.status,
// 						messages: response.data.messages,
// 					},
// 				};
// 			} else {
// 				serverResponse = {
// 					data: {
// 						status: response.data.status,
// 						message: response.data.message,
// 					},
// 				};
// 			}
// 		})
// 		.catch((error) => {});

// 	return serverResponse;
// };
