const search = (values, valueSearch) => {
	let expresion = new RegExp(`${valueSearch}.*`, "i");
	return values.filter(
		(value) =>
			expresion.test(value.category) ||
			expresion.test(value.concept) ||
			expresion.test(value.type)
	);
};

const column = [
	{
		title: "Categoria",
		field: "category",
		type: "string",
	},
	{
		title: "Concepto",
		field: "concept",
		type: "string",
	},
	{
		title: "Operación",
		field: "type",
		type: "type",
	},
	{
		title: "Monto",
		field: "amount",
		type: "currency",
	},
	{
		title: "Fecha",
		field: "date",
		type: "string",
	},
];

export { search, column };
