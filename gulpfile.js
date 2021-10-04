const gulp = require("gulp"),
  asciidoctor = require("@asciidoctor/gulp-asciidoctor"),
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

exports.asciidoc = gulp.parallel(processAdocFiles, copyImages, htmlToPDF);
