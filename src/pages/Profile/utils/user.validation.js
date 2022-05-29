import * as yup from "yup";
import { expressions } from "../../../const/regularExpressions.const";

const scheme = yup.object({
	name: yup
		.string()
		.matches(
			expressions.name,
			"Debe introducir un Nombre y Apellido valido"
		)
		.required("Debe introducir un Nombre y Apellido"),
	email: yup
		.string()
		.email("Debe introducir un Correo Electrónico Valido")
		.required("Debe introducir un Correo Electrónico"),
});

export { scheme };
