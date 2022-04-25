/* ---- Library Imports ---- */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---- Components Imports ---- */
import TextLogin from "../../components/TextLogin/TextLogin.component";
import ButtonLog from "../../components/ButtonLog/ButtonLog.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";

/* ---- Component ---- */
function ForgotPassword() {
	const [render, setRender] = useState(false);
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div action='' className={styles.form}>
				<h1>¡Bienvenid@ a Budget Manager!</h1>
				{!render ? (
					<div className={styles.body}>
						<h3>
							Te enviaremos un correo electrónico con un codigo
							para restablecer su contraseña.
						</h3>
						<TextLogin type='text' title='Correo Electrónico' />
						<div className={styles.buttons}>
							<ButtonLog title='Cancelar' onClick={() => navigate('/signin')}/>
							<ButtonLog title='Enviar Correo' onClick={() => setRender(true)}/>
						</div>
					</div>
				) : (
					<div className={styles.body}>
						<h3>
							Te hemos enviado un correo electrónico con un codigo
							para restablecer su contraseña.
						</h3>
						<TextLogin type='text' title='Ingrese Codigo' />
						<div className={styles.buttons}>
							{<ButtonLog title='Volver' onClick={() => setRender(false)} />}
							<ButtonLog title='Restablecer Contraseña' />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ForgotPassword;
