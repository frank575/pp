import { Redirect } from 'react-router'

const path = '/404'

export const toNotFound = { component: () => <Redirect to={path} /> }

export const notFoundRoute = {
	path,
	component: () => {
		return <div>404 Not Found!</div>
	},
}
