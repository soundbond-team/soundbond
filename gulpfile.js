const gulp = require("gulp"),
  asciidoctor = require("@asciidoctor/gulp-asciidoctor"),
  coveralls = require("gulp-coveralls"),
  puml = require("gulp-puml"),
  jshint = require("gulp-jshint"),
  html2pdf = require("gulp-html2pdf");

function processAdocFiles(cb) {
  gulp.src("doc/*.adoc").pipe(asciidoctor({})).pipe(gulp.dest("doc/"));
  cb();
}

function copyImages(cb) {
  gulp.src("doc/*.html").pipe(gulp.dest("doc/"));
  cb();
}

function htmlToPDF(cb) {
  gulp.src("doc/sb.html").pipe(html2pdf()).pipe(gulp.dest("doc/"));
  cb();
}

function coverAlls(cb) {
  gulp.src("test/coverage/**/lcov.info").pipe(coveralls());
  cb();
}

function generatePuml(cb) {
  gulp.src("doc/*.puml").pipe(puml()).pipe(gulp.dest("doc/"));
  cb();
}

gulp.task("lint", function () {
  return gulp
    .src("./**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("YOUR_REPORTER_HERE"));
});

exports.default = gulp.parallel(processAdocFiles, copyImages, htmlToPDF);
