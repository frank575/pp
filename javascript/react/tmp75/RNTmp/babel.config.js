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
					'@jsl': './src/core/jsl/src/js/lib',
					'@jsl-react': './src/core/jsl/src/js/react',
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
