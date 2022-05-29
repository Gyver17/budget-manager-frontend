/* ---- Library Imports ---- */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import { expressions } from "../../const/regularExpressions.const";

function Card({ data, toast, services, queryClient }) {
	const [checkbox, setCheckbox] = useState(false);
	const [category, setCategory] = useState({});

	const { register, setValue, getValues, setFocus } = useForm();

	useEffect(() => {
		setCategory(data);
		setValue("name", data?.name);
	}, [data, setValue]);

	const deleteCategory = async () => {
		const toastId = toast.loading("Actualizando");
		await services.deleteCategory(
			category.id,
			queryClient
		);
		toast.dismiss(toastId);
	};

	const updateCategory = async () => {
		const name = getValues("name");
		if (!expressions.categoryName.test(name)) {
			return toast.error("Nombre Inválido");
		}
		const toastId = toast.loading("Actualizando");
		const succes = await services.updateCategory(
			category.id,
			{ name },
			queryClient
		);
		toast.dismiss(toastId);
		if (succes) {
			setCheckbox(false);
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.values}>
				<input
					className={styles.text}
					type="text"
					disabled={!checkbox}
					{...register("name")}
				/>
				<span className={styles.concept}>
					Operaciones asociadas: {category?.associated}
				</span>
			</div>
			<div>
				<input
					type="checkbox"
					id={styles.checkbox}
					checked={checkbox}
				/>
				<div className={styles.update}>
					<button className={styles.red} onClick={deleteCategory}>
						<i class="fa-solid fa-delete-left" />
						<span>Eliminar</span>
					</button>
					<button
						className={styles.blue}
						onClick={() => {
							setCheckbox(true);
							setFocus("name", { shouldSelect: false });
						}}
					>
						<i class="fa-solid fa-square-pen" />
						<span>Actualizar</span>
					</button>
				</div>
				<div className={styles.save}>
					<button
						className={styles.red}
						onClick={() => {
							setCheckbox(false);
							setValue("name", data?.name);
						}}
					>
						<i class="fa-solid fa-rectangle-xmark" />
						<span>Cancelar</span>
					</button>
					<button className={styles.blue} onClick={updateCategory}>
						<i class="fa-solid fa-floppy-disk" />
						<span>Guadar</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Card;
