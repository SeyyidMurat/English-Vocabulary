import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import AddItem from "./pages/AddItem";
import Home from "./pages/Home";
import Sentence from "./pages/Sentence";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/:word" element={<Home />} />
				</Route>
				<Route path="/add" element={<AddItem />} />
				<Route path="/sentence" element={<Sentence />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
