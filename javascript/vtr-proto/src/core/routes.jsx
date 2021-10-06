import { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { NoLayoutFallback } from '@/core/components/fallback/no-layout-fallback'
import { Layout } from '@/core/components/layout'
import { LayoutFallback } from '@/core/components/fallback/layout-fallback'
import { withTitle } from '@/core/components/routes/with-funcs/with-title'
import { withSideKey } from '@/core/components/routes/with-funcs/with-side-key'
import { RouteWrapper } from '@/core/components/routes/route-wrapper'
import { withSuspenseRoute } from '@/core/components/routes/with-suspense-route'
import { withSuspensePrivateRoute } from '@/core/components/routes/with-suspense-private-route'
import { PathnameHistoriesProvider } from '@/core/hooks/use-pathname-histories'

export const Routes = () => {
	return (
		<PathnameHistoriesProvider>
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

				{/*<RouteWrapper*/}
				{/*	path={'/language'}*/}
				{/*	exact*/}
				{/*	component={withSuspensePrivateRoute(*/}
				{/*		lazy(() => import('@/pages/language')),*/}
				{/*		LayoutFallback,*/}
				{/*		withTitle('多國語系'),*/}
				{/*		withSideKey('language'),*/}
				{/*	)}*/}
				{/*	layout={Layout}*/}
				{/*/>*/}

				<Route
					component={withSuspenseRoute(
						lazy(() => import('@/core/components/not-found')),
						NoLayoutFallback,
						withTitle('找不到頁面'),
					)}
				/>
			</Switch>
		</PathnameHistoriesProvider>
	)
}
