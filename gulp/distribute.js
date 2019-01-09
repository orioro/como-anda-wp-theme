const replace = require('gulp-replace')

module.exports = (gulp) => {
	gulp.task('distribute', () => {

		const WORDPRESS_FILES = [
			'src/**/*.php',
			'src/screenshot.png',
			'src/style.css',
		]

		const CUSTOM_RESOURCES = [
			'src/js/page-template-infografico-roda/**/*'
		]

		const SCRIPTS = [
			'src/js/**/*.bundle.js',
		]

		const RESOURCES = [
			'src/resources/**/*',
		]

		const VENDOR = [
			'src/vendor/**/*'
		]

		const IGNORED_DEVELOPMENT_FILES = [
			'!src/less',
			'!src/less/**/*',
			'!src/inc/development',
			'!src/inc/development/**/*',
		]

		return gulp.src([
			...WORDPRESS_FILES,
			...CUSTOM_RESOURCES,
			...SCRIPTS,
			...RESOURCES,
			...VENDOR,
			...IGNORED_DEVELOPMENT_FILES,
		], { base: 'src' })
		// Replaces the loading of development files
		.pipe(replace("require_once('inc/development/load.php');", ''))
		.pipe(gulp.dest('dist'))
	})
}
