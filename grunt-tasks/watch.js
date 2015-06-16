"use strict";

module.exports = {
  options: {
    livereload: true,
    spawn: false
  },
  css: {
    files: ["<%= config.src %>/**/*.css"],
    tasks: ["newer:copy:css"]
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
    tasks: ["newer:copy:markup"]
  },
  demoScripts: {
    files: ["<%= config.src %>/**/*.js"],
    tasks: ["newer:copy:demoScripts"]
  },
  templateScripts: {
    files: ["<%= config.src %>/TemplateEditor/**/*.js", "<%= config.src %>/TemplateEngine/**/*.js"],
    tasks: ["newer:concat"]
  },
  data: {
    files: ["<%= config.src %>/**/*.json"],
    tasks: ["newer:copy:data"]
  }
};