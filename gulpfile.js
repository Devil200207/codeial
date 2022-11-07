const gulp = require("gulp");
const cssnano = require("gulp-cssnano");

const imagemin = require("gulp-imagemin");
const rev = require("gulp-rev");
const sass =  require('gulp-sass')(require('sass'));

var uglify = require('gulp-uglify');

gulp.task("scss_to_css",function(done){
    console.log("scss to css...");
    gulp.src("./assets/scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))////converting sass to css
    .pipe(cssnano())//minifying
    .pipe(gulp.dest("./assets/css"));
   done();
})

gulp.task('css', function (done)
{
    console.log('Minifying CSS...');

    gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: 'true',
        }))
        .pipe(gulp.dest('./public/assets'));
    done()
});

gulp.task("js",function(done){
    console.log('Minifying JS...');
    gulp.src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: 'true',
        }))
        .pipe(gulp.dest('./public/assets'));

    done();
});

gulp.task("images",function(done){
    console.log('Minifying IMAGES...');
    gulp.src('./assets/uploads/users/avtars/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: 'true',
        }))
        .pipe(gulp.dest('./public/assets'));

    done();
});