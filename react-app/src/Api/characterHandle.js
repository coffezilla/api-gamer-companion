/* eslint-disable */

import axios from 'axios';
import {
	setLocalStorageAuth,
	getHasLocalStorageAuth,
	clearLocalStorageAuth,
} from '../helpers/handleStorage';

import { END_POINT_BASE } from './Api';

// ADD
export const postMoveGroup = async (charId, move, name, command, annotation, requirement) => {
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
			url: `${END_POINT_BASE}/characters/${charId}/${move}`,
			data: {
				name: name,
				commands: {
					combination: command,
					requirement: requirement,
				},
				annotation: annotation,
			},
			headers: { Authorization: `Bearer ${localStorageAuth.data.token}` },
		})
			.then((res) => {
				console.log('fata', res);
				if (res.data.status === 1) {
					serverResponse = {
						data: {
							status: res.data.status,
						},
					};
				} else {
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return serverResponse;
};

// EDIT
export const editMoveGroup = async (charId, move, slug, name, command, annotation, requirement) => {
	// console.log('editado', typeof command, command, [1, [1, 2]]);
	const localStorageAuth = getHasLocalStorageAuth();
	const hasLocalStorageAuth = localStorageAuth.status;
	let serverResponse = {
		data: {
			status: 0,
		},
	};

	if (hasLocalStorageAuth) {
		await axios({
			method: 'patch',
			url: `${END_POINT_BASE}/characters/${charId}/${move}/${slug}`,
			data: {
				name: name,
				commands: {
					combination: command,
					requirement: requirement,
				},
				annotation: annotation,
			},
			headers: { Authorization: `Bearer ${localStorageAuth.data.token}` },
		})
			.then((res) => {
				console.log('editado', res.data);
				if (res.data.status === 1) {
					serverResponse = {
						data: {
							status: res.data.status,
						},
					};
				} else {
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return serverResponse;
};

// DELETE
export const deleteMoveGroup = async (charId, move, slug) => {
	const localStorageAuth = getHasLocalStorageAuth();
	const hasLocalStorageAuth = localStorageAuth.status;
	let serverResponse = {
		data: {
			status: 0,
		},
	};

	console.log('cacha', slug, move);

	if (hasLocalStorageAuth) {
		await axios({
			method: 'delete',
			url: `${END_POINT_BASE}/characters/${charId}/${move}/${slug}`,
			headers: { Authorization: `Bearer ${localStorageAuth.data.token}` },
		})
			.then((res) => {
				console.log('deletado', res.data);
				if (res.data.status === 1) {
					serverResponse = {
						data: {
							status: res.data.status,
						},
					};
				} else {
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return serverResponse;
};

// GET
export const getMoveGroupData = async (charId, move, slug) => {
	let serverResponse = {
		data: {
			status: 0,
		},
	};

	await axios({
		method: 'get',
		url: `${END_POINT_BASE}/characters/${charId}/${move}/${slug}`,
	})
		.then((res) => {
			console.log('fata', res.data);
			if (res.data.status === 1) {
				serverResponse = {
					data: {
						status: res.data.status,
						move: res.data.move,
					},
				};
			} else {
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return serverResponse;
};

// GET CHARACTERS
export const getAllCharacters = async (game) => {
	let serverResponse = {
		data: {
			status: 0,
		},
	};

	await axios({
		method: 'get',
		url: `${END_POINT_BASE}/characters/${game && '?game=' + game}`,
	})
		.then((res) => {
			if (res.data.status === 1) {
				serverResponse = {
					data: {
						status: res.data.status,
						characters: res.data.characters,
					},
				};
			} else {
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return serverResponse;
};

// GET CHARACTERS ID
export const getDataCharacters = async (fid) => {
	let serverResponse = {
		data: {
			status: 0,
		},
	};

	await axios({
		method: 'get',
		url: `${END_POINT_BASE}/characters/${fid}`,
	})
		.then((res) => {
			console.log('galao', res);
			if (res.data.status === 1) {
				serverResponse = {
					data: {
						status: res.data.status,
						character: res.data.character,
					},
				};
			} else {
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return serverResponse;
};
