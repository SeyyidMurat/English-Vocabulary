import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AddWord from "./pages/AddWord";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddVocabulary from "./pages/AddVocabulary";
import LearnedWords from "./pages/LearnedWords";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
const App = () => {
	const { auth } = useContext(AuthContext);
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PrivateRoute />}>
					<Route element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/:wordType" element={<Home />} />
						<Route path="/add" element={<AddWord />} />
						<Route path="/add-vocabulary" element={<AddVocabulary />} />
						<Route path="/learned" element={<LearnedWords />} />
					</Route>
				</Route>
				<Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
				<Route path="/register" element={auth ? <Navigate to="/" /> : <Register />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
