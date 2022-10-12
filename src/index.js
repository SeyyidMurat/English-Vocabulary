import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.css";
import WordContextProvider from "./context/WordContext";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<WordContextProvider>
				<App />
			</WordContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
