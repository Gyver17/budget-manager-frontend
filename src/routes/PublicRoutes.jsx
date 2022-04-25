import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = () => {
    return false ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRouter;
