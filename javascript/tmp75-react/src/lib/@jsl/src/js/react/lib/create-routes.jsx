/// 路由生成器
/// author frank575
/// v2 [broken] 把 <Router /> 使用權轉移給使用者
/// v1 [broken] 加入 SuspenseFallback 功能
/// v0

import { ReactElement, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

/**
 * @typedef {Object} Route
 * @property {string} path
 * @property {ReactElement} component
 * @property {*} redirect
 * @property {Route[]} children
 *
 * @param {Route[]} routes
 * @param {null | ReactElement} SuspenseFallback
 * @returns {{Routes: ReactElement[]}}
 */
export const createRoutes = (routes, SuspenseFallback = null) => {
	const Redirects = []
	const Routes = []
	const recurMap = (
		parentChildren,
		{ path: parentPath, component: ParentComponent },
		prefix,
	) => {
		const Children = (
			<Switch>
				{parentChildren.map(e => {
					const { path, redirect, children, component: Component } = e
					const concatPath = `${prefix}${path}`
					if (redirect) {
						Redirects.push(
							<Redirect
								key={concatPath}
								path={concatPath}
								to={redirect}
								exact
							/>,
						)
					}
					if (children && children.length) {
						const nextPath = concatPath === '/' ? concatPath : concatPath + '/'
						return recurMap(children, e, nextPath)
					} else {
						const RRoute = path ? (
							<Route
								key={concatPath}
								path={concatPath}
								exact
								component={Component}
							/>
						) : (
							<Route key={`${concatPath}--404`} component={Component} />
						)
						return [RRoute]
					}
				})}
			</Switch>
		)
		return (
			<Route key={prefix} path={prefix}>
				{props =>
					ParentComponent ? (
						<ParentComponent {...props}>{Children}</ParentComponent>
					) : (
						Children
					)
				}
			</Route>
		)
	}

	for (let i = 0; i < routes.length; i++) {
		const e = routes[i]
		const { redirect, path, children, component: Component } = e
		if (redirect) {
			Redirects.push(<Redirect key={path} path={path} to={redirect} exact />)
		}
		if (children) {
			const nextPath = path === '/' ? path : path + '/'
			Routes.push(recurMap(children, e, nextPath))
		} else {
			if (path)
				Routes.push(
					<Route key={path} path={path} exact component={Component} />,
				)
			else Routes.push(<Route key={`404`} component={Component} />)
		}
	}

	return {
		Routes: () => (
			<Suspense fallback={<SuspenseFallback />}>
				<Switch>{Redirects.concat(Routes)}</Switch>
			</Suspense>
		),
	}
}
/*
	[
		{
			path: '/',
			component: Home,
		},
		{
			path: '/a',
			redirect: '/a/a',
			component: Wrap1,
			children: [
				{
					path: 'a',
					redirect: '/a/a/a',
					component: Wrap2,
					children: [
						{
							path: 'a',
							component: AAA,
						},
						{
							path: 'b',
							component: AAB,
						},
            {
              component: NotFound3,
            },
					],
				},
				{
					path: 'b',
					component: AB,
				},
        {
          component: NotFound2,
        },
			],
		},
		{
			path: '/b',
			redirect: '/b/a',
			children: [
				{
					path: 'a',
					component: BA,
				},
        {
          component: NotFound2,
        },
			]
		},
		{
		  component: NotFound1, // not-found 切記放在最後否則將會吃掉其他全部路由，not-found.path可傳''或空
    },
	]
	前↑  前↑  前↑  前↑  前↑  前↑  前↑  前↑  前↑  前↑
	編譯結果大致如下：
	後↓  後↓  後↓  後↓  後↓  後↓  後↓  後↓  後↓  後↓
	<Suspense fallback={<SuspenseFallback />}>
		<Switch>
			<Redirect path={'/a'} to={'/a/a'} exact />
			<Redirect path={'/a/a'} to={'/a/a/a'} exact />
			<Redirect path={'/b'} to={'/b/a'} exact />
			<Route path={'/'} exact component={Home} />
			<Route path={'/a'}>
				{props =>
					<Wrap1 {...props}>
						<Switch>
							<Route path={'/a/a'}>
								{props =>
									<Wrap2 {...props}>
										<Switch>
											<Route path={'/a/a/a'} exact component={AAA} />
											<Route path={'/a/a/b'} exact component={AAB} />
											<Route component={NotFound3} />
										</Switch>
									</Wrap2>
								}
							</Route>
							<Route path={'/a/b'} exact component={AB} />
							<Route component={NotFound2} />
						</Switch>
					</Wrap1>
				}
			</Route>
			<Route path={'/b'}>
				<Switch>
					<Route path={'/b/a'} exact component={BA} />
					<Route component={NotFound2} />
				</Switch>
			</Route>
			<Route component={NotFound1}/>
		</Switch>
	</Suspense>
*/
