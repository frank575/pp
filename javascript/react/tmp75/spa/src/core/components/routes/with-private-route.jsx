import React from 'react'
import { AuthComponent } from '@/core/components/routes/auth-component'

export const withPrivateRoute =
	(routeComponent, ...withFuncs) =>
	() => {
		withFuncs.forEach(e => e())

		return <AuthComponent component={routeComponent} />
	}
