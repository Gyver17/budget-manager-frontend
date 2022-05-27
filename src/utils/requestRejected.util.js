import { types } from "../context/authReducer.context";

const requestRejected = (code, dispatch, toast) => {
	if (code === "50115" || code === "43292" || code === "50500") {
		dispatch({
			type: types.sessionClose,
		});
	}

	// This Situation Should Not Happen
	if (code === "43097") {
		toast.error("Valores Invalido");
	}
};

const constraintViolated = (code, toast, messages) => {
	if (code === "50261") {
		toast.error(messages.first);
	}

	if (code === "50857") {
		toast.error(messages.second);
	}
};

export { requestRejected, constraintViolated };
