import React from "react";
import styles from "./style.module.css";

function CardHome({ data }) {
	const typeValue = (type) => {
		if (type === "ingress") {
			return "Ingreso";
		} else {
			return "Egreso";
		}
	};

	return (
		<div className={styles.container}>
			<span className={styles.date}>{data.date}</span>
			<div>
				<span className={styles.type}>
					{data.concept}
				</span>
				<span className={styles.concept}>{typeValue(data.type)}</span>
			</div>
			<span
				className={
					data.type === "ingress" ? styles.ingress : styles.expense
				}
			>
				{data.amount} $
			</span>
		</div>
	);
}

export default CardHome;
