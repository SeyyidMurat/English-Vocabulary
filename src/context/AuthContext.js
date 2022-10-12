import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => (localStorage.getItem("vocabularyToken") ? true : false));

	const contextValue = {
		auth,
		setAuth,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
