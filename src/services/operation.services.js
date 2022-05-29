import { url } from "../const/url";
import {
	requestRejected,
	constraintViolated,
} from "../utils/requestRejected.util";

export default class OperationServices {
	constructor(dispatch, toast, token, userId, queryClient) {
		this.url = `${url}api/v1/`;
		this.dispatch = dispatch;
		this.toast = toast;
		this.token = token;
		this.userId = userId;
		this.queryClient = queryClient;
		this.messages = {
			first: "No deberia pasar",
			second: "La operación no se puede eliminar",
		};
	}

	async getOperation() {
		try {
			const request = await fetch(
				`${this.url}operationsbyuser/${this.userId}`,
				{
					method: "GET",
					mode: "cors",
					credentials: "include",
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						"x-access-token": this.token,
					},
				}
			);
			const queryData = await request.json();

			if (request.ok) {
				return queryData;
			} else {
				requestRejected(queryData.code, this.dispatch, this.toast);
				return [];
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getHomeValue() {
		try {
			const request = await fetch(
				`${this.url}homevaluebyuser/${this.userId}`,
				{
					method: "GET",
					mode: "cors",
					credentials: "include",
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						"x-access-token": this.token,
					},
				}
			);
			const queryData = await request.json();

			if (request.ok) {
				return queryData;
			} else {
				requestRejected(queryData.code, this.dispatch, this.toast);
				return [];
			}
		} catch (error) {
			console.log(error);
		}
	}

	async createOperation(body) {
		try {
			body.idUser = this.userId;
			const request = await fetch(`${this.url}operations`, {
				method: "POST",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					"x-access-token": this.token,
				},
				body: JSON.stringify(body),
			});
			const queryData = await request.json();

			if (request.ok) {
				this.toast.success("Operación registrada");
				this.queryClient.invalidateQueries("getOperation");
				return true;
			} else {
				constraintViolated(queryData.code, this.toast, this.messages);
				requestRejected(queryData.code, this.dispatch, this.toast);
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async updateOperation(id, body) {
		try {
			body.idUser = this.userId;
			const request = await fetch(`${this.url}operations/${id}`, {
				method: "PUT",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					"x-access-token": this.token,
				},
				body: JSON.stringify(body),
			});
			const queryData = await request.json();

			if (request.ok) {
				this.toast.success("Operación actualizada");
				this.queryClient.invalidateQueries("getOperation");
				return true;
			} else {
				constraintViolated(queryData.code, this.toast, this.messages);
				requestRejected(queryData.code, this.dispatch, this.toast);
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteOperation(id) {
		try {
			const request = await fetch(`${this.url}operations/${id}`, {
				method: "DELETE",
				mode: "cors",
				credentials: "include",
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					"x-access-token": this.token,
				},
			});
			const queryData = await request.json();

			if (request.ok) {
				this.toast.success("Operación eliminida");
				this.queryClient.invalidateQueries("getOperation");
				return true;
			} else {
				constraintViolated(queryData.code, this.toast, this.messages);
				requestRejected(queryData.code, this.dispatch, this.toast);
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	}
}
