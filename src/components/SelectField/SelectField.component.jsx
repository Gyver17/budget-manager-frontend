import React from "react";
import Select from "react-select";
import customStyles from "./selectStyle.styles";
import errorStyles from "./errorStyle.styles";
import styles from "./style.module.css";
import { useController } from "react-hook-form";

const SelectField = ({ options, title, control, name, setValue, error, disabled }) => {
	const { field } = useController({
		control,
		name,
	});

	return (
		<div className={styles.container}>
			<span className={!error ? styles.title : styles.titleError}>
				{error && "*"}
				{title}
			</span>
			<Select
				options={options}
				styles={!error ? customStyles : errorStyles}
				onChange={(option) => setValue(name, option.value)}
				value={
					field.value
						? options.find((option) => option.value === field.value)
						: null
				}
				onBlur={field.onBlur}
				name={field.name}
				inputRef={field.ref}
				isDisabled={disabled || false}
			/>
			{error?.message && (
				<span className={styles.errorMessage}>{error.message}</span>
			)}
		</div>
	);
};

export default SelectField;
