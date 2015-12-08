"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-contrib-connect"
  ].forEach(grunt.loadNpmTasks);

  return {
    default: {
      options: {
        hostname: "localhost",
        livereload: true,
        open: true,
        port: 9000,
        base: "<%= config.dest %>"
      }
    }
  };
};