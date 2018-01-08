'use strict';

var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var conf = require('./gulp/conf');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var angularFileSort = require('gulp-angular-filesort');

/*gulp.task('clean', function() {
    return del('.build');
});*/

gulp.task('styles', require('./gulp/styles')(gulp, less, conf, path, inject));

gulp.task('copy-scripts', ['styles'], require('./gulp/copy-scripts')(gulp, conf, path));

gulp.task('inject', ['copy-scripts'], require('./gulp/inject')(gulp, conf, path, inject));

gulp.task('nodemon', ['inject'], require('./gulp/nodemon')(gulp, browserSync));

gulp.task('serve', ['inject', 'nodemon'], require('./gulp/serve')(gulp, conf, browserSync));

gulp.task('default', ['nodemon'], function() {
    gulp.watch('src/**/*.js', ['inject']);
    gulp.watch('src/**/*.html', ['inject']);
    gulp.watch('build/index.html').on('change', browserSync.reload);
});