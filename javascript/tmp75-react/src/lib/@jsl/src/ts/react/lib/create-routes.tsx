/// 路由生成器
/// author frank575
/// v0


import {FC, ComponentType, ReactNode} from 'react'
import {HashRouter, Redirect, Route, Router, Switch} from 'react-router-dom'
import {createBrowserHistory, History, LocationDescriptor} from "history";

export type ICreateRoute = {
  path?: string
  component?: ComponentType
  redirect?: LocationDescriptor
  children?: ICreateRoute[]
}
export const createRoutes = (routes: ICreateRoute[], isHash = true): { Routes: FC, history: null | History} => {
  const history = isHash ? null : createBrowserHistory()
  const Redirects = [] as ReactNode[]
  const Routes = [] as ReactNode[]
  const recurMap = (
    parentChildren: ICreateRoute[],
    {path: parentPath, component: ParentComponent}: ICreateRoute,
    prefix: string,
  ) => {
    const Children = (
      <Switch>
        {parentChildren.map((e) => {
          const {
            path,
            redirect,
            children,
            component: Component,
          } = e
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
            // TODO jsl 要更改以下代碼並添加ts版本
            const RRoute = path
              ? <Route
                  key={concatPath}
                  path={concatPath}
                  exact
                  component={Component}
                />
              : <Route key={`${concatPath}--404`} component={Component} />
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
    const {
      redirect,
      path,
      children,
      component: Component,
    } = e
    if (redirect) {
      Redirects.push(<Redirect key={path} path={path} to={redirect} exact/>)
    }
    if (children) {
      const nextPath = path === '/' ? path : path + '/'
      Routes.push(recurMap(children, e, nextPath))
    } else {
      if (path) Routes.push(<Route key={path} path={path} exact component={Component}/>)
      else Routes.push(<Route key={`404`} component={Component}/>)
    }
  }

  const RRouter: FC = ({children}) => isHash
    ? <HashRouter>{children}</HashRouter>
    : <Router history={history as any}>{children}</Router>

  return {
    Routes: () => <RRouter>
      <Switch>
        {Redirects.concat(Routes)}
      </Switch>
    </RRouter>,
    history,
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
*/
