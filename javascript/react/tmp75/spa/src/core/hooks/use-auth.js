import { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { message } from 'antd'
import { useLocalStorageState, useProvider } from '@jsl-react/hooks'
import { callNoAuthRandomSuccessFakeApi } from '@/core/api-service'
import { createEnum } from '@jsl'
import { useMitt } from '@/core/hooks/use-mitt'
import { AUTHORIZATION_FAILED } from '@/core/mitt-type'

export const EAuthCode = createEnum({
	validating: [0, '驗證中'],
	authSuccess: [1, '身分驗證成功'],
	authError: [2, '身分驗證失敗(喔天哪，你這個傢伙可真壞耶！)'],
	notLogin: [3, '尚未登入'],
	hasAuth: [4, '已取得身分資訊'],
})

export const { Provider: AuthProvider, inject: useAuth } = useProvider(service)

function service() {
	const history = useHistory()
	const [auth, setAuth] = useState(null) // Object | null
	const [token, setToken] = useLocalStorageState('tmp75_token', null)
	const { on } = useMitt()

	const clearAuthState = useCallback(() => {
		setAuth(null)
		setToken(null)
	}, [])

	const onLogout = useCallback(() => {
		clearAuthState()
		history.replace('/login')
	}, [])

	const checkAuth = useCallback(async () => {
		if (token) {
			if (auth == null) {
				const { success } = await callNoAuthRandomSuccessFakeApi()
				if (success) {
					setAuth({
						id: 1,
						account: import.meta.env.VITE_USERNAME,
						name: 'frank',
					})
					message.success(EAuthCode.t(EAuthCode.authSuccess))
					return {
						code: EAuthCode.authSuccess,
						message: EAuthCode.t(EAuthCode.authSuccess),
					}
				}
			} else {
				return {
					code: EAuthCode.hasAuth,
					message: EAuthCode.t(EAuthCode.hasAuth),
				}
			}
			message.error(EAuthCode.t(EAuthCode.authError))
			return {
				code: EAuthCode.authError,
				message: EAuthCode.t(EAuthCode.authError),
			}
		}
		return {
			code: EAuthCode.notLogin,
			message: EAuthCode.t(EAuthCode.notLogin),
		}
	}, [auth, token])

	on(AUTHORIZATION_FAILED, () => {
		onLogout()
	})

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
