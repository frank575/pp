import { useEffect, useState } from 'react'
import { useStore } from '@/core/store'
import { EAuthCode } from '@/core/store/useAuth'

export const useAuth = () => {
	const checkAuth = useStore(e => e.checkAuth)
	const clearAuthState = useStore(e => e.clearAuthState)
	const [state, setState] = useState({
		loading: true,
		success: false,
	})
	useEffect(() => {
		;(async () => {
			const { code } = await checkAuth()
			console.log({
				'checkAuth.code': EAuthCode.t(code),
			})
			switch (code) {
				case EAuthCode.authSuccess:
				case EAuthCode.hasAuth:
					setState({
						loading: false,
						success: true,
					})
					break
				case EAuthCode.authError:
				case EAuthCode.notLogin:
					clearAuthState()
					setState({
						loading: false,
						success: false,
					})
					break
			}
		})()
	}, [])

	return [state.loading, state.success]
}
