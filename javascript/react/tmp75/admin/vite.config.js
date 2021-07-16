import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImport from 'vite-plugin-babel-import'
const path = require('path')
require('./ci/index')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		reactRefresh(),
		vitePluginImport([
			{
				libraryName: 'antd',
				libraryDirectory: 'es',
				style(name) {
					return `antd/es/${name}/style`
				},
			},
			// {
			// 	libraryName: 'antd-mobile',
			// 	libraryDirectory: 'es',
			// 	style(name) {
			// 		return `antd-mobile/es/${name}/style`
			// 	},
			// },
		]),
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	// esbuild: {
	// 	jsxInject: `import React from 'react'`,
	// },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@jsl': path.resolve(__dirname, 'src/core/jsl/src/js/lib'),
			'@jsl-hooks': path.resolve(__dirname, 'src/core/jsl/src/js/react/hooks'),
			'@i18n': path.resolve(__dirname, 'src/core/i18n'),
		},
	},
	server: {
		port: process.env.VITE_PORT,
		proxy: {
			[process.env.VITE_API_BASE_URL]: {
				target: process.env.VITE_API_URL,
				changeOrigin: true,
			},
			// [process.env.VITE_WS_BASE_URL]: {
			// 	target: process.env.VITE_API_URL,
			// 	changeOrigin: true,
			// 	// rewrite: path => path.replace(/^\/ws/, '')
			// }
		},
	},
})
