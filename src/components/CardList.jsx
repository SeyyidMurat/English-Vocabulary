import React, { useEffect } from "react";
import { useWordContext } from "../context/WordContext";
import { wordApi } from "../api/api";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import WordCard from "./WordCard";

const CardList = () => {
	const { wordsData, dispatch } = useWordContext();
	const { wordType } = useParams();

	useEffect(() => {
		const getAllWords = async () => {
			try {
				const { data } = await wordApi.get("/api/words");
				dispatch({ type: "GET_WORDS", payload: { data, wordType } });
			} catch (error) {
				dispatch({ type: "ERROR_HANDLER", payload: error.message });
			}
		};
		getAllWords();
	}, []);

	if (wordsData.error) return wordsData.error;

	return <div>{wordsData.words ? <WordCard /> : <Loading />}</div>;
};

export default CardList;
