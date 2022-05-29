import React from "react";
import TableBody from "./TableBody/TableBody.component";
import TableHeader from "./TableHeader/TableHeader.component";
import styles from "./style.module.css";

function Table({ header, data, action }) {
	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<TableHeader header={header} action={action} />
				<TableBody data={data} header={header} action={action} />
			</table>
		</div>
	);
}

export default Table;
