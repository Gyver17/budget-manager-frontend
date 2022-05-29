/* ---- Library Imports ---- */
import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";
import ToasterMessage, {
	toast,
} from "../../components/ToasterMessage/ToasterMessage.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import image from "../../assets/images/undraw_secure_login_pdn4.svg";
import validationScheme from "./utils/updatePassword.validation";
import { AuthContext } from "../../context/AuthProvider.context";
import { types } from "../../context/authReducer.context";
import UserServices from "../../services/user.services";

function UpdatePassword() {
	const navigate = useNavigate();
	const [state, dispatch] = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useState({});
	const userServices = new UserServices(dispatch, toast);

	useEffect(() => {
		const { updatePassword } = state;
		setParams(updatePassword);

		return () => {
			if (updatePassword === null) {
				navigate("/");
			}
		};
	}, [state, navigate]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { password: "", repeatPassword: "" },
		resolver: yupResolver(validationScheme),
	});

	const onSubmit = async (data) => {
		try {
			const toastId = toast.loading("Actualizando");
			setLoading(true);
			const { success } = await userServices.updatePassword(
				params.id,
				params.token,
				data
			);
			toast.dismiss(toastId);
			if (success) {
				toast.success("Contraseña actualizada con exito");
				setTimeout(function () {
					dispatch({
						type: types.clearUpdatePassword,
					});
					navigate("/");
				}, 2000);
			} else {
				setLoading(false);
				toast.error("El tiempo para cambiar la Contraseña expiró");
			}
		} catch (error) {}
	};
	return (
		<>
			<ToasterMessage />
			<div className={styles.container}>
				<div className={styles.sideRight}>
					<img src={image} alt="signin" />
				</div>
				<div className={styles.content}>
					<header className={styles.header}>
						<h1>¡Actualiza tu Contraseña!</h1>
					</header>
					<main className={styles.form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<TextLogin
								type="password"
								title="Contraseña"
								name="password"
								control={control}
								errors={errors.password}
							/>
							<TextLogin
								type="password"
								title="Repetir Contraseña"
								name="repeatPassword"
								control={control}
								errors={errors.repeatPassword}
							/>

							<div className={styles.buttonForm}>
								<ButtonLog
									title={loading ? "...Guardando" : "Guardar"}
								/>
							</div>
						</form>
					</main>
					<footer className={styles.footer}>
						<NavLink to="/signin" className={styles.link}>
							<span>Iniciar Sesión</span>
						</NavLink>
					</footer>
				</div>
			</div>
		</>
	);
}

export default UpdatePassword;
