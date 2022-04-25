import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    return false ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoute;
