import { useHistory } from 'react-router'
import { useLocalStorageState } from '@jsl-react/hooks'
import { callNoAuthRandomSuccessFakeApi } from '@/core/api-service'
import { message } from 'antd'
import { createEnum } from '@jsl'
import { useCallback, useState } from 'react'

export const authCode = createEnum({
	authSuccess: [1, '身分驗證成功'],
	authError: [2, '身分驗證失敗(喔天哪，你這個傢伙可真壞耶！)'],
	notLogin: [3, '尚未登入'],
	hasAuth: [4, '已取得身分資訊'],
})

export const useAuth = () => {
	const history = useHistory()
	const [auth, setAuth] = useState({})
	const [token, setToken] = useLocalStorageState('tmp75_token', null)

	const clearAuthState = useCallback(() => {
		setAuth({})
		setToken(null)
	}, [])

	const onLogout = useCallback(() => {
		clearAuthState()
		history.replace('/login')
	}, [])

	const checkAuth = useCallback(async () => {
		if (token) {
			if (!Object.keys(auth).length) {
				const { success } = await callNoAuthRandomSuccessFakeApi()
				if (success) {
					setAuth({
						id: 1,
						account: import.meta.env.VITE_USERNAME,
						name: 'frank',
					})
					message.success(authCode.t(authCode.authSuccess))
					return {
						code: authCode.authSuccess,
						message: authCode.t(authCode.authSuccess),
					}
				}
			} else {
				return {
					code: authCode.hasAuth,
					message: authCode.t(authCode.hasAuth),
				}
			}
			message.error(authCode.t(authCode.authError))
			return {
				code: authCode.authError,
				message: authCode.t(authCode.authError),
			}
		}
		return {
			code: authCode.notLogin,
			message: authCode.t(authCode.notLogin),
		}
	}, [auth, token])

	return {
		auth,
		setAuth,
		token,
		setToken,
		clearAuthState,
		onLogout,
		checkAuth,
	}
}
