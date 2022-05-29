import React from "react";
import styles from "./style.module.css";

function ButtonForm({ icon, title, disabled }) {
	return (
		<button disabled={disabled || false} className={styles.button}>
			<i class={icon}></i>
			<span>{title}</span>
		</button>
	);
}

export default ButtonForm;
