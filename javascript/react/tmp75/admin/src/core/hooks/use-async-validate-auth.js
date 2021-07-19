import { useEffect } from 'react'
import { EAuthCode } from '@/core/service/use-auth'
import { useSafeState } from '@jsl-hooks'
import { useAuth } from '@/core/service/use-auth'

export const useAsyncValidateAuth = () => {
	const auth = useAuth(e => e.auth)
	const checkAuth = useAuth(e => e.checkAuth)
	const clearAuthState = useAuth(e => e.clearAuthState)
	const [code, setCode] = useSafeState(
		auth == null ? EAuthCode.validating : EAuthCode.authSuccess,
	)

	const initAuth = async () => {
		const { code: _code } = await checkAuth()
		console.log({
			'checkAuth.code': EAuthCode.t(_code),
		})
		switch (_code) {
			case EAuthCode.authError:
			case EAuthCode.notLogin:
				clearAuthState()
				break
		}
		setCode(_code)
	}

	useEffect(initAuth, [])

	return code
}
