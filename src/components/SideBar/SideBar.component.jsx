import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
function SideBar() {
	return (
		<>
			<input id={styles.menu} type="checkbox" />
			<div className={styles.sidebar}>
				<ul className={styles.list}>
					<li className={styles.menu}>
						<label for={styles.menu}>
							<i class="fa-solid fa-bars" />
						</label>
					</li>
					<li>
						<NavLink to="/" className={styles.link}>
							<i class="fa-solid fa-house-chimney" />
							<span>Inicio</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/operations" className={styles.link}>
							<i class="fa-solid fa-circle-dollar-to-slot" />
							<span>Operaciones</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/category" className={styles.link}>
							<i class="fa-brands fa-42-group" />
							<span>Categorias</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</>
	);
}

export default SideBar;
