/* ---- Library Imports ---- */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* ---- Components Imports ---- */
import ButtonForm from "../../../../components/ButtonForm/ButtonForm.component";
import Modal from "../../../../components/Modal/Modal.component";
import TextForm from "../../../../components/TextForm/TextForm.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import { expressions } from "../../../../const/regularExpressions.const";

function FormCategory({ openForm, setOpenForm, services, queryClient, toast }) {
	const validationScheme = yup.object({
		name: yup
			.string()
			.matches(expressions.categoryName, "Debe introducir un valido")
			.required("Debe introducir un Nombre"),
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: { name: "" },
		resolver: yupResolver(validationScheme),
	});

	useEffect(() => {
		if (openForm) {
			reset({ name: "" });
		}
	}, [reset, openForm]);

	const onSubmit = async (data) => {
		const toastId = toast.loading("Actualizando");
		await services.createCategory(data, queryClient);
		toast.dismiss(toastId);
		reset({ name: "" });
	};

	return (
		<>
			<Modal isOpen={openForm} setOpen={setOpenForm}>
				<div className={styles.container}>
					<h1>Registrar Nueva Categoria</h1>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={styles.inputs}>
							<TextForm
								title="Nombre"
								type="text"
								name="name"
								control={control}
								error={errors?.name}
							/>
						</div>
						<footer>
							<ButtonForm
								icon="fa-solid fa-floppy-disk"
								title="Registrar"
							/>
						</footer>
					</form>
				</div>
			</Modal>
		</>
	);
}

export default FormCategory;
