const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('broser-sync').create();
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const imageMin = require('gulp-imagemin');


// Copy all HTML files
gulp.task('copyHtml', () => {
	gulp.src('./src/*.html')
			.pipe(gulp.dest('./dist'))
});

// Minify images
gulp.task('imageMin', () => {
	gulp.src('./src/img/*')
			.pipe(imageMin())
			.pipe(gulp.dest('./dist/assets/img'));
});
// Compile SASS and Inject into browser
gulp.task('sass',() => {
	gulp.src('./src/sass/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('./dist/assets/css'))
			.pipe(browserSync.stream());
});

// Compile and concat JS files
gulp.task('scripts', () => {
	gulp.src('./src/js/**/*.js')
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest('./dist/assets/js'));
});

// Watch Files and Serve
gulp.task('serve', ['sass', 'scripts', 'imageMin', 'copyHtml'], ()=> {
	browserSync.init({
		server: './dist'
	});
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js', ['scripts']);
	gulp.watch('./src/img/*', ['imageMin']);	
	gulp.watch('src/*.html').on('change', browserSync.reload());

});

// Default Task
gulp.task('default', ['serve']);
