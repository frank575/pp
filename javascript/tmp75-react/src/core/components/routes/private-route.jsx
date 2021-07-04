import { useAuth } from '@/core/hooks/useAuth'
import { Redirect, Route } from 'react-router'

export const PrivateRoute = props => {
	const [loading, success] = useAuth()
	return loading ? (
		<div>驗證中...</div>
	) : success ? (
		<Route {...props} />
	) : (
		<Redirect to={'/login'} />
	)
}
