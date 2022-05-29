import { useState, useMemo } from "react";

const usePagesData = (data, numberOfEntries, searchData, isSuccess) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");

	const { pagesData, totalItems } = useMemo(() => {
		let computedData;
		if (isSuccess) {
			computedData = data;
		} else {
			computedData = [];
		}
		if (search) {
			computedData = searchData(computedData, search);
		}
		const pagination = {
			pagesData: computedData.slice(
				(currentPage - 1) * numberOfEntries,
				(currentPage - 1) * numberOfEntries + numberOfEntries
			),
			totalItems: computedData.length,
		};
		return pagination;
	}, [data, search, currentPage, numberOfEntries, searchData, isSuccess]);

	return [pagesData, totalItems, currentPage, setCurrentPage, setSearch];
};

export default usePagesData;
