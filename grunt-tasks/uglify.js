"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-contrib-uglify"
  ].forEach(grunt.loadNpmTasks);

  return {
    options: {
      mangle: {
        except: ["jQuery", "*.min.js"]
      }
    },
    default: {
      files: [{
        expand: true,
        cwd: "<%= config.dest %>",
        src: ["**/*.js", "!depcache.js"],
        dest: "<%= config.dest %>"
      }]
    }
  };
};