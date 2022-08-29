import React, { createContext, useReducer, useEffect } from "react";

import wordReducer from "./wordReducer";
import sentenceReducer from "./sentenceReducer";

export const WordContext = createContext();

const WordContextProvider = ({ children }) => {
	const initialWords = { words: "", error: "", selectWords: "" };
	const initialSenteces = { senteces: "", error: "" };

	const [wordsData, dispatch] = useReducer(wordReducer, initialWords);
	const [sentecesData, dispatch2] = useReducer(sentenceReducer, initialSenteces);

	const contextValue = {
		dispatch,
		dispatch2,
		wordsData,
		sentecesData,
	};

	return <WordContext.Provider value={contextValue}>{children}</WordContext.Provider>;
};

export default WordContextProvider;
