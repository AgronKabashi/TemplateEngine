"use strict";

module.exports = function (grunt) {
  //load grunt modules
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  require("node-neat");
  require("node-bourbon");

  grunt.registerTask("build", ["clean", "copy", "sass", "concat"]);
  grunt.registerTask("release-build", ["build", "htmlmin", "uglify"]);
  grunt.registerTask("livereload", ["connect", "watch"]);
  grunt.registerTask("default", ["build", "livereload"]);
  grunt.registerTask("release", ["release-build", "livereload"]);

  grunt.initConfig({
    config: {
      src: "src",
      dest: "dest"
    },
    clean: require("./grunt-tasks/clean"),
    concat: require("./grunt-tasks/concat"),
    connect: require("./grunt-tasks/connect"),
    copy: require("./grunt-tasks/copy"),
    eslint: require("./grunt-tasks/eslint"),
    htmlmin: require("./grunt-tasks/htmlmin"),
    replace: require("./grunt-tasks/replace"),
    sass: require("./grunt-tasks/sass"),
    uglify: require("./grunt-tasks/uglify"),
    watch: require("./grunt-tasks/watch")
  });
};
