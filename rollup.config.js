import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts',
	output: [{
		sourcemap: true,
		file: './dist/index.js',
		format: 'cjs',
	}],
	onwarn: function (warning, warn) {
		// Ignoring usage of eval in depd
		const file = warning?.loc?.file;
		if (/node_modules\/depd/.test(file)) return;
		return warn(warning);
	},
	plugins: [nodeResolve(), commonjs(), json(), typescript()],
};
