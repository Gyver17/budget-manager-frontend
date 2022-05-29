import { url } from "../const/url";
import {
	requestRejected,
	constraintViolated,
} from "../utils/requestRejected.util";

export default class CategoryServices {
	constructor(dispatch, toast, token, userId) {
		this.url = `${url}api/v1/`;
		this.dispatch = dispatch;
		this.toast = toast;
		this.token = token;
		this.userId = userId;
		this.messages = {
			first: "El Nombre ya se encuentra registrado",
			second: "La Categoría no se puede eliminar",
		};
	}

	async getCategory() {
		try {
			const request = await fetch(
				`${this.url}categorybyuser/${this.userId}`,
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

	async createCategory(body, queryClient) {
		try {
			const request = await fetch(
				`${this.url}categorybyuser/${this.userId}`,
				{
					method: "POST",
					mode: "cors",
					credentials: "include",
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
						"x-access-token": this.token,
					},
					body: JSON.stringify(body),
				}
			);
			const queryData = await request.json();

			if (request.ok) {
				this.toast.success("Categoría registrada");
				queryClient.invalidateQueries("getCategory");
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

	async updateCategory(id, body, queryClient) {
		try {
			const request = await fetch(`${this.url}category/${id}`, {
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
				this.toast.success("Categoría actualizada");
				queryClient.invalidateQueries("getCategory");
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

	async deleteCategory(id, queryClient) {
		try {
			const request = await fetch(`${this.url}category/${id}`, {
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
				this.toast.success("Categoría elimanada");
				queryClient.invalidateQueries("getCategory");
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
