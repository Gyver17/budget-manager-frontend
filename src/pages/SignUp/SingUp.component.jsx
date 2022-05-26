/* ---- Library Imports ---- */
import React from "react";
import { NavLink } from "react-router-dom";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import image from "../../assets/images/undraw_access_account_re_8spm.svg";

/* ---- Component ---- */
function SingUp() {
	return (
		<div className={styles.container}>
			<div className={styles.sideRight}>
				<img src={image} alt="singup" />
			</div>
			<div className={styles.content}>
				<header className={styles.header}>
					<h1>¡Bienvenid@ a Budget Manager!</h1>
					<h3>Registraste, es gratis</h3>
				</header>
				<form action="" className={styles.form}>
					<TextLogin type="text" title="Nombres y Apellidos" />
					<TextLogin type="text" title="Correo Electrónico" />
					<TextLogin type="password" title="Contraseña" />
					<TextLogin type="password" title="Repetir Contraseña" />
					<div className={styles.button}>
						<ButtonLog title="Registrarse" />
					</div>
				</form>
				<footer className={styles.footer}>
					<NavLink to="/signin" className={styles.link}>
						<span>¿Ya tienes cuenta?</span>
					</NavLink>
				</footer>
			</div>
		</div>
	);
}

export default SingUp;
