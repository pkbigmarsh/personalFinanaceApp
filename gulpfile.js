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
    gulp.start('plugins', 'css', 'js', 'templates');

    gulp.watch("src/resources/js/**/*.js", ['js']);
    gulp.watch("src/jade/**/**/*.jade", ['templates']);
    gulp.watch("*src/resources/js/.css", ['css']);
});


gulp.task('plugins', function() {
    // Resources
    return gulp.src('src/resources/plugins/**/*')
        .pipe(gulp.dest("dist/resources/plugins/"));
});

gulp.task('css', function () {
    return gulp.src('src/resources/css/**/*')
        .pipe(gulp.dest("dist/resources/css/"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
    return gulp.src('src/resources/js/**/*')
        .pipe(gulp.dest("dist/resources/js/"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('templates', function() {
    return gulp.src('src/jade/*.jade')
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
    .pipe(jade({
        basedir: './src/jade',
        pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}));
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
