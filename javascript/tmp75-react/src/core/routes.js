import { lazy } from 'react'
import { createRoutes } from '@jsl-react/lib'
import { notFoundRoute, toNotFound } from '@/core/components/not-found'
import { LazyLoading } from '@/core/components/lazy-loading'

const routes = [
	{
		path: '/',
		redirect: '/login',
		children: [
			{
				path: 'login',
				component: lazy(() =>
					import(
						/*webpackChunkName:"not-found"*/ /*webpackMode:"account/login"*/ '@/pages/account/login'
					),
				),
			},
			{
				path: 'register',
				component: lazy(() =>
					import(
						/*webpackChunkName:"not-found"*/ /*webpackMode:"account/register"*/ '@/pages/account/register'
					),
				),
			},
			{
				path: 'task',
				redirect: '/task/list',
				children: [
					{
						path: 'list',
						component: lazy(() =>
							import(
								/*webpackChunkName:"not-found"*/ /*webpackMode:"task/list"*/ '@/pages/task/list'
							),
						),
					},
					{
						path: 'detail',
						component: lazy(() =>
							import(
								/*webpackChunkName:"not-found"*/ /*webpackMode:"task/detail"*/ '@/pages/task/detail'
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
						/*webpackChunkName:"not-found"*/ /*webpackMode:"news"*/ '@/pages/news'
					),
				),
			},
			notFoundRoute,
			toNotFound,
		],
	},
]

const { Routes } = createRoutes(routes, LazyLoading)
export { Routes }
