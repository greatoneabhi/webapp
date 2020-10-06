var gutil = require('gulp-util');

exports.paths = {
    src: 'src',
    dist: 'dist',
    build: 'build',
    modules: 'node_modules'
};

exports.errorHandler = function(title) {
    'use strict';

    return function(err, done) {
        gutil.log(gutil.colors.red('[' + title+ ']'), err.toString());
        this.emit('end');
        done();
    };
};