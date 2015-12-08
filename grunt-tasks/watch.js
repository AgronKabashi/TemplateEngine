"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-contrib-watch"
  ].forEach(grunt.loadNpmTasks);

  return {
    options: {
      livereload: true,
      spawn: false
    },
    sass: {
      files: ["<%= config.src %>/**/*.scss"],
      tasks: ["sass"]
    },
    images: {
      files: ["<%= config.src %>/**/*.{png,jpg}"],
      tasks: ["newer:copy:images"]
    },
    markup: {
      files: ["<%= config.src %>/**/*.html"],
      tasks: ["concat", "ngtemplates"]
    },
    demoScripts: {
      files: ["<%= config.src %>/**/*.js"],
      tasks: ["newer:copy:demoScripts"]
    },
    templateScripts: {
      files: ["<%= config.src %>/templateeditor/**/*.js", "<%= config.src %>/templateengine/**/*.js"],
      tasks: ["concat", "ngtemplates"]
    },
    data: {
      files: ["<%= config.src %>/**/*.json"],
      tasks: ["newer:copy:data"]
    }
  };
};