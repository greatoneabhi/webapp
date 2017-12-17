'use strict'

module.exports = function(gulp, conf, path, inject) {
    return function() {

        var injectStyles = gulp.src([
            path.join(conf.paths.build, 'styles/**/*.css')]);

        var injectAngularJs = gulp.src([
            path.join(conf.paths.build, 'scripts/**/jquery.min.js'),
            path.join(conf.paths.build, 'scripts/**/bootstrap.min.js'),
            path.join(conf.paths.build, 'scripts/**/angular.min.js'),
            path.join(conf.paths.build, 'scripts/**/angular-*.min.js'),
            path.join(conf.paths.build, 'scripts/**/ui-bootstrap.js'),
            path.join(conf.paths.build, 'scripts/**/ui-grid.min.js')
        ]);
        
        var injectStyleOptions = {
            addRootSlash: false,
            ignorePath: conf.paths.build
        };

        var injectScriptOptions = {
            addRootSlash: false,
            ignorePath: conf.paths.build
        };
        
        gulp.src(path.join(conf.paths.src, '/index.html'))
            .pipe(inject(injectStyles, injectStyleOptions))
            .pipe(inject(injectAngularJs, injectScriptOptions))
            .pipe(gulp.dest(conf.paths.build));
    };
};