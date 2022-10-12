import axios from "axios";

export const wordApi = axios.create({
	baseURL: "https://word-learn-apps.herokuapp.com/",
	headers: {
		"Content-Type": "application/json",
		Authorization: localStorage.getItem("vocabularyToken"),
	},
});

wordApi.interceptors.request.use(
	(config) => {
		const user = localStorage.getItem("vocabularyToken");

		if (user) {
			config.headers.Authorization = user;
		}

		return config;
	},
	(error) => {
		// console.log("request error", error);
		return Promise.reject(error);
	}
);
