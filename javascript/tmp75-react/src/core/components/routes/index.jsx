import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from '@/core/store'
import { LazyLoading } from '@/core/components/lazy-loading'
import { Layout } from '@/core/components/layout'
import { PrivateRoute } from '@/core/components/routes/private-route'

const RoutesContent = () => {
	return (
		<HashRouter>
			<StoreProvider>
				<Suspense fallback={<LazyLoading />}>
					<Switch>
						<Redirect path="/" to="/task" exact />
						{/*登入後主APP頁面 START*/}
						<Route path={['/task', '/task/detail/:id', '/news']} exact>
							<Layout>
								{/*任務管理 START*/}
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
										path={'/news'}
										exact
										component={lazy(() => import('@/pages/news'))}
									/>
								</Switch>
							</Layout>
						</Route>
						{/*登入後主APP頁面 END*/}
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
