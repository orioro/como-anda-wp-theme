const livereload = require('gulp-livereload')

module.exports = (gulp) => {
	gulp.task('develop', ['compile:less', 'compile:js'], () => {
		gulp.watch(['src/**/*.less'], ['compile:less'])
		gulp.watch(['src/**/*.js', '!**/*.bundle.js'], ['compile:js'])
		gulp.watch(['src/**/*.bundle.js'], livereload.reload)
		livereload.listen(9000)
	})
}
