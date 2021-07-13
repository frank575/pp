import React from 'react'
import { useTitle } from '@jsl-hooks'
import { PrivateRoute } from '@/core/components/routes/private-route'

export const WithTitlePrivateRoute = ({ title, ...rest }) => {
	useTitle(title)

	return <PrivateRoute {...rest} />
}
