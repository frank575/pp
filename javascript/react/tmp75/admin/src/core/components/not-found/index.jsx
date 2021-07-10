import React from 'react'
import { Redirect } from 'react-router'
import { routerConfig } from '@/core/lib/config'

const path = '/404'

export const toNotFound = {
	component: () => <Redirect to={path} />,
	meta: routerConfig.SIDE_MENU_SKIP,
}

export const notFoundRoute = {
	path,
	component: () => {
		return <div>404 Not Found!</div>
	},
	meta: routerConfig.SIDE_MENU_SKIP,
}

export default () => {
	return <div>404 Not Found!</div>
}
