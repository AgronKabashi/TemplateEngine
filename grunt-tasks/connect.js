"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-contrib-connect"
  ].forEach(grunt.loadNpmTasks);

  return {
    debug: {
      options: {
        hostname: "localhost",
        livereload: true,
        open: true,
        port: 9000,
        base: "<%= config.dest %>"
      }
    },
    release: {
      options: {
        hostname: "localhost",
        livereload: false,
        open: true,
        port: 9000,
        base: "<%= config.dest %>",
        keepalive: true
      }
    }
  };
};