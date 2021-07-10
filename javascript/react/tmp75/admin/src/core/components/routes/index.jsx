import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from '@/core/store'
import { NoLayoutFallback } from '@/core/components/fallback/no-layout-fallback'
import { Layout } from '@/core/components/layout'
import { LayoutFallback } from '@/core/components/fallback/layout-fallback'
import { WithTitleSideKeyPrivateRoute } from '@/core/components/routes/components/with-title-side-key-private-route'
import { WithTitleRoute } from '@/core/components/routes/components/with-title-route'

const RoutesContent = () => {
	return (
		<HashRouter>
			<StoreProvider>
				<Switch>
					<Redirect path="/" to="/task" exact />
					{/*登入後主APP頁面 START*/}
					<Route
						path={['/task', '/task/detail/:id', '/billboard', '/colorful']}
						exact
					>
						<Layout>
							<Suspense fallback={<LayoutFallback />}>
								<Switch>
									{/*任務管理 START*/}
									<Route path="/task">
										<Switch>
											<WithTitleSideKeyPrivateRoute
												title={'任務管理'}
												sideKey={'task'}
												path={'/task'}
												exact
												component={lazy(() => import('@/pages/task/list'))}
											/>
											<WithTitleSideKeyPrivateRoute
												title={'任務詳情'}
												sideKey={'task'}
												path="/task/detail/:id"
												exact
												component={lazy(() => import('@/pages/task/detail'))}
											/>
										</Switch>
									</Route>
									{/*任務管理 END*/}
									<WithTitleSideKeyPrivateRoute
										title={'公佈欄'}
										sideKey={'billboard'}
										path={'/billboard'}
										exact
										component={lazy(() => import('@/pages/billboard'))}
									/>
									<WithTitleSideKeyPrivateRoute
										title={'多主題色'}
										sideKey={'colorful'}
										path={'/colorful'}
										exact
										component={lazy(() => import('@/pages/colorful'))}
									/>
								</Switch>
							</Suspense>
						</Layout>
					</Route>
					{/*登入後主APP頁面 END*/}
					{/*無Layout路由 START*/}
					<Suspense fallback={<NoLayoutFallback />}>
						<Switch>
							<WithTitleRoute
								title={'登入'}
								path={'/login'}
								exact
								component={lazy(() => import('@/pages/account/login'))}
							/>
							<WithTitleRoute
								title={'註冊'}
								path={'/register'}
								exact
								component={lazy(() => import('@/pages/account/register'))}
							/>
							<WithTitleRoute
								title={'找不到頁面'}
								component={lazy(() => import('@/core/components/not-found'))}
							/>
						</Switch>
					</Suspense>
					{/*無Layout路由 END*/}
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
