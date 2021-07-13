import React from 'react'
import { Route } from 'react-router'
import { useTitle } from '@jsl-hooks'

export const WithTitleRoute = ({ title, ...rest }) => {
	useTitle(title)
	return <Route {...rest} />
}
