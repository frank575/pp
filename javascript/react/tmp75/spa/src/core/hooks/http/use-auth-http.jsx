import React, { createContext, useContext, useMemo } from 'react'
import { createHttp } from '@/core/hooks/http/create-http'
import { useAuth } from '@/core/hooks/use-auth'
import { AxiosInstance } from 'axios'
import { useMitt } from '@/core/hooks/use-mitt'
import { AUTHORIZATION_FAILED } from '@/core/mitt-type'

export { AuthHttpProvider, useAuthHttp }

const context = createContext(null)

function AuthHttpProvider({ children }) {
	const token = useAuth(e => e.token)
	const { emit } = useMitt()
	const service = useMemo(() => {
		const _service = createHttp()

		_service.http.interceptors.request.use(
			config => {
				config.headers['X-XSRF-TOKEN'] = token
				return config
			},
			error => {
				return Promise.resolve(error)
			},
		)

		_service.http.interceptors.response.use(
			response => {
				return response
			},
			error => {
				// 統一 try/catch
				const res = error.response
				// if (res && res.data) {
				// 	message.error(res.data.message)
				// }
				// if (res.status === 401) {
				// 	emit(AUTHORIZATION_FAILED)
				// }
				return Promise.resolve(res)
			},
		)

		return _service
	}, [token])

	return (
		<context.Provider value={{ _http: service.http }}>
			{children}
		</context.Provider>
	)
}

/**
 * @return {{_http: AxiosInstance}}
 */
function useAuthHttp() {
	return useContext(context)
}
