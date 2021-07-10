import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const path = require('path')
require('./ci/index')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	// esbuild: {
	// 	jsxInject: `import React from 'react'`,
	// },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@jsl': path.resolve(__dirname, 'src/lib/@jsl/src/js/lib'),
			'@jsl-hooks': path.resolve(__dirname, 'src/lib/@jsl/src/js/react/hooks'),
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
