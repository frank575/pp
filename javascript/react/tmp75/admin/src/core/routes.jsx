import React, { lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { NoLayoutFallback } from '@/core/components/fallback/no-layout-fallback'
import { Layout } from '@/core/components/layout'
import { LayoutFallback } from '@/core/components/fallback/layout-fallback'
import { withTitle } from '@/core/components/routes/with-funcs/with-title'
import { withSideKey } from '@/core/components/routes/with-funcs/with-side-key'
import { RouteWrapper } from '@/core/components/routes/route-wrapper'
import { withSuspenseRoute } from '@/core/components/routes/with-suspense-route'
import { withSuspensePrivateRoute } from '@/core/components/routes/with-suspense-private-route'
import { useI18n } from '@i18n'

export const Routes = () => {
	useI18n(e => e.locale)

	return (
		<Switch>
			<Redirect path="/" to="/billboard" exact />

			<Route
				path={'/login'}
				exact
				component={withSuspenseRoute(
					lazy(() => import('@/pages/account/login')),
					NoLayoutFallback,
					withTitle('登入'),
				)}
			/>

			<Route
				path={'/register'}
				exact
				component={withSuspenseRoute(
					lazy(() => import('@/pages/account/register')),
					NoLayoutFallback,
					withTitle('註冊'),
				)}
			/>

			<RouteWrapper
				path={'/billboard'}
				exact
				component={withSuspensePrivateRoute(
					lazy(() => import('@/pages/billboard')),
					LayoutFallback,
					withTitle('公佈欄'),
					withSideKey('billboard'),
				)}
				layout={Layout}
			/>

			<RouteWrapper
				path={'/colorful'}
				exact
				component={withSuspensePrivateRoute(
					lazy(() => import('@/pages/colorful')),
					LayoutFallback,
					withTitle('多主題色'),
					withSideKey('colorful'),
				)}
				layout={Layout}
			/>

			<Route
				component={withSuspenseRoute(
					lazy(() => import('@/core/components/not-found')),
					NoLayoutFallback,
					withTitle('找不到頁面'),
				)}
			/>
		</Switch>
	)
}
