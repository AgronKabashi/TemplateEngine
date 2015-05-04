"use strict";

module.exports = {
  fonts: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.{ttf,woff,eot}",
      dest: "<%= config.dist %>"
    }]
  },
  css: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.css",
      dest: "<%= config.dist %>"
    }]
  },
  images: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.{jpg,png}",
      dest: "<%= config.dist %>"
    }]
  },
  demoScripts: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "*.js",
      dest: "<%= config.dist %>"
    }]
  },
  markup: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.html",
      dest: "<%= config.dist %>"
    }]
  },
  data: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.json",
      dest: "<%= config.dist %>"
    }]
  }
};