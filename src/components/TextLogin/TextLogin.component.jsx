import React from "react";
import styles from "./style.module.css";
import { useController } from "react-hook-form";

function TextLogin({ title, control, name, errors, ...props }) {
	const { field } = useController({
		control,
		name,
	});
	
	return (
		<div
			className={!errors ? styles.container : styles.error}
		>
			<span>
				{errors && "*"}
				{title}
			</span>
			<input placeholder=" " {...field} {...props} />
			{errors && (
				<p className={styles.errorMessage}>{errors.message}</p>
			)}
		</div>
	);
}

export default TextLogin;
