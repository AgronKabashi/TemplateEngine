"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-contrib-htmlmin"
  ].forEach(grunt.loadNpmTasks);

  return {
    default: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        caseSensitive: true
      },
      files: [{
        expand: true,
        cwd: "<%= config.dest %>",
        src: "*.html",
        dest: "<%= config.dest %>"
      }]
    }
  };
};