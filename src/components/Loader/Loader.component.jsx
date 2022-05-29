import React from "react";
import styles from "./style.module.css";

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.loader}>
				<div className={styles.loaderSquare}></div>
				<div className={styles.loaderSquare}></div>
				<div className={styles.loaderSquare}></div>
				<div className={styles.loaderSquare}></div>
				<div className={styles.loaderSquare}></div>
				<div className={styles.loaderSquare}></div>
				<div className={styles.loaderSquare}></div>
			</div>
		</div>
	);
}

export default Loader;
