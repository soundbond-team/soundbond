const gulp = require("gulp");
const asciidoctor = require("@asciidoctor/gulp-asciidoctor");
const coveralls = require("gulp-coveralls");
const puml = require("gulp-puml");

function processAdocFiles(cb) {
  gulp.src("/doc/*.adoc").pipe(asciidoctor({})).pipe(gulp.dest("doc/"));
  cb();
}

function copyImages(cb) {
  gulp.src("/doc/*.jpg").pipe(gulp.dest("doc/"));
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

exports.default = gulp.parallel(processAdocFiles, copyImages, generatePuml);
