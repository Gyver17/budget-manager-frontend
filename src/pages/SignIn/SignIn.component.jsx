/* ---- Library Imports ---- */
import React from "react";
import { NavLink } from "react-router-dom";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import image from "../../assets/images/undraw_finance_re_gnv2.svg";

/* ---- Component ---- */
function SignIn() {
	return (
		<>
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
						<form>
							<TextLogin type="text" title="Correo Electrónico" />
							<TextLogin type="password" title="Contraseña" />
							<NavLink
								to="/forgotpassword"
								className={styles.link}
							>
								<span>¿Olvidaste tu contraseña?</span>
							</NavLink>
							<div className={styles.buttonForm}>
								<ButtonLog title="Iniciar Sesión" />
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
