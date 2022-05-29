import React from "react";
import styles from "./style.module.css";

function TableHeader({ header, action }) {
	return (
		<thead className={styles.container}>
			<tr>
				{header.map((header) => (
					<th key={header.title} className={styles.th}>
						{header.title}
					</th>
				))}
				{action && <th className={styles.th}>Acciones</th>}
			</tr>
		</thead>
	);
}

export default TableHeader;
