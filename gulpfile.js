const gulp = require("gulp");
const asciidoctor = require("@asciidoctor/gulp-asciidoctor");

function processAdocFiles(cb) {
  gulp.src("/doc/*.adoc").pipe(asciidoctor({})).pipe(gulp.dest("/doc"));
  cb();
}

function copyImages(cb) {
  gulp.src("/doc/*.jpg").pipe(gulp.dest("/doc"));
  cb();
}

exports.default = gulp.parallel(processAdocFiles, copyImages);
