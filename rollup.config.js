const fs = require('fs')
const path = require('path')

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

const SCRIPTS_DIR = path.join(__dirname, 'src/js')

const scripts = fs.readdirSync(SCRIPTS_DIR).filter(name => {
	return fs.statSync(path.join(SCRIPTS_DIR, name)).isDirectory()
})

const scriptConfig = scriptName => ({
	input: `src/js/${scriptName}/index.js`,
	output: {
		name: scriptName.replace(/-/g, ''),
		file: 'index.bundle.js',
		dir: `src/js/${scriptName}`,
		format: 'iife',
	},
	watch: {},
	plugins: [
		babel(),
		resolve(),
		commonjs(),
	]
})

module.exports = scripts.map(scriptConfig)
