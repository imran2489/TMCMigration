var gulp = require('gulp');
var systemjsBuilder = require('gulp-systemjs-builder');
var ts = require("gulp-typescript");
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

gulp.task('watch', function () {
    livereload.listen();
    return watch('wwwroot/App/**/*.ts', {}, defaultGulpTask);

    return watch('./Themes/**/*.html', {}, htmlReloadTask);
});

function defaultGulpTask() {

    console.log("rebuilding files");

    var builder = systemjsBuilder()
    builder.loadConfigSync('./systemjs.config.js')

    builder.buildStatic('wwwroot/App/TheMasterChannelModule.js', { minify: true, mangle: false }).pipe(gulp.dest('./wwwroot/AppBuild')).pipe(livereload());

}

function htmlReloadTask() {
    console.log("html reload");
    gulp.src('Themes/**/*.html').pipe(livereload());
}

gulp.task('default', defaultGulpTask);

