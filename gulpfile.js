var del     = require('del'),
    gulp    = require('gulp'),
    notify  = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    // jade
    jade    = require('gulp-jade'),
    // js
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),

    // delpoying
    deploy  = require('gulp-gh-pages'),
    debug   = require('gulp-debug');

gulp.task('default', ['clean'], function() {
    gulp.start('move', 'templates')
});


gulp.task('move', function() {
        // Resources
        gulp.src('src/resources/**/*')
            .pipe(gulp.dest("dist/resources/"))
});

gulp.task('templates', function() {
    gulp.src('src/jade/*.jade')
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
