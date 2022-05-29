/* ---- Library Imports ---- */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ---- Components Imports ---- */
import ButtonForm from "../../../../components/ButtonForm/ButtonForm.component";
import Modal from "../../../../components/Modal/Modal.component";
import TextForm from "../../../../components/TextForm/TextForm.component";
import SelectField from "../../../../components/SelectField/SelectField.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import { validationScheme } from "../../utils/operation.validation";

const optionsType = [
	{ value: "ingress", label: "Ingreso" },
	{ value: "expense", label: "Egreso" },
];

function FormOperation({
	openForm,
	setOpenForm,
	update,
	services,
	options,
	toast,
}) {
	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationScheme),
	});

	useEffect(() => {
		if (update?.is) {
			const { row } = update;
			reset({
				idCategory: row.idCategory,
				concept: row.concept,
				amount: row.amount,
				type: row.type,
				date: row.date,
			});
		} else {
			reset({
				idCategory: "",
				concept: "",
				amount: 0,
				type: "",
				date: "",
			});
		}
	}, [reset, update]);

	const onSubmit = async (data) => {
		data.amount = parseInt(data.amount);
		if (!update?.is) {
			const toastId = toast.loading("Registrando");
			await services.createOperation(data);
			toast.dismiss(toastId);
			reset();
		} else {
			const { id } = update?.row;
			const toastId = toast.loading("Actualizando");
			await services.updateOperation(id, data);
			toast.dismiss(toastId);
			reset();
			setOpenForm(false);
		}
	};
	return (
		<>
			<Modal isOpen={openForm} setOpen={setOpenForm}>
				<div className={styles.container}>
					<h1>Registrar Nueva Operación</h1>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={styles.inputs}>
							<SelectField
								options={options}
								title="Categoria"
								control={control}
								name="idCategory"
								setValue={setValue}
								error={errors?.idCategory}
							/>
							<SelectField
								options={optionsType}
								title="Tipo de Movimiento"
								control={control}
								name="type"
								setValue={setValue}
								error={errors?.type}
								disabled={update?.is}
							/>
							<TextForm
								title="Concepto"
								type="text"
								name="concept"
								control={control}
								error={errors?.concept}
							/>
							<TextForm
								title="Monto"
								type="number"
								name="amount"
								control={control}
								error={errors?.amount}
								min="0"
							/>
							<TextForm
								title="Fecha"
								type="date"
								name="date"
								control={control}
								error={errors?.date}
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

export default FormOperation;
