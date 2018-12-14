const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const livereload = require('gulp-livereload')

module.exports = (gulp) => {
	gulp.task('compile:less', () => {
		return gulp.src('./src/less/style.less')
		  .pipe(plumber({
	      errorHandler: (err) => {
	        notify.onError('LESS Compilation error')(err)
	        console.warn(err.message)
	      }
	    }))
			.pipe(less())
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(gulp.dest('./src'))
			.pipe(livereload())
	})
}
