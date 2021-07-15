module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	important: true,
	theme: {
		screens: {
			'2xl': { max: '1535px' },
			xl: { max: '1279px' },
			lg: { max: '1023px' },
			md: { max: '767px' },
			sm: { max: '639px' },
			xs: { max: '424px' },
		},
		extend: {
			colors: {
				default: '#000000d9',
				success: '#52c41a',
				primary: '#1890ff',
				warning: '#faad14',
				danger: '#ff4d4f',
				secondary: '#00000073',
				disabled: '#00000040',
			},
			borderWidth: {
				1: '1px',
			},
			maxWidth: {
				'side-menu': '256px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
