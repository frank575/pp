import { defineConfig, loadEnv } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImport from 'vite-plugin-babel-import'
import reactSvgPlugin from 'vite-plugin-react-svg'
const path = require('path')

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		plugins: [
			reactRefresh(),
			reactSvgPlugin({
				defaultExport: 'component',
				expandProps: 'end',
			}),
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
		// ant-mobile bundle 錯誤修復用
		// build: { commonjsOptions: { transformMixedEsModules: true } },
		esbuild: {
			jsxInject: `import React from 'react'`,
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'75l': '75l/common/web',
				'75l-react': '75l/react/web',
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
}
