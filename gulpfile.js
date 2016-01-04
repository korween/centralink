var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');
var bulkify = require('bulkify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var vendorJS=[
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js'
];

var vendorCSS=[

];

var opts= {entries: './app/src/app.js',transform: ['bulkify']}

gulp.task('scripts', function() {
    var b = browserify(opts);
    b.transform('bulkify',{});

    var stream = b.bundle().on('error',function(err) {
        throw new Error('Could not create bundle');
        this.emit('end');
    }).pipe(source('app.js'));

    stream
        .pipe(buffer())     // We need to put our stream into a buffer
        .pipe(ngAnnotate()) // Then include angular dependencies
        .pipe(uglify())     // Then minify JS
        .pipe(gulp.dest('dist'))
        .pipe(refresh(server))
})


gulp.task('vendorJS', function() {
    gulp.src(vendorJS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function() {
    gulp.src(['app/src/styles/styles.scss'].concat(vendorCSS))
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
        .pipe(refresh(server))
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('html', function() {
    gulp.src("app/src/index.html")
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(server));

    gulp.src("app/src/views/**/*.html")
        .pipe(gulp.dest('dist/views/'))
        .pipe(refresh(server));
})

gulp.task('default', function() {
    gulp.run('vendorJS','lr-server', 'scripts', 'styles', 'html');

    gulp.watch('app/src/**', ['scripts'])
    gulp.watch('app/css/**', ['styles'])
    gulp.watch('app/**/*.html', ['html'])
})