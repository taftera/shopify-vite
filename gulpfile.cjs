const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

const assetFileNames = ["./assets/component-card.css"];

function minifyCSS() {
  return gulp
    .src(assetFileNames)
    .pipe(cleanCSS())
    .pipe(
      rename(function (path) {
        path.basename += ".min";
      }),
    )
    .pipe(gulp.dest("./assets/"));
}

gulp.task("minify-css", minifyCSS);

gulp.task("watch", () => {
  gulp.watch(assetFileNames, minifyCSS);
});

gulp.task("default", gulp.series("minify-css", "watch"));
