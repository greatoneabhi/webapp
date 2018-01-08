'use strict'

module.exports = function(gulp, conf, path) {
  return function() {
    gulp.src([
        path.join(conf.paths.modules, 'jquery/dist/**/jquery.min.js'),
        path.join(conf.paths.modules, 'bootstrap/dist/**/*.min.js'),
        path.join(conf.paths.modules, 'angular/**/*.min.js'),
        path.join(conf.paths.modules, 'angular-ui-router/release/**/*.min.js'),
        path.join(conf.paths.modules, 'angular-ui-bootstrap/dist/**/ui-bootstrap.js'),
        path.join(conf.paths.modules, 'angular-ui-grid/**/ui-grid.min.js')
      ])
      .pipe(gulp.dest(path.join(conf.paths.build, '/scripts')));

    gulp.src([
        path.join(conf.paths.modules, 'bootstrap/fonts/**'),
        path.join(conf.paths.modules, 'font-awesome/fonts/**')
      ])
      .pipe(gulp.dest(path.join(conf.paths.build, '/fonts')));
    
    gulp.src([
      path.join(conf.paths.modules, 'angular-ui-grid/ui-grid.min.css'),
      path.join(conf.paths.modules, 'angular-ui-grid/*.woff'),
      path.join(conf.paths.modules, 'angular-ui-grid/*.ttf')
    ])
    .pipe(gulp.dest(path.join(conf.paths.build, '/styles')));
  };
};