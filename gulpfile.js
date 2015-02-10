var del             = require('del'),
    gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber'),
    debug           = require('gulp-debug'),
    browserSync     = require('browser-sync'),

    // jade
    jade            = require('gulp-jade'),

    // js
    jshint          = require('gulp-jshint'),
    uglify          = require('gulp-uglify'),

    // delpoying
    deploy          = require('gulp-gh-pages');

gulp.task('default', ['clean', 'browser-sync'], function() {
    gulp.start('move', 'templates', 'bs-reload');
});


gulp.task('move', function() {
        // Resources
        return gulp.src('src/resources/**/*')
            .pipe(gulp.dest("dist/resources/"));
});

gulp.task('templates', function() {
    return gulp.src('src/jade/*.jade')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(jade({
        basedir: './src/jade',
        pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('deploy', function () {
    return gulp.src("dist/**/**/*")
        .pipe(debug({title: 'gulp-gh-pages'}))
        .pipe(deploy());
});

gulp.task('clean', del.bind(null, ['dist/**/**/*', '!.*']));

gulp.task('browser-sync', function() {
        browserSync({
            server: {
                baseDir: "./dist/"
            }
        });
});

gulp.task('bs-reload', function() {
        browserSync.reload();
});
