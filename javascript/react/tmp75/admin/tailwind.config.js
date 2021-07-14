module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	important: true,
	theme: {
		extend: {
			maxWidth: {
				'side-menu': '256px',
			},
			borderWidth: {
				1: '1px',
			},
			screens: {
				xs: '425px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
