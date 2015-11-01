"use strict";

module.exports = function (grunt) {
  //load grunt modules
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  require("node-neat");
  require("node-bourbon");

  grunt.registerTask("build", ["clean:all", "copy", "sass", "concat"]);
  grunt.registerTask("release-build", ["build", "htmlmin", "uglify"]);
  grunt.registerTask("livereload", ["connect:livereload", "watch"]);
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
    htmlmin: require("./grunt-tasks/htmlmin"),
    eslint: require("./grunt-tasks/eslint"),
    uglify: require("./grunt-tasks/uglify"),
    replace: require("./grunt-tasks/replace"),
    sass: require("./grunt-tasks/sass"),
    watch: require("./grunt-tasks/watch")
  });
};
