// TYPE
export interface IRdxUser {
	isAuth: boolean;
	prefs: {
		buttonLayout: Number | null;
		game: String | null;
	};
}

interface IActLogin {
	type: 'LOGIN';
}

interface IActLogout {
	type: 'LOGOUT';
}

interface IActChangeButtonLayout {
	type: 'CHANGE_BUTTON_LAYOUT';
	payload: {
		layoutId: Number;
	};
}

interface IActChangeGame {
	type: 'CHANGE_GAME';
	payload: {
		game: String;
	};
}

type Action = IActLogin | IActLogout | IActChangeButtonLayout | IActChangeGame;

// CONSTRAIN
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CHANGE_GAME = 'CHANGE_GAME';
const CHANGE_BUTTON_LAYOUT = 'CHANGE_BUTTON_LAYOUT';

// ACTION
// login
export const rdxLoginUser = () => {
	return {
		type: LOGIN,
	};
};

// logout
export const rdxLogoutUser = () => {
	return {
		type: LOGOUT,
	};
};

// change button layout
export const rdxChangeButtonLayout = (layoutId: Number) => {
	return {
		type: CHANGE_BUTTON_LAYOUT,
		payload: {
			layoutId,
		},
	};
};

// change game
export const rdxChangeGame = (gameFilter: String) => {
	return {
		type: CHANGE_GAME,
		payload: {
			game: gameFilter,
		},
	};
};

// REDUCERS
const INITIAL_STATE: IRdxUser = {
	isAuth: false,
	prefs: {
		buttonLayout: null,
		game: null,
	},
};
const User = (state = INITIAL_STATE, action: Action) => {
	switch (action.type) {
		case LOGIN: {
			return { ...state, isAuth: true };
		}
		case LOGOUT: {
			return { ...state, isAuth: false };
		}
		case CHANGE_GAME: {
			return { ...state, prefs: { ...state.prefs, game: action.payload.game } };
		}
		case CHANGE_BUTTON_LAYOUT: {
			return { ...state, prefs: { ...state.prefs, buttonLayout: action.payload.layoutId } };
		}
		default:
			return state;
	}
};

export default User;
