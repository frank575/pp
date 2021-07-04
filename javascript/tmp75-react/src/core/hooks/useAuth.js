import { useEffect, useState } from 'react'
import { useStore } from '@/core/store'
import { authCode } from '@/core/store/useAuth'

export const useAuth = () => {
	const checkAuth = useStore(e => e.checkAuth)
	const clearAuthState = useStore(e => e.clearAuthState)
	const [loading, setLoading] = useState(true)
	const [success, setSuccess] = useState(false)
	useEffect(() => {
		;(async () => {
			const { code } = await checkAuth()
			console.log({
				'checkAuth.code': authCode.t(code),
			})
			switch (code) {
				case authCode.authSuccess:
				case authCode.hasAuth:
					setSuccess(true)
					break
				case authCode.authError:
				case authCode.notLogin:
					clearAuthState()
					setSuccess(false)
					break
			}
			setLoading(false)
		})()
	}, [])

	return [loading, success]
}
