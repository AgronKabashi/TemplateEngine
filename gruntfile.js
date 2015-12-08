"use strict";

module.exports = function  (grunt) {
  // Dependencies
  [
    "grunt-newer"
  ].forEach(grunt.loadNpmTasks);

  grunt.registerTask("build", ["clean", "copy", "sass", "concat", "ngtemplates"]);
  grunt.registerTask("livereload", ["connect", "watch"]);
  grunt.registerTask("release-build", ["build", "htmlmin", "uglify"]);
  grunt.registerTask("release", ["release-build", "livereload"]);
  grunt.registerTask("test", ["build", "karma"]);
  grunt.registerTask("default", ["build", "livereload"]);

  grunt.initConfig({
    config: {
      src: "src",
      dest: "dest",
      test: "tests"
    },
    clean: require("./grunt-tasks/clean")(grunt),
    concat: require("./grunt-tasks/concat")(grunt),
    connect: require("./grunt-tasks/connect")(grunt),
    copy: require("./grunt-tasks/copy")(grunt),
    eslint: require("./grunt-tasks/eslint")(grunt),
    htmlmin: require("./grunt-tasks/htmlmin")(grunt),
    karma: require("./grunt-tasks/karma")(grunt),
    ngtemplates: require("./grunt-tasks/ngtemplates")(grunt),
    sass: require("./grunt-tasks/sass")(grunt),
    uglify: require("./grunt-tasks/uglify")(grunt),
    watch: require("./grunt-tasks/watch")(grunt)
  });
};
