/* ---- Library Imports ---- */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import image from "../../assets/images/undraw_forgot_password_re_hxwm.svg";

/* ---- Component ---- */
function ForgotPassword() {
	const [render, setRender] = useState(false);
	const navigate = useNavigate();

	return (
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
							<TextLogin type="text" title="Correo Electrónico" />
						</div>
						<footer className={styles.button}>
							<ButtonLog
								title="Enviar Correo"
								onClick={() => setRender(true)}
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
								Te hemos enviado un correo electrónico con un
								codigo para restablecer su contraseña.
							</h2>
						</header>
						<div className={styles.input}>
							<TextLogin type="text" title="Ingrese Codigo" />
						</div>
						<footer className={styles.button}>
							<ButtonLog title="Restablecer Contraseña" />
						</footer>
					</div>
				)}
			</main>
		</div>
	);
}

export default ForgotPassword;
