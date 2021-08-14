import json from '@rollup/plugin-json'
// import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const cpkg = ({ input, file }) => ({
	input,
	plugins: [/*resolve(), */ commonjs(), ts(), json()],
	output: [
		{
			file,
			format: 'cjs',
			plugins: [terser()],
		},
	],
})

export default [
	cpkg({ input: 'src/lib/index.ts', file: 'dist/index.cjs.js' }),
	cpkg({ input: 'src/react/hooks/index.ts', file: 'dist/react.hooks.cjs.js' }),
	cpkg({ input: 'src/react/lib/index.ts', file: 'dist/react.lib.cjs.js' }),
]
