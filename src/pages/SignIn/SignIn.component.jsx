/* ---- Library Imports ---- */
import React from "react";
import { NavLink } from "react-router-dom";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import image from "../../assets/images/carlos-muza-hpjSkU2UYSU-unsplash.jpg";

/* ---- Component ---- */
function SignIn() {
	return (
		<div className={styles.container}>
			<form action='' className={styles.form}>
				<img src={image} alt='logo' />
				<div className={styles.body}>
					<h1>¡Bienvenid@ a Budget Manager!</h1>
					<h3>Gestiona tu dinero de una manera más facíl</h3>
					<TextLogin
						type='text'
						title='Correo Electrónico'
					/>
					<TextLogin type='password' title='Contraseña' />
					<NavLink to='/forgotpassword' className={styles.link}>
						<span>¿Olvidaste tu contraseña?</span>				
					</NavLink>
					<ButtonLog title='Iniciar Sección' />
					<NavLink to='/signup' className={styles.link}>
						<span>¿No tienes cuenta?</span>
					</NavLink>
				</div>
			</form>
		</div>
	);
}

export default SignIn;
