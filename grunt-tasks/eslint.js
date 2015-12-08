"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-eslint"
  ].forEach(grunt.loadNpmTasks);

  return {
    options: {
      configFile: ".eslintrc",
      globals: ["window", "angular", "Cerberus", "setTimeout", "console", "namespace"]
    },
    target: [
      "src/templateengine/**/*.js"
    ]
  };
};