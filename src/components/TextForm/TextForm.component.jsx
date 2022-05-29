import React from "react";
import styles from "./style.module.css";
import { useController } from "react-hook-form";

function TextForm({ title, control, name, error, ...props }) {
	const { field } = useController({
		control,
		name,
	});

	return (
		<div className={styles.inputGroup}>
			<label className={!error ? styles.label : styles.labelError}>
				{error && "*"}
				{title}
			</label>
			<input
				autocomplete="off"
				className={!error ? styles.input : styles.inputError}
				{...field}
				{...props}
			/>
			<div></div>
			{error && <p className={styles.errorMessage}>{error.message}</p>}
		</div>
	);
}

export default TextForm;
