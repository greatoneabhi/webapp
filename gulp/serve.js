'use strict'

module.exports = function(gulp, conf, browserSync) {

    return function() {
        browserSync.init({

            proxy: "localhost:8080",
            port: 8081,
            serveStatic: ['./build', './src/app'],
            open: false,
            ghostMode: {
              links: false
            }
        });
    };
};