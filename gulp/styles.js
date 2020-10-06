'use strict'

module.exports = function(gulp, less, conf) {
    return function(done) {
        gulp.src('src/assets/less/main.less')
        .pipe(less())
        .pipe(gulp.dest(conf.paths.build+'/styles'));

        done();
    };
};