import React from 'react'
import { Route } from 'react-router'
import { AuthScreen } from '@/core/components/routes/auth-screen'

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={() => (
				<AuthScreen>
					<Component />
				</AuthScreen>
			)}
		/>
	)
}
