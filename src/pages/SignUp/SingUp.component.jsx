/* ---- Library Imports ---- */
import React, { useContext, useState } from "react";
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
import image from "../../assets/images/undraw_access_account_re_8spm.svg";
import { scheme as validationScheme } from "./utils/signUp.validation";
import UserServices from "../../services/user.services";
import { AuthContext } from "../../context/AuthProvider.context";
import { types } from "../../context/authReducer.context";

/* ---- Component ---- */
function SingUp() {
	const navigate = useNavigate();
	const [, dispatch] = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const userServices = new UserServices(dispatch, toast);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			repeatPassword: "",
		},
		resolver: yupResolver(validationScheme),
	});

	const onSubmit = async (data) => {
		try {
			const toastId = toast.loading("Registrando");
			setLoading(true);
			const { queryData, success } = await userServices.signUp(data);
			if (success) {
				dispatch({
					type: types.authLogin,
					payload: { user: queryData },
				});
				localStorage.setItem("user", JSON.stringify(queryData));
				navigate("/");
				toast.dismiss(toastId);
			} else {
				setLoading(false);
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
					<img src={image} alt="singup" />
				</div>
				<div className={styles.content}>
					<header className={styles.header}>
						<h1>¡Bienvenid@ a Budget Manager!</h1>
						<h3>Registraste, es gratis</h3>
					</header>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={styles.form}
					>
						<TextLogin
							type="text"
							title="Nombres y Apellidos"
							name="name"
							control={control}
							errors={errors.name}
						/>
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
						<TextLogin
							type="password"
							title="Repetir Contraseña"
							name="repeatPassword"
							control={control}
							errors={errors.repeatPassword}
						/>
						<div className={styles.button}>
							<ButtonLog
								title={
									loading ? "...Registrando" : "Registrarse"
								}
							/>
						</div>
					</form>
					<footer className={styles.footer}>
						<NavLink to="/signin" className={styles.link}>
							<span>¿Ya tienes cuenta?</span>
						</NavLink>
					</footer>
				</div>
			</div>
		</>
	);
}

export default SingUp;
