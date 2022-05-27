import * as Yup from "yup";

const scheme = Yup.object({
	email: Yup.string()
		.email("Debe introducir un Correo Electrónico valido")
		.required("Debe introducir un Correo Electrónico"),
	password: Yup.string().required("Debe introducir una Contraseña"),
});

export default scheme;
