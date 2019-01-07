const fs = require('fs')
const path = require('path')

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')

const SCRIPTS_DIR = path.join(__dirname, 'src/js')

const isFile = filepath => {
	try {
		return fs.statSync(filepath).isFile()
	} catch (err) {
		return false
	}
}

const scripts = fs.readdirSync(SCRIPTS_DIR).filter(name => {
	return isFile(path.join(SCRIPTS_DIR, name, 'index.js'))
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
		babel({
			babelrc: true,
			exclude: 'node_modules/**'
		}),
		replace({
			'process.env.NODE_ENV': '"development"',
		}),
		resolve({
			browser: true,
		}),
		commonjs({
			namedExports: {
				'node_modules/react-dom/index.js': ['render', 'findDOMNode'],
				'node_modules/redux-logger/dist/redux-logger.js': ['createLogger'],
				'node_modules/react/index.js': ['Component'],
				'node_modules/react-is/index.js': ['isValidElementType'],
				'node_modules/react/index.js': ['PureComponent', 'Component'],
				'node_modules/@typeform/embed/lib/api.js': ['makePopup']
			},
		}),
    globals(),
    builtins()
		// string({
		// 	include: ['src/**/*.css'],
		// })
	]
})

module.exports = scripts.map(scriptConfig)
