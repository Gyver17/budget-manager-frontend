import React, { useContext } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider.context";
import UserServices from "../../services/user.services";
import { types } from "../../context/authReducer.context";

function Header({ userName }) {
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state;
	const userServices = new UserServices();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await userServices.closeSession(user.id, user.token);
			dispatch({ type: types.authLogout });
			localStorage.removeItem("user");
		} catch (error) {
			console.log(error);
		}
	};

	const navigate = useNavigate();
	return (
		<>
			<input id={styles.menu} type="checkbox" />
			<input id={styles.user} type="checkbox" />
			<header className={styles.container}>
				<span className={styles.title}>Budget Manager</span>
				<div className={styles.group}>
					<div className={styles.menu}>
						<label for={styles.menu}>
							<i class="fa-solid fa-bars" />
						</label>
					</div>
					<div className={styles.user}>
						<span>{userName}</span>
						<label for={styles.user}>
							<i class="fa-solid fa-square-caret-down" />
						</label>
					</div>
				</div>
			</header>
			<div className={styles.background}>
				<div className={styles.sidebar}>
					<label className={styles.close} for={styles.menu}>
						<i class="fa-solid fa-xmark" />
					</label>
					<ul className={styles.list}>
						<li>
							<label
								htmlFor={styles.menu}
								onClick={() => navigate("/")}
							>
								<i class="fa-solid fa-house-chimney" />
								<span>Inicio</span>
							</label>
						</li>
						<li>
							<label
								htmlFor={styles.menu}
								onClick={() => navigate("/operations")}
							>
								<i class="fa-solid fa-circle-dollar-to-slot" />
								<span>Operaciones</span>
							</label>
						</li>
						<li>
							<label
								htmlFor={styles.menu}
								onClick={() => navigate("/category")}
							>
								<i class="fa-brands fa-42-group" />
								<span>Categorias</span>
							</label>
						</li>
					</ul>
					<ul className={styles.list}>
						<li>
							<label
								htmlFor={styles.menu}
								onClick={() => navigate("/profile")}
							>
								<i class="fa-solid fa-user" />
								<span>Mi perfil</span>
							</label>
						</li>
						<li>
							<label htmlFor={styles.menu} onClick={handleSubmit}>
								<i class="fa-solid fa-circle-xmark" />
								<span>Cerrar Sesión</span>
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.tooltip}>
				<ul className={styles.list}>
					<li>
						<label
							htmlFor={styles.user}
							onClick={() => navigate("/profile")}
						>
							<i class="fa-solid fa-user" />
							<span>Mi perfil</span>
						</label>
					</li>
					<li>
						<label htmlFor={styles.user} onClick={handleSubmit}>
							<i class="fa-solid fa-circle-xmark" />
							<span>Cerrar Sesión</span>
						</label>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Header;
