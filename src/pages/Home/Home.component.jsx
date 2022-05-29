/* ---- Library Imports ---- */
import React, { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ---- Components Imports ---- */
import CardHome from "../../components/CardHome/CardHome.component";
import ToasterMessage, {
	toast,
} from "../../components/ToasterMessage/ToasterMessage.component";
import Loader from "../../components/Loader/Loader.component";
import SessionExpired from "../../components/SessionExpired/SessionExpired.component";

/* ---- Imports to Components ---- */
import styles from "./style.module.css";
import OperationServices from "../../services/operation.services";
import { AuthContext } from "../../context/AuthProvider.context";

function Home() {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state;

	const operationServices = new OperationServices(
		dispatch,
		toast,
		user.token,
		user.id
	);

	const { data, isSuccess, isError } = useQuery(
		["getHomeValue", operationServices],
		async () => {
			const operations = await operationServices.getHomeValue();
			return operations;
		}
	);

	operationServices.queryClient = useQueryClient();

	if (isError) {
		return <SessionExpired serverError={true} />;
	}

	return (
		<>
			<ToasterMessage />
			{isSuccess ? (
				<main className={styles.container}>
					<h1>Balance actual: {data?.balance} $</h1>
					<div className={styles.cards}>
						{data?.lastOperations?.map((data) => (
							<CardHome data={data} />
						))}
					</div>
				</main>
			) : (
				<Loader />
			)}
		</>
	);
}

export default Home;
