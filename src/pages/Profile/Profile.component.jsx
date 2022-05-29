/* ---- Library Imports ---- */
import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ---- Components Imports ---- */
import ButtonForm from "../../components/ButtonForm/ButtonForm.component";
import TextForm from "../../components/TextForm/TextForm.component";
import ToasterMessage, {
	toast,
} from "../../components/ToasterMessage/ToasterMessage.component";

/* ---- Imports to Components ---- */
import { AuthContext } from "../../context/AuthProvider.context";
import { scheme } from "./utils/user.validation";
import styles from "./style.module.css";
import UserServices from "../../services/user.services";
import { types } from "../../context/authReducer.context";

function Profile() {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state;

	const userServices = new UserServices(dispatch, toast);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(scheme),
	});

	useEffect(() => {
		reset({ name: user.name, email: user.email });
	}, [reset, user]);

	const onSubmit = async (data) => {
		const toastId = toast.loading("Actualizando");
		const { success } = await userServices.updateUser(
			user.id,
			user.token,
			data
		);
		toast.dismiss(toastId);
		if (success) {
			const dataUser = {
				id: user.id,
				name: data.name,
				email: data.email,
				token: user.token,
			};
			dispatch({
				type: types.updateUser,
				payload: { user: dataUser },
			});
			localStorage.setItem("user", JSON.stringify(dataUser));
		}
	};
	return (
		<>
			<ToasterMessage />
			<main className={styles.container}>
				<h1>Mi Perfil</h1>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<TextForm
						title="Nombre y Apellido"
						type="text"
						name="name"
						control={control}
						error={errors?.name}
					/>
					<TextForm
						title="Correo Electrónico"
						type="text"
						name="email"
						control={control}
						error={errors?.email}
					/>
					<footer>
						<ButtonForm
							icon="fa-solid fa-floppy-disk"
							title="Registrar"
						/>
					</footer>
				</form>
			</main>
		</>
	);
}

export default Profile;
