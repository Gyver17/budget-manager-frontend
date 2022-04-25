/* ---- Library Imports ---- */
import React from "react";
import { NavLink } from "react-router-dom";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";

/* ---- Component ---- */
function SingUp() {
	return (
		<div className={styles.container}>
			<form action='' className={styles.form}>
				<h1>¡Bienvenid@ a Budget Manager!</h1>
				<h3>Registraste es gratis</h3>
				<TextLogin type='text' title='Nombres y Apellidos' />
				<TextLogin type='text' title='Correo Electrónico' />
				<TextLogin type='password' title='Contraseña' />
				<TextLogin type='password' title='Repetir Contraseña' />
				<ButtonLog title='Registrarse' />
				<NavLink to='/signin' className={styles.link}>
					<span>¿Ya tienes cuenta?</span>
				</NavLink>
			</form>
		</div>
	);
}

export default SingUp;
