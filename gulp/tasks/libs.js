const
	gulp          = require('gulp'),
	plumber       = require('gulp-plumber'),
	concat        = require('gulp-concat'),
	errorHandler  = require('../errorHandler'),
	component			= require('../pathFinder').component;

gulp.task('libs', () => {
	return gulp.src([
			component('jquery/dist/jquery.min.js'),
			// component('matter-js/build/matter.min.js'),
			// component('devicejs/lib/device.min.js'),
			//component('jquery.csssr.validation/jquery.csssr.validation.js'),
			component('malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'),
			// component('anchor-js/anchor.min.js'),
			// component('jquery-mousewheel/jquery.mousewheel.min.js'),

			// component('wow/dist/wow.min.js'),
			// component('slick-carousel/slick/slick.min.js'),


	])
		.pipe(plumber({
			errorHandler: errorHandler
	}))
		.pipe(concat('common.min.js'))
		.pipe(gulp.dest('dist/assets/scripts'));
});
