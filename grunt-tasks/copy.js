"use strict";

module.exports = {
  fonts: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.{ttf,woff,eot}",
      dest: "<%= config.dest %>"
    }]
  },
  css: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.css",
      dest: "<%= config.dest %>"
    }]
  },
  images: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.{jpg,png}",
      dest: "<%= config.dest %>"
    }]
  },
  demoScripts: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "*.js",
      dest: "<%= config.dest %>"
    }]
  },
  markup: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.html",
      dest: "<%= config.dest %>"
    }]
  },
  data: {
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.json",
      dest: "<%= config.dest %>"
    }]
  }
};