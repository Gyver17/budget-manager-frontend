import React, { useState } from "react";
import style from "./style.module.css";

function TextSearch({ onSearch }) {
	const [search, setSearch] = useState("");

	const onInputChange = (value) => {
		setSearch(value);
		onSearch(value);
	};

	return (
		<div class={style.group}>
			<i class="fa-solid fa-magnifying-glass" />
			<input
				placeholder="Buscar"
				type="search"
				class={style.input}
				value={search}
				onChange={(e) => onInputChange(e.target.value)}
			/>
		</div>
	);
}

export default TextSearch;
