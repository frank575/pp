import React from 'react'
import { Route } from 'react-router'

export const RouteWrapper = ({
	component: Component,
	layout: Layout,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => (
				<Layout {...props}>
					<Component {...props} />
				</Layout>
			)}
		/>
	)
}
