import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const PrivateRoute = () => {
	const { auth } = useContext(AuthContext);
	return <div>{auth ? <Outlet /> : <Navigate to="/login" replace />}</div>;
};

export default PrivateRoute;
