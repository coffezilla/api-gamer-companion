// TYPE
export interface IRdxUser {
	isAuth: boolean;
	prefs: {
		buttonLayout: Number | null;
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

type Action = IActLogin | IActLogout | IActChangeButtonLayout;

// CONSTRAIN
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
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

// REDUCERS
const INITIAL_STATE: IRdxUser = {
	isAuth: false,
	prefs: {
		buttonLayout: null,
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
		case CHANGE_BUTTON_LAYOUT: {
			return { ...state, prefs: { buttonLayout: action.payload.layoutId } };
		}
		default:
			return state;
	}
};

export default User;
