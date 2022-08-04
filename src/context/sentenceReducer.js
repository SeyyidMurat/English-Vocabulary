import moment from "moment";

const sentenceReducer = (state, action) => {
	switch (action.type) {
		case "GET_SENTENCES":
			console.log(action.payload);
			return {
				...state,
				senteces: action.payload,
				error: undefined,
			};

		case "DELETE_SENTENCES":
			return {
				...state,
				senteces: state.senteces.filter((xl) => xl._id !== action.payload),
			};
		case "SORTING_SENTENCES":
			return {
				...state,
				senteces: state.senteces.slice().sort((a, b) => {
					switch (action.payload) {
						case "most recently":
							return moment(b.createdAt).format("x") - moment(a.createdAt).format("x");
						case "oldest":
							return moment(a.createdAt).format("x") - moment(b.createdAt).format("x");
						default:
							return state;
					}
				}),
			};
		default:
			return state;
	}
};

export default sentenceReducer;
