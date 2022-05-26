import React from "react";
import styles from "./style.module.css";

function TextLogin({ title, icon, ...props }) {
	return (
		<div className={styles.container}>
			<span>{title}</span>
			<input placeholder=" " {...props} />
		</div>
	);
}

export default TextLogin;
