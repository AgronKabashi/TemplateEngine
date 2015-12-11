"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-sass"
  ].forEach(grunt.loadNpmTasks);

  return {
    dest: {
      options: {
        includePaths: require("node-neat").includePaths,
        outputStyle: "compressed"
      },
      files: [{
        expand: true,
        cwd: "<%= config.src %>",
        src: "**/*.scss",
        dest: "<%= config.dest %>",
        ext: ".css"
      }]
    }
  };
};