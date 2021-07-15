import React from 'react'

export const withRoute =
	(routeComponent, ...withFuncs) =>
	() => {
		withFuncs.forEach(e => e())

		return routeComponent
	}
