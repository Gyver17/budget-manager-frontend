import * as yup from "yup";
import { expressions } from "../../../const/regularExpressions.const";

const validationScheme = yup.object({
	idCategory: yup
		.string()
		.matches(
			expressions.uuid,
			"Debe introducir id valido" //shouldn't happen
		)
		.required("Debe seleccionar una Categoria"),
	type: yup.string().required("Debe seleccionar un Tipo de Movimiento"),
	concept: yup
		.string()
		.matches(expressions.concept, "Concepto inválido")
		.required("Debe introducir un concepto valido"),
	amount: yup
		.string()
		.test("amount", "Debe introducir un Monto mayor a cero", (amount) => {
			if (amount === "0") {
				return false;
			} else {
				return true;
			}
		})
		.required("Debe introducir un Monto"),
	date: yup
		.string()
		.matches(expressions.date, "Fecha inválida")
		.required("Debe seleccionar una Fecha"),
});

export { validationScheme };
