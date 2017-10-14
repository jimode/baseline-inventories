const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');

const sassSources = [
    'node_modules/bootstrap/scss/bootstrap.scss', 
    'public/scss/*.scss'
]

const jsSources = [
    'node_modules/bootstrap/dist/js/bootstrap.min.js', 
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/propellerkit/dist/js/propeller.min.js'
]

// Compile Sass & Inject Into Browser
gulp.task('sass', function () {
    return gulp.src(sassSources)
        .pipe(sass()
            .on('error', gutil.log))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to public/js
gulp.task('js', function() {
    return gulp.src(jsSources)
        .pipe(gulp.dest("public/js"))
        .pipe(browserSync.stream());
});

// Nodemon
gulp.task('nodemon', 
    [],
    function(done) {
        var running = false;

        return nodemon({
            script: 'app.js',
            watch: ['app.js', 'views/**/*.*']
        })
        .on('start', function() {
            if(!running) {
                done();
            }
            running = true;
        })
        .on('restart', function() {
            setTimeout(function () {
                browserSync.reload();
            }, 500);
        });
    }
);

// Watch Sass, Nodemon & Server
// Note there is no public/*.html files to watch.
gulp.task('serve', ['sass', 'nodemon'], function(){
    browserSync.init({
        // server: "./public"
        proxy: 'http://localhost:4000',
        port: 3000
    });

    gulp.watch(sassSources, ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Move Fonts Folder to public
gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("public/fonts"));
});

// Move Propeller Fonts Folder to public
gulp.task('prop-fonts', function(){
    return gulp.src('node_modules/propellerkit/dist/fonts/roboto/*')
        .pipe(gulp.dest("public/fonts"));
});

// Move Propeller Kit CSS to public/css
gulp.task('prop-css', function(){
    return gulp.src('node_modules/propellerkit/dist/css/propeller.min.css')
        .pipe(gulp.dest("public/css"));
});

// Move Fonts Awesome & Propeller Kit CSS to public/css
gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("public/css"));
});

// Gulp util to log stuff onto the console
gulp.task('log', function(){
    gutil.log("Jimi - the workflow is working");
});

gulp.task('default', ['js', 'serve', 'fa', 'prop-css', 'fonts', 'prop-fonts']);