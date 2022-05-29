import React from "react";
import styles from "./style.module.css";

function AddButton({ onClick }) {
	return (
		<button className={styles.button} onClick={onClick}>
			<i class="fa-solid fa-square-plus"></i>
			<span>Agregar</span>
		</button>
	);
}

export default AddButton;
