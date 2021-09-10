import axios, { AxiosInstance } from 'axios'

/**
 * @return {{http: AxiosInstance}}
 */
export const createHttp = () => ({
	http: axios.create({
		baseURL: '/api',
	}),
})
