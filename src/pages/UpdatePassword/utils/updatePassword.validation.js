import * as yup from "yup";
import { expressions } from "../../../const/regularExpressions.const";

const scheme = yup.object({
	password: yup
		.string()
		.min(4, "La Contraseña debe tener minimo 4 caracteres")
		.max(12, "La Contraseña debe tener maximo 20 caracteres")
		.matches(
			expressions.password,
			"Contraseña invalida, solo se acepta letras, y numeros"
		)
		.required("Debe introducir una Contraseña"),
	repeatPassword: yup
		.string()
		.required("Debe introducir una Contraseña")
		.oneOf(
			[yup.ref("password"), null],
			"Las Contraseñas tienen que coincidir"
		),
});

export default scheme;
