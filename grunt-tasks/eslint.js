"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-eslint"
  ].forEach(grunt.loadNpmTasks);

  return {
    options: {
      configFile: ".eslintrc"
    },
    source: {
      options: {
        envs: [
          "browser",
          "jquery"
        ],
        globals: ["angular", "tryParseInt", "tryParseFloat"]
      },
      src: [
        "src/**/*.js",
        "!src/depcache.js"
      ]
    }
  };
};