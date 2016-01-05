var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var less = require('gulp-less');
var clean = require('gulp-clean');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');
var bulkify = require('bulkify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var server = lr();


/* Vendor JS files are compiled and resolved by browserify */

var vendorJS = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js'
];

/* Vendor CSS files are minified into vendor.css and placed into dist/assets/css/vendor.css */

var vendorCSS = [
    './node_modules/flat-ui/bootstrap/css/bootstrap.css',
    //'./node_modules/flat-ui/css/flat-ui.css'
];

/* Vendor assets are copied as is into dist/assets/ */

var vendorAssets = [
    './node_modules/flat-ui/fonts/**/*'
]

/* This part looks hackish but it's actually pretty clean for what it does */

gulp.task('scripts', function() {
    var opts= {entries: './app/src/app.js',transform: ['bulkify']}
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
    gulp.src(['app/src/styles/styles.scss'])
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(refresh(server))
})

/*
   This is custom, it allows to change the colors provided by flat-ui manually
   The new file has not been included into vendor.js, to prevent confusion
   and avoid things like merging streams. You'll thank me later.
*/

gulp.task('flatUILess',function() {
    /* Question: why don't those run in async and throw an error? */
    gulp.src([
        './node_modules/flat-ui/less/**/*',
        '!./node_modules/flat-ui/less/variables.less',
        './app/vendor/variables.less'
    ]).pipe(gulp.dest('./tmp/'));

    gulp.src('./tmp/flat-ui.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(refresh(server))

    /* Answer: no idea. Gulp might use WriteFileSync after all :) */
})

gulp.task('vendorCSS',function() {
    gulp.src(vendorCSS)
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(refresh(server))
    })

gulp.task('vendorAssets',function() {
    /* Hacking again? */
    var assetPath;
    for(var a in vendorAssets) {
        assetPath = vendorAssets[a].split('\*')[0].split('/');
        assetPath.pop();
        assetPath.pop();
        assetPath=assetPath.join('/');

        gulp.src(vendorAssets[a],{'base':assetPath})
            .pipe(gulp.dest('./dist/assets/'))
    }
    /* Yup */
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
    gulp.run('flatUILess','vendorAssets','vendorCSS','vendorJS','lr-server', 'scripts', 'styles', 'html');

    gulp.watch('app/src/**', ['scripts'])
    gulp.watch('app/vendor/variables.less', ['flatUILess'])
    gulp.watch('app/css/**', ['styles'])
    gulp.watch('app/**/*.html', ['html'])
})