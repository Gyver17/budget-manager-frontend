import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

function Pagination({ totalItems, itemsPerPage, currentPage, setPage }) {
	const [totalPage, setTotalPage] = useState(0);
	const [prevDisabled, setPrevDisabled] = useState(false);
	const [nextDisabled, setNextDisabled] = useState(false);

	useEffect(() => {
		if (totalItems > 0 && itemsPerPage > 0) {
			setTotalPage(Math.ceil(totalItems / itemsPerPage));
		}
		if (currentPage === 1 && totalPage === 1) {
			setPrevDisabled(true);
			setNextDisabled(true);
		}
		if (currentPage === 1 && totalPage > 1) {
			setPrevDisabled(true);
			setNextDisabled(false);
		}
		if (currentPage === totalPage && totalPage > 1) {
			setPrevDisabled(false);
			setNextDisabled(true);
		}
	}, [totalItems, itemsPerPage, currentPage, totalPage]);

	return (
		<div className={styles.container}>
			<span>
				{currentPage}-{totalPage} / {totalItems}
			</span>
			<div>
				<button
					disabled={prevDisabled}
					onClick={() => setPage(currentPage - 1)}
				>
					<i class="fa-solid fa-angles-left" />
				</button>
				<button
					disabled={nextDisabled}
					onClick={() => setPage(currentPage + 1)}
				>
					<i class="fa-solid fa-angles-right" />
				</button>
			</div>
		</div>
	);
}

export default Pagination;
