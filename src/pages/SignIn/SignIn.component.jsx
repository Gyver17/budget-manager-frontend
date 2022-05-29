/* ---- Library Imports ---- */
import React, { useState, useContext } from "react";
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
import image from "../../assets/images/undraw_finance_re_gnv2.svg";
import validationScheme from "./utils/signIn.validation";
import { AuthContext } from "../../context/AuthProvider.context";
import { types } from "../../context/authReducer.context";
import UserServices from "../../services/user.services";

/* ---- Component ---- */
function SignIn() {
	const navigate = useNavigate();
	const [, dispatch] = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const userServices = new UserServices();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: "", password: "" },
		resolver: yupResolver(validationScheme),
	});

	const onSubmit = async (data) => {
		try {
			const toastId = toast.loading("Iniciando");
			setLoading(true);
			const { queryData, success } = await userServices.signIn(data);
			if (success) {
				dispatch({
					type: types.authLogin,
					payload: { user: queryData },
				});
				localStorage.setItem("user", JSON.stringify(queryData));
				toast.dismiss(toastId);
				navigate("/");
			} else {
				setLoading(false);
				toast.error("Correo Electrónico o Contraseña Invalida");
			}
		} catch (error) {
			window.location.reload(true);
		}
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
						<h1>¡Bienvenid@ a Budget Manager!</h1>
						<h3>Gestiona tu dinero de una manera más facíl</h3>
					</header>
					<main className={styles.form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<TextLogin
								type="text"
								title="Correo Electrónico"
								name="email"
								control={control}
								errors={errors.email}
							/>
							<TextLogin
								type="password"
								title="Contraseña"
								name="password"
								control={control}
								errors={errors.password}
							/>
							<NavLink
								to="/forgotpassword"
								className={styles.link}
							>
								<span>¿Olvidaste tu contraseña?</span>
							</NavLink>
							<div className={styles.buttonForm}>
								<ButtonLog
									title={
										loading
											? "...Iniciando"
											: "Iniciar Sesión"
									}
								/>
							</div>
						</form>
					</main>
					<footer className={styles.footer}>
						<NavLink to="/signup" className={styles.link}>
							<span>¿No tienes cuenta?</span>
						</NavLink>
					</footer>
				</div>
			</div>
		</>
	);
}

export default SignIn;
