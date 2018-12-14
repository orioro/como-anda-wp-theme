const { exec } = require('child_process')

module.exports = (gulp) => {
	gulp.task('compile:js', () => {
		return new Promise((resolve, reject) => {
			exec('npm run bundle')
				.on('error', reject)
				.on('exit', code => {
					if (code === 0) {
						resolve()
					} else {
						reject(new Error(`compile:js exited with ${code}`))
					}
				})
		})
	})
}
