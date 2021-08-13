import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
	{
		input: 'src/main.ts',
		plugins: [resolve(), commonjs(), ts(), json()],
		output: [
			{
				file: 'dist/index.cjs.js',
				format: 'cjs',
				plugins: [terser()],
			},
		],
	},
]
