import { useEffect, useMemo, useState } from 'react'
import { Redirect } from 'react-router'
import { useStore } from '@/core/store'
import { EAuthCode } from '@/core/store/useAuth'

export const withAuth = Component => {
	// const checkAuth = useStore(e => e.checkAuth)
	// const clearAuthState = useStore(e => e.clearAuthState)
	// const [loading, setLoading] = useState(true)
	// const [success, setSuccess] = useState(false)
	// useEffect(() => {
	// 	;(async () => {
	// 		const { code } = await checkAuth()
	// 		setLoading(true)
	// 		console.log({
	// 			'checkAuth.code': authCode.t(code),
	// 		})
	// 		switch (code) {
	// 			case authCode.authSuccess:
	// 				setSuccess(true)
	// 				break
	// 			case authCode.authError:
	// 			case authCode.notLogin:
	// 				clearAuthState()
	// 				setSuccess(false)
	// 				break
	// 		}
	// 	})()
	// }, [])

	return Component

	return () =>
		useMemo(
			() =>
				loading ? (
					<div>驗證中...</div>
				) : success ? (
					<Component />
				) : (
					<Redirect to={'/login'} />
				),
			[loading, success],
		)
}
