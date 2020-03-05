const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


function browser() {
    browserSync.init({
        server: {
            baseDir: "src"
        },
        notify: false,
    })
}

function watchFiles() {
    watch("src/sass/**/*.sass", css);
    watch("src/*.html").on('change', browserSync.reload);
}

function css() {
    return src("src/sass/*.sass")
        .pipe(sass())
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
}

exports.css = css;
exports.default = series(
    series(css),
    parallel(browser, watchFiles)
);