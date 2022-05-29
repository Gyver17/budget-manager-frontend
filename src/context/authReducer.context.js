const types = {
	authLogin: "login",
	authLogout: "logout",
	sessionClose: "expireSession",
	clearSession: "clearSession",
	updatePassword: "updatePassword",
	clearUpdatePassword: "clearUpdatePassword",
	updateUser: "updateUser",
};

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	sessionExpired: false,
	updatePassword: null,
};

const authReducer = (state, action) => {
	switch (action.type) {
		case types.authLogin:
			const data = action.payload;
			return {
				...state,
				user: data.user,
			};

		case types.authLogout:
			return {
				...state,
				user: null,
			};

		case types.sessionClose:
			return {
				...state,
				sessionExpired: true,
			};
		case types.clearSession:
			return {
				...state,
				user: null,
				sessionExpired: false,
			};
		case types.updatePassword:
			const token = action.payload;
			return {
				...state,
				updatePassword: token,
			};
		case types.clearUpdatePassword:
			return {
				...state,
				updatePassword: null,
			};
		case types.updateUser:
			const update = action.payload;
			return {
				...state,
				user: update.user,
			};
		default:
			return state;
	}
};

export { initialState, types };
export default authReducer;
