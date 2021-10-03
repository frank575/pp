module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					// '^~(.+)': './src/\\1',
					'@': './src',
					'75l': '75l/common/native',
					'75l-react': '75l/react/native',
					'@i18n': './src/core/i18n',
				},
				extensions: [
					'.ios.js',
					'.android.js',
					'.js',
					'.jsx',
					'.json',
					'.tsx',
					'.ts',
					'.native.js',
				],
			},
		],
		'react-native-reanimated/plugin',
	],
}
