import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header.component";
import SideBar from "../components/SideBar/SideBar.component";
import { AuthContext } from "../context/AuthProvider.context";

const PrivateRoute = ({ children }) => {
	const [state] = useContext(AuthContext);
	const { user } = state;

	return user ? (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100vw",
					height: "100vh",
				}}
			>
				<Header userName={user.name} />
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						width: "100%",
						height: "100%"
					}}
				>
					<SideBar />
					<Outlet />
				</div>
			</div>
		</>
	) : (
		<Navigate to="/signin" />
	);
};

export default PrivateRoute;
