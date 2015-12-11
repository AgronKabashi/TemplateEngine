"use strict";

module.exports = function  (grunt) {
  // Dependencies
  [
    "grunt-newer"
  ].forEach(grunt.loadNpmTasks);

  grunt.registerTask("buildLibraries", ["lodashAutobuild"]);
  grunt.registerTask("build", ["clean", "copy", "sass", "buildLibraries", "concat", "ngtemplates", "clean:temp"]);
  grunt.registerTask("livereload", ["connect:debug", "watch"]);
  grunt.registerTask("release-build", ["build", "uglify:default"]);
  grunt.registerTask("release", ["release-build", "connect:release"]);
  grunt.registerTask("test", ["build", "karma"]);
  grunt.registerTask("default", ["build", "livereload"]);

  grunt.initConfig({
    config: {
      src: "src",
      dest: "dest",
      temp: "dest/temp",
      test: "tests"
    },
    clean: require("./grunt-tasks/clean")(grunt),
    concat: require("./grunt-tasks/concat")(grunt),
    connect: require("./grunt-tasks/connect")(grunt),
    copy: require("./grunt-tasks/copy")(grunt),
    eslint: require("./grunt-tasks/eslint")(grunt),
    karma: require("./grunt-tasks/karma")(grunt),
    lodash: require("./grunt-tasks/lodash")(grunt),
    lodashAutobuild: require("./grunt-tasks/lodashAutobuild")(grunt),
    ngtemplates: require("./grunt-tasks/ngtemplates")(grunt),
    sass: require("./grunt-tasks/sass")(grunt),
    uglify: require("./grunt-tasks/uglify")(grunt),
    watch: require("./grunt-tasks/watch")(grunt)
  });
};
