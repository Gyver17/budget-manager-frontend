import React from "react";
import styles from "./style.module.css";

function TableBody({ data, header, action }) {
	const format = (number) => {
		const config = {
			minimumFractionDigits: 2,
		};
		return Intl.NumberFormat("en-US", config).format(number);
	};

	const types = (column, row) => {
		if (column.type === "currency") {
			return format(parseFloat(row[column.field])) + " $";
		}

		if (column.type === "numeric") {
			return format(parseFloat(row[column.field]));
		}
		if (column.type === "type") {
			if (row[column.field] === "ingress") {
				return "Ingreso";
			}
			if (row[column.field] === "expense") {
				return "Egreso";
			}
		} else {
			return row[column.field];
		}
	};

	return (
		<tbody className={styles.container}>
			{data.map((data, index) => (
				<tr key={index + 1} className={styles.row}>
					{header.map((header) => (
						<td>{types(header, data)}</td>
					))}
					{action && (
						<td>
							<div className={styles.action}>
								{action.map((action) => (
									<button
										className={styles.button}
										onClick={(e) => action.onClick(data)}
									>
										<i
											className={action.icon}
											id={
												action.class === "delete"
													? styles.delete
													: styles.update
											}
										/>
									</button>
								))}
							</div>
						</td>
					)}
				</tr>
			))}
		</tbody>
	);
}

export default TableBody;
