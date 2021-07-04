import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from '@/core/store'
import { NoLayoutFallback } from '@/core/components/fallback/no-layout-fallback'
import { Layout } from '@/core/components/layout'
import { PrivateRoute } from '@/core/components/routes/private-route'
import { LayoutFallback } from '@/core/components/fallback/layout-fallback'

const RoutesContent = () => {
	return (
		<HashRouter>
			<StoreProvider>
				<Switch>
					<Redirect path="/" to="/task" exact />
					{/*登入後主APP頁面 START*/}
					<Route path={['/task', '/task/detail/:id', '/billboard']} exact>
						<Layout>
							{/*任務管理 START*/}
							<Suspense fallback={<LayoutFallback />}>
								<Switch>
									<Route path="/task">
										<Switch>
											<PrivateRoute
												exact
												component={lazy(() => import('@/pages/task/list'))}
											/>
											<PrivateRoute
												path="detail/:id"
												exact
												component={lazy(() => import('@/pages/task/detail'))}
											/>
										</Switch>
									</Route>
									{/*任務管理 END*/}
									<PrivateRoute
										path={'/billboard'}
										exact
										component={lazy(() => import('@/pages/billboard'))}
									/>
								</Switch>
							</Suspense>
						</Layout>
					</Route>
					{/*登入後主APP頁面 END*/}
					<Suspense fallback={<NoLayoutFallback />}>
						<Switch>
							<Route
								path={'/login'}
								exact
								component={lazy(() => import('@/pages/account/login'))}
							/>
							<Route
								path={'/register'}
								exact
								component={lazy(() => import('@/pages/account/register'))}
							/>
							<Route
								component={lazy(() => import('@/core/components/not-found'))}
							/>
						</Switch>
					</Suspense>
				</Switch>
			</StoreProvider>
		</HashRouter>
	)
}

export const Routes = () => {
	return (
		<HashRouter>
			<StoreProvider>
				<RoutesContent />
			</StoreProvider>
		</HashRouter>
	)
}
