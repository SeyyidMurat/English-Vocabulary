import moment from "moment";

const wordReducer = (state, action) => {
	switch (action.type) {
		case "GET_WORDS":
			return {
				...state,
				words: action.payload.data,
				selectWords: action.payload?.data.filter((item) => item.wordType.includes(action.payload?.word ?? "")),
				error: undefined,
			};

		case "ADD_WORDS":
			const addedWord = state.words.find((xl) => xl.word === action.payload.word);
			if (!addedWord) {
				return { ...state, words: [...state.words, action.payload] };
			} else {
				return state;
			}
		case "UPDATE_WORDS":
			return {
				...state,
				words: state.words.map((xl) => (xl._id === action.payload?._id ? { ...action.payload } : xl)),
			};
		case "DELETE_WORDS":
			return {
				...state,
				words: state.words.filter((xl) => xl._id !== action.payload),
			};
		case "SELECT_WORDS":
			return {
				...state,
				selectWords: state.words?.filter((item) => item.wordType.includes(action.payload ?? "")),
			};
		case "SEARCH_WORDS":
			return {
				...state,
				selectWords: state.words
					?.filter((item) => item.wordType.includes(action.payload.params ?? ""))
					.filter((item) => item.word.includes(action.payload.search)),
			};
		case "SORTING_WORDS":
			return {
				...state,
				selectWords: state.selectWords.slice().sort((a, b) => {
					switch (action.payload) {
						case "most recently":
							return moment(b.createdAt).format("x") - moment(a.createdAt).format("x");
						case "oldest":
							return moment(a.createdAt).format("x") - moment(b.createdAt).format("x");
						default:
							return state.selectWords;
					}
				}),
			};
		default:
			return state;
	}
};

export default wordReducer;
