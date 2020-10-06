'use strict';

var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var conf = require('./gulp/conf');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var angularFileSort = require('gulp-angular-filesort');

gulp.task('clean', done => {
    return del('.build');
    done();
});

gulp.task('styles', require('./gulp/styles')(gulp, less, conf, path, inject));

gulp.task('copy-scripts', gulp.series('styles', require('./gulp/copy-scripts')(gulp, conf, path)));

gulp.task('inject', gulp.series('copy-scripts', require('./gulp/inject')(gulp, conf, path, inject)));

gulp.task('nodemon', require('./gulp/nodemon')(gulp, browserSync));

gulp.task('serve', gulp.series('inject', 'nodemon', require('./gulp/serve')(gulp, conf, browserSync)));

gulp.task('default', gulp.series('serve',done => {
    gulp.watch('src/**/*.js', ['inject']);
    gulp.watch('src/**/*.html', ['inject']);
    gulp.watch('build/index.html').on('change', browserSync.reload);
    done();
}));