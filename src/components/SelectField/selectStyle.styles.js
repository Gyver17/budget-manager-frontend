const customStyles = {
	option: (provided, state) => ({
		...provided,
		padding: "1rem",
		background: state.isSelected ? "var(--tertiary)" : "none",
	}),
	control: () => ({
		fontStyle: "italic",
		border: "0.1rem solid transparent",
		width: "100%",
		height: "3rem",
		display: "flex",
		flexDirection: "row",
		borderRadius: "0.5rem",
		boxShadow: "0 0 0.15rem 0 var(--primary)",
		transition: "border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s",
		"&:hover": {
			border: "0.2rem solid var(--secondary)",
		},
	}),
	menu: (provided, state) => ({
		...provided,
		width: "100%",
		padding: "0px",
		background: "var(--quintenary)",
	}),
	dropdownIndicator: () => ({
		color: "var(--primary)",
		padding: "0.5rem 1rem",
		display: "flex",
		justifyContent: "center",
	}),
	indicatorSeparator: () => ({
		color: "blue",
		border: "0.05rem solid var(--primary)",
		display: "flex",
		height: "70%",
	}),
};

export default customStyles;
