import { useEffect } from 'react'
import { useStore } from '@/core/store'
import { EAuthCode } from '@/core/store/use-auth'
import { useSafeState } from '@jsl-hooks'

export const useAsyncValidateAuth = () => {
	const auth = useStore(e => e.auth)
	const checkAuth = useStore(e => e.checkAuth)
	const clearAuthState = useStore(e => e.clearAuthState)
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
