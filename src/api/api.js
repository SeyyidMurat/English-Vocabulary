import axios from 'axios';

export const wordApi = axios.create({
	baseURL: 'https://vocabulary.adaptable.app/',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('vocabularyToken')}`,
	},
});

wordApi.interceptors.request.use(
	(config) => {
		const user = localStorage.getItem('vocabularyToken');

		if (user) {
			config.headers.Authorization = `Bearer ${user} `;
		}

		return config;
	},
	(error) => {
		// console.log("request error", error);
		return Promise.reject(error);
	}
);
