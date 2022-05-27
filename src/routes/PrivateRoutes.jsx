import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.context";

const PrivateRoute = ({ children }) => {
	const [state] = useContext(AuthContext);
	const { user } = state;

	return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
