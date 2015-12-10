"use strict";

module.exports = function (grunt) {
  [
    "grunt-lodash-autobuild"
  ].forEach(grunt.loadNpmTasks);

  return {
    default: {
      src: ["<%= config.src %>/**/*.js"],
      options: {
        // Set to the configured lodash task options.include
        lodashConfigPath: "lodash.build.options.include",
        lodashObjects: ["_"],
        lodashTargets: ["build"]
      }
    }
  };
};