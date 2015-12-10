"use strict";

module.exports = function (grunt) {
  [
    "grunt-contrib-clean"
  ].forEach(grunt.loadNpmTasks);

  return {
    default: ["<%= config.dest %>/**/*"],
    temp: ["<%= config.temp %>"]
  };
};