/* ---- Library Imports ---- */
import React, { useState, useEffect, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ---- Components Imports ---- */
import AddButton from "../../components/AddButton/AddButton.component";
import Card from "../../components/Card/Card.component";
import Pagination from "../../components/Pagination/Pagination.component";
import TextSearch from "../../components/TextSearch/TextSearch.component";
import usePagesData from "../../hooks/usePagesData.hook";
import FormCategory from "./components/FormCategory/FormCategory.component";
import ToasterMessage, {
	toast,
} from "../../components/ToasterMessage/ToasterMessage.component";
import Loader from "../../components/Loader/Loader.component";
import SessionExpired from "../../components/SessionExpired/SessionExpired.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import { AuthContext } from "../../context/AuthProvider.context";
import CategoryServices from "../../services/category.services";

function Category() {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state;

	const categoryServices = new CategoryServices(
		dispatch,
		toast,
		user.token,
		user.id
	);

	const { data, isSuccess, isError } = useQuery(
		["getCategory", categoryServices],
		async () => {
			const categories = await categoryServices.getCategory();
			return categories;
		}
	);
	const queryClient = useQueryClient();

	const [itemsPerPage, setItemsPerPage] = useState(0);
	const [openForm, setOpenForm] = useState(false);

	const search = (values, valueSearch) => {
		let expresion = new RegExp(`${valueSearch}.*`, "i");
		return values.filter((value) => expresion.test(value.name));
	};

	useEffect(() => {
		if (window.innerWidth < 400) {
			setItemsPerPage(5);
		} else if (window.innerWidth < 600) {
			setItemsPerPage(8);
		} else if (window.innerWidth < 1024) {
			setItemsPerPage(12);
		} else {
			setItemsPerPage(16);
		}
	}, []);

	const [pagesData, totalItems, currentPage, setCurrentPage, setSearch] =
		usePagesData(data, itemsPerPage, search, isSuccess);

	if (isError) {
		return <SessionExpired serverError={true} />;
	}

	return (
		<>
			<ToasterMessage />
			<main className={styles.main}>
				<h1>Categorías</h1>
				{isSuccess ? (
					<>
						<div className={styles.container}>
							<div className={styles.actions}>
								<TextSearch
									onSearch={(value) => {
										setSearch(value);
										setCurrentPage(1);
									}}
								/>
								<AddButton onClick={() => setOpenForm(true)} />
							</div>
							<div className={styles.cards}>
								{pagesData.map((data) => (
									<div>
										<Card
											data={data}
											toast={toast}
											services={categoryServices}
											queryClient={queryClient}
										/>
									</div>
								))}
							</div>
							<Pagination
								totalItems={totalItems}
								itemsPerPage={itemsPerPage}
								currentPage={currentPage}
								setPage={(page) => setCurrentPage(page)}
							/>
						</div>
					</>
				) : (
					<Loader />
				)}
			</main>
			<FormCategory
				openForm={openForm}
				setOpenForm={setOpenForm}
				services={categoryServices}
				queryClient={queryClient}
				toast={toast}
			/>
		</>
	);
}

export default Category;
