/* ---- Library Imports ---- */
import React, { useState, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";
import ToasterMessage, {
	toast,
} from "../../components/ToasterMessage/ToasterMessage.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import image from "../../assets/images/undraw_forgot_password_re_hxwm.svg";
import UserServices from "../../services/user.services";
import { AuthContext } from "../../context/AuthProvider.context";
import { types } from "../../context/authReducer.context";

/* ---- Component ---- */
function ForgotPassword() {
	const [, dispatch] = useContext(AuthContext);
	const [render, setRender] = useState(false);
	const [id, setId] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const userServices = useMemo(() => new UserServices(), []);

	const {
		control,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			code: "",
		}
	});

	const verifyEmail = useCallback(async () => {
		try {
			const toastId = toast.loading("Enviando");
			setLoading(true);
			const email = getValues("email");
			const { queryData, success } = await userServices.verifyEmail({
				email,
			});
			if (success) {
				setValue("email", "");
				setId(queryData.id);
				setRender(true);
				toast.dismiss(toastId);
			} else {
				toast.error("Correo Electrónico no encontrado");
			}
			setLoading(false);
		} catch (error) {
			window.location.reload(true);
		}
	}, [getValues, userServices, setValue]);

	const verifyCode = useCallback(async () => {
		try {
			const toastId = toast.loading("Verificando");
			setLoading(true);
			const code = getValues("code");
			const { queryData, success } = await userServices.verifyCode(id, {
				code,
			});
			if (success) {
				dispatch({
					type: types.updatePassword,
					payload: { id, token: queryData.token },
				});
				toast.dismiss(toastId);
				navigate("/updatepassword");
			} else {
				toast.error("Codigo Invalido");
			}
			setLoading(false)
		} catch (error) {
			window.location.reload(true);
		}
	}, [dispatch, id, getValues, navigate, userServices]);

	return (
		<>
			<ToasterMessage />
			<div className={styles.container}>
				<div className={styles.sideRight}>
					<img src={image} alt="forgotPassword" />
				</div>
				<main className={styles.main}>
					<h1>¡Bienvenid@ a Budget Manager!</h1>
					{!render ? (
						<div className={styles.body}>
							<header className={styles.header}>
								<i
									class="fa-solid fa-arrow-left"
									onClick={() => navigate("/signin")}
								/>
								<h2>
									Te enviaremos un correo electrónico con un
									codigo para restablecer su contraseña.
								</h2>
							</header>
							<div className={styles.input}>
								<TextLogin
									type="text"
									title="Correo Electrónico"
									name="email"
									control={control}
									errors={errors.email}
								/>
							</div>
							<footer className={styles.button}>
								<ButtonLog
									title={
										loading
											? "...Enviando"
											: "Enviar Correo"
									}
									onClick={() => verifyEmail()}
								/>
							</footer>
						</div>
					) : (
						<div className={styles.body}>
							<header className={styles.header}>
								<i
									class="fa-solid fa-arrow-left"
									onClick={() => setRender(false)}
								/>
								<h2>
									Te hemos enviado un correo electrónico con
									un codigo para restablecer su contraseña.
								</h2>
							</header>
							<div className={styles.input}>
								<TextLogin
									type="text"
									title="Ingrese Codigo"
									name="code"
									control={control}
									errors={errors.code}
								/>
							</div>
							<footer className={styles.button}>
								<ButtonLog
									title={
										loading
											? "Cargando"
											: "Restablecer Contraseña"
									}
									onClick={() => verifyCode()}
								/>
							</footer>
						</div>
					)}
				</main>
			</div>
		</>
	);
}

export default ForgotPassword;
