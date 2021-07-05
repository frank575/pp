const path = require('path')

// 給 webstorm 抓取 vite alias
module.exports = {
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@jsl': path.resolve(__dirname, 'src/lib/@jsl/src/js/lib'),
			'@jsl-hooks': path.resolve(__dirname, 'src/lib/@jsl/src/js/react/hooks'),
		},
	},
}
