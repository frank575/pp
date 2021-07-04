import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from '@/core/store'
import { LazyLoading } from '@/core/components/lazy-loading'
import { Layout } from '@/core/components/layout'

export const Routes = () => {
	return (
		<HashRouter>
			<StoreProvider>
				<Suspense fallback={<LazyLoading />}>
					<Switch>
						<Redirect path="/" to="/task" exact />
						{/*登入後主APP頁面 START*/}
						<Layout>
							{/*任務管理 START*/}
							<Route path="/task">
								<Switch>
									<Route
										path="/task"
										exact
										component={lazy(() => import('@/pages/task/list'))}
									/>
									<Route path="/task/detail/:id">/task/detail</Route>
									<Redirect to="/not-found" />
								</Switch>
							</Route>
							{/*任務管理 END*/}
							<Route
								path={'/news'}
								component={lazy(() => import('@/pages/news'))}
							/>
						</Layout>
						{/*登入後主APP頁面 END*/}
						<Route
							path={'/login'}
							component={lazy(() => import('@/pages/account/login'))}
						/>
						<Route
							path={'/register'}
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
