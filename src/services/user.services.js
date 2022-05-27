import { url } from "../const/url";
import {
	// requestRejected,
	constraintViolated,
} from "../utils/requestRejected.util";

export default class UserServices {
	constructor(dispatch, toast) {
		this.url = `${url}api/v1/`;
		this.dispatch = dispatch;
		this.toast = toast;
		this.messages = {
			first: "El Correo Electrónico ya se encuentra registrado",
			second: "El Usuario no se puede eliminar",
		};
	}

	async signIn(body) {
		try {
			const request = await fetch(`${this.url}signin`, {
				method: "POST",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const queryData = await request.json();

			if (request.ok) {
				return { queryData, success: true };
			} else {
				return { queryData, success: false };
			}
		} catch (error) {
			console.log(error);
		}
	}

	async signUp(body) {
		try {
			const request = await fetch(`${this.url}signup`, {
				method: "POST",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const queryData = await request.json();

			if (request.ok) {
				return { queryData, success: true };
			} else {
				constraintViolated(queryData.code, this.toast, this.messages);
				return { queryData, success: false };
			}
		} catch (error) {
			console.log(error);
		}
	}

	async verifyEmail(body) {
		try {
			const request = await fetch(`${this.url}forgotpassword`, {
				method: "PUT",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const queryData = await request.json();

			if (request.ok) {
				return { queryData, success: true };
			} else {
				return { queryData, success: false };
			}
		} catch (error) {
			console.log(error);
		}
	}

	async verifyCode(id, body) {
		try {
			const request = await fetch(`${this.url}authorizechanged/${id}`, {
				method: "POST",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const queryData = await request.json();

			if (request.ok) {
				return { queryData, success: true };
			} else {
				return { queryData, success: false };
			}
		} catch (error) {
			console.log(error);
		}
	}

	async updatePassword(id, token, body) {
		try {
			const request = await fetch(`${this.url}updatepassword/${id}`, {
				method: "PUT",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					"x-access-token": token,
				},
				body: JSON.stringify(body),
			});
			const queryData = await request.json();

			if (request.ok) {
				return { queryData, success: true };
			} else {
				return { queryData, success: false };
			}
		} catch (error) {
			console.log(error);
		}
	}
}
