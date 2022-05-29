/* ---- Library Imports ---- */
import React, { useState, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ---- Components Imports ---- */
import AddButton from "../../components/AddButton/AddButton.component";
import Pagination from "../../components/Pagination/Pagination.component";
import Table from "../../components/Table/Table.component";
import TextSearch from "../../components/TextSearch/TextSearch.component";
import FormOperation from "./components/FormOperation/FormOperation.component";
import Loader from "../../components/Loader/Loader.component";
import ToasterMessage, {
	toast,
} from "../../components/ToasterMessage/ToasterMessage.component";
import SessionExpired from "../../components/SessionExpired/SessionExpired.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import usePagesData from "../../hooks/usePagesData.hook";
import { search, column } from "./const/tableProps.const";
import CategoryServices from "../../services/category.services";
import OperationServices from "../../services/operation.services";
import { AuthContext } from "../../context/AuthProvider.context";

function Operations() {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state;

	const categoryServices = new CategoryServices(
		dispatch,
		toast,
		user.token,
		user.id
	);

	const operationServices = new OperationServices(
		dispatch,
		toast,
		user.token,
		user.id
	);

	const { data, isSuccess, isError } = useQuery(
		["getOperation", operationServices],
		async () => {
			const categories = await categoryServices.getCategory();
			const operations = await operationServices.getOperation();
			const optionsCategory = [];
			categories.map((category) =>
				optionsCategory.push({
					value: category.id,
					label: category.name,
				})
			);
			return { operations, optionsCategory };
		}
	);

	operationServices.queryClient = useQueryClient();

	const [openForm, setOpenForm] = useState(false);
	const [update, setUpdate] = useState({ is: false, row: {} });

	const action = [
		{
			icon: "fa-solid fa-delete-left",
			onClick: async (row) => {
				const { id } = row;
				const toastId = toast.loading("Eliminando");
				await operationServices.deleteOperation(id);
				toast.dismiss(toastId);
			},
			class: "delete",
		},
		{
			icon: "fa-solid fa-square-pen",
			onClick: (row) => {
				setUpdate({ is: true, row });
				setOpenForm(true);
			},
			class: "update",
		},
	];

	const [pagesData, totalItems, currentPage, setCurrentPage, setSearch] =
		usePagesData(data?.operations, 15, search, isSuccess);

	if (isError) {
		return <SessionExpired serverError={true}/>;
	}

	return (
		<>
			<ToasterMessage />
			<main className={styles.main}>
				<h1>Operaciones</h1>
				{isSuccess ? (
					<div className={styles.container}>
						<div className={styles.actions}>
							<TextSearch
								onSearch={(value) => {
									setSearch(value);
									setCurrentPage(1);
								}}
							/>
							<AddButton
								onClick={() => {
									setUpdate({ is: false, row: {} });
									setOpenForm(true);
								}}
							/>
						</div>
						<div className={styles.containerTable}>
							<Table
								header={column}
								data={pagesData}
								action={action}
							/>
						</div>
						<Pagination
							totalItems={totalItems}
							itemsPerPage={15}
							currentPage={currentPage}
							setPage={(page) => setCurrentPage(page)}
						/>
					</div>
				) : (
					<Loader />
				)}
			</main>
			<FormOperation
				openForm={openForm}
				setOpenForm={setOpenForm}
				update={update}
				services={operationServices}
				options={data?.optionsCategory}
				toast={toast}
			/>
		</>
	);
}

export default Operations;
