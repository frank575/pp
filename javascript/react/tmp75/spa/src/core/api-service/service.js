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
		// TODO false 改成 401 驗證
		if (false) {
			// 使用 react-mitt 發布到 store/useAuth 模塊的訂閱裡
		}
		return Promise.resolve(res)
	},
)

export default axios
