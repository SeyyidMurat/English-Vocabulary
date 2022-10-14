import React, { createContext, useReducer, useContext } from "react";

import wordReducer from "./wordReducer";

export const WordContext = createContext();

const WordContextProvider = ({ children }) => {
	const initialWords = { words: "" };

	const [wordsData, dispatch] = useReducer(wordReducer, initialWords);

	const contextValue = {
		dispatch,
		wordsData,
	};

	return <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>;
};

export default WordContextProvider;

export const useWordContext = () => useContext(WordContext);
