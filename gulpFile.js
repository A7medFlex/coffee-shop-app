let gulp = require("gulp");
let sass = require("gulp-sass")(require("sass"));
let autoprefixer = require("gulp-autoprefixer");
let pug = require("gulp-pug");
let uglifyjs = require("gulp-uglify");
let concat = require("gulp-concat");
let zip = require("gulp-zip");
let miniImg = require("gulp-imagemin");
// don't forget to try to concat the pug files (home about and so on)

// auto prefixer task and sass compiling
gulp.task("Sass+Prefixing", () => {
  return gulp
    .src("dev/SASS/main.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 4 versions"))
    .pipe(gulp.dest("dist/css/"));
});
// compiling pug
gulp.task("Pug-compiling", () => {
  return gulp
    .src("dev/Pug/views/*.*")
    .pipe(pug())
    .pipe(gulp.dest("dist/"));
});
// concat and uglify js files in one file
gulp.task("js-concat-uglify", () => {
  return gulp
    .src(['dev/js/views/*.js', 'dev/js/components/*.js'])
    .pipe(concat("main.js"))
    .pipe(uglifyjs())
    .pipe(gulp.dest("dist/js/"));
});
//compress the dist folder by zipping
gulp.task("zipping", () => {
  return gulp.src("dist/**/*.*").pipe(zip("dist-zip.zip")).pipe(gulp.dest("."));
});
gulp.task("miniImg",()=>{
  return gulp.src("dev/images/*")
  .pipe(miniImg())
  .pipe(gulp.dest("dist/images/"))
})
// watching all the tasks
gulp.task("watching", () => {
  gulp.watch("dev/SASS/**/*.*", gulp.series("Sass+Prefixing"));
  gulp.watch("dev/Pug/**/*.*", gulp.series("Pug-compiling"));
  gulp.watch("dev/js/**/*.*", gulp.series("js-concat-uglify"));
  gulp.watch("dist/**/*.*", gulp.series("zipping"));
  gulp.watch("dev/images/*", gulp.series("miniImg"))
});
