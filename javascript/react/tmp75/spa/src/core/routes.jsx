import { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { NoLayoutFallback } from '@/core/components/fallback/no-layout-fallback'
import { withTitle } from '@/core/components/routes/with-funcs/with-title'
import { withSuspenseRoute } from '@/core/components/routes/with-suspense-route'

export const Routes = () => {
	return (
		// <PathnameHistoriesProvider>
			<Switch>
				<Route
					path={'/login'}
					exact
					component={withSuspenseRoute(
						lazy(() => import('@/pages/login')),
						NoLayoutFallback,
						withTitle('登入'),
					)}
				/>

				<Route
					path={'/register'}
					exact
					component={withSuspenseRoute(
						lazy(() => import('@/pages/register')),
						NoLayoutFallback,
						withTitle('註冊'),
					)}
				/>

				{/* LayoutRoute START */}
				{/*<RouteWrapper*/}
				{/*	path={'/billboard'}*/}
				{/*	exact*/}
				{/*	component={withSuspensePrivateRoute(*/}
				{/*		lazy(() => import('@/pages/billboard')),*/}
				{/*		LayoutFallback,*/}
				{/*		withTitle('公佈欄'),*/}
				{/*		withSideKey('billboard'),*/}
				{/*	)}*/}
				{/*	layout={Layout}*/}
				{/*/>*/}
				{/* LayoutRoute END */}

				<Route
					component={withSuspenseRoute(
						lazy(() => import('@/core/components/not-found')),
						NoLayoutFallback,
						withTitle('找不到頁面'),
					)}
				/>
			</Switch>
		// </PathnameHistoriesProvider>
	)
}
