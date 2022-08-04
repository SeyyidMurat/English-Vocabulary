import axios from "axios";

export const wordApi = axios.create({
	baseURL: "https://word-learn-apps.herokuapp.com/",
	headers: {
		"Content-Type": "application/json",
	},
});
