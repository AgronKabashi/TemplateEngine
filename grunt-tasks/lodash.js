"use strict";

module.exports = function (grunt) {
  [
    "grunt-lodash"
  ].forEach(grunt.loadNpmTasks);

  return {
    build: {
      dest: "<%= config.temp %>/lodash.build.min.js",
      options: {
        modifier: "strict",
        exports: "global",
        "iife": "!function(window,undefined){%output%}(this)",
        flags: ["--production"]
      }
    }
  };
};