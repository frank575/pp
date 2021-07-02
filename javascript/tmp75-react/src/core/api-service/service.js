import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

axios.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.resolve(error)
	},
)

axios.interceptors.response.use(
	response => {
		return response
	},
	error => {
		const res = error.response
		return Promise.resolve(res)
	},
)

export default axios
