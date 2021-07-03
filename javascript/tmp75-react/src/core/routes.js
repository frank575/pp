import { lazy } from 'react'
import { createRoutes } from '@jsl-react/lib'
import { notFoundRoute, toNotFound } from '@/core/components/not-found'
import { Layout } from '@/core/components/layout'
import { LazyLoading } from '@/core/components/lazy-loading'

const routes = [
	{
		path: '/login',
		component: lazy(() =>
			import(
				/*webpackChunkName:"login"*/ /*webpackMode:"account/login"*/ '@/pages/account/login'
			),
		),
	},
	{
		path: '/register',
		component: lazy(() =>
			import(
				/*webpackChunkName:"register"*/ /*webpackMode:"account/register"*/ '@/pages/account/register'
			),
		),
	},
	notFoundRoute,
	{
		path: '/',
		redirect: '/task',
		component: Layout,
		children: [
			{
				path: 'task',
				redirect: '/task/list',
				children: [
					{
						path: 'list',
						component: lazy(() =>
							import(
								/*webpackChunkName:"task-list"*/ /*webpackMode:"task/list"*/ '@/pages/task/list'
							),
						),
					},
					{
						path: 'detail',
						component: lazy(() =>
							import(
								/*webpackChunkName:"task-detail"*/ /*webpackMode:"task/detail"*/ '@/pages/task/detail'
							),
						),
					},
					toNotFound,
				],
			},
			{
				path: 'news',
				component: lazy(() =>
					import(
						/*webpackChunkName:"news"*/ /*webpackMode:"news"*/ '@/pages/news'
					),
				),
			},
			toNotFound,
		],
	},
]

const { Routes } = createRoutes(routes, LazyLoading)
export { Routes }
