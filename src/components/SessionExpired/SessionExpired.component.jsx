import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider.context";
import { types } from "../../context/authReducer.context";
import styles from "./style.module.css";

function SessionExpired({ serverError }) {
	const [, dispatch] = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		try {
			e.preventDefault();
			localStorage.removeItem("user");
			localStorage.removeItem("permissions");
			localStorage.removeItem("setting");
			dispatch({ type: types.clearSession });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={styles.overlay}>
			<div className={styles.container}>
				<div className={styles.body}>
					<h3>
						{serverError
							? "Ha ocurrido un fallo en el servidor"
							: "La Sesión a Expirado, por favor vuelva a iniciar sesión"}
					</h3>
				</div>
				<button className={styles.button} onClick={handleSubmit}>
					Aceptar
				</button>
			</div>
		</div>
	);
}

export default SessionExpired;
