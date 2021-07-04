import { useEffect, useState } from 'react'
import { useStore } from '@/core/store'
import { authCode } from '@/core/store/useAuth'

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
				'checkAuth.code': authCode.t(code),
			})
			switch (code) {
				case authCode.authSuccess:
				case authCode.hasAuth:
					setState({
						loading: false,
						success: true,
					})
					break
				case authCode.authError:
				case authCode.notLogin:
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
