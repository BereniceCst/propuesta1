var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function (done) {
	connect.server({
		root: 'dist/',
		livereload: false,
		port: 4000,
		fallback: 'dist/Registro_usuario.html'
	});
	done();
})