import moment from "moment";

const wordReducer = (state, action) => {
	switch (action.type) {
		case "GET_WORDS":
			return {
				...state,
				words: action.payload.data,
				selectWords: action.payload?.data.filter((item) =>
					item.wordType.includes(action.payload.wordType ?? "")
				),
				error: undefined,
			};
		case "UPDATE_WORDS":
			return {
				...state,
				selectWords: state.words
					.filter((item) => item.wordType.includes(action.payload.params ?? ""))
					.map((xl) => (xl._id === action.payload.editInputs._id ? { ...action.payload.editInputs } : xl)),
			};
		case "DELETE_WORDS":
			return {
				...state,
				words: state.words.filter((xl) => xl._id !== action.payload.id),
				selectWords: state.words
					.filter((item) => item.wordType.includes(action.payload.params ?? ""))
					.filter((xl) => xl._id !== action.payload.id),
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
