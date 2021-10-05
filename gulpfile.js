const gulp = require("gulp"),
  asciidoctor = require("@asciidoctor/gulp-asciidoctor"),
  html2pdf = require("gulp-html2pdf"),
  clean = require("gulp-clean");

function processAdocFiles(cb) {
  gulp
    .src("docs/asciidoc/*.adoc")
    .pipe(asciidoctor({}))
    .pipe(gulp.dest("docs/asciidoc/generated-docs/"));
  cb();
}

function copyImages(cb) {
  gulp
    .src("docs/asciidoc/*.adoc")
    .pipe(gulp.dest("docs/asciidoc/generated-docs/"));
  cb();
}

function htmlToPDF(cb) {
  gulp
    .src("docs/asciidoc/generated-docs/*.html")
    .pipe(html2pdf())
    .pipe(gulp.dest("docs/asciidoc/generated-docs/"));
  cb();
}

gulp.task("clean-up-docs", function () {
  gulp.src("docs/asciidoc/generated-docs", { read: false }).pipe(clean());
});

//gulp.task("test", shell.task("npm test", { ignoreErrors: true }));

exports.asciidoc = gulp.parallel(processAdocFiles, copyImages, htmlToPDF);
