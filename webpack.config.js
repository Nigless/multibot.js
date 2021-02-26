/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
	target: 'node',
	mode: 'production',
	entry: path.resolve(__dirname, './src/app.ts'),
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
