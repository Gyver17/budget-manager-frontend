import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Category from "../pages/Category/Category.component";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword.component";
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword.component";
import Home from "../pages/Home/Home.component";
import Operations from "../pages/Operations/Operations.component";
import SignIn from "../pages/SignIn/SignIn.component";
import SignUp from "../pages/SignUp/SingUp.component";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.component";
import Profile from "../pages/Profile/Profile.component";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.context";
import SessionExpired from "../components/SessionExpired/SessionExpired.component";


function AppRouter() {
	const [state] = useContext(AuthContext);
	const { sessionExpired } = state;

	return (
		<>
			<Router>
				<Routes>
					{/*Privete Routes*/}
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<Home />} />
						<Route path="/category" element={<Category />} />
						<Route path="/operations" element={<Operations />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
					{/*Public Routes*/}
					<Route element={<PublicRoutes />}>
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route
							path="/forgotpassword"
							element={<ForgotPassword />}
						/>
						<Route
							path="/updatepassword"
							element={<UpdatePassword />}
						/>
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
				{sessionExpired && <SessionExpired serverError={false} />}
			</Router>
		</>
	);
}

export default AppRouter;
