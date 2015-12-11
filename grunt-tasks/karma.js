"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-karma"
  ].forEach(grunt.loadNpmTasks);

  return {
    unit: {
      options: {
        basePath: "<%=config.dest%>",
        frameworks: ["jasmine"],
        singleRun: true,
        autoWatch: true,
        browsers: ["PhantomJS"],
        reporters: ["mocha"],
        files: [
          "../node_modules/angular/angular.js",
          "../node_modules/angular-sanitize/angular-sanitize.js",
          "../node_modules/angular-mocks/angular-mocks.js",
          "../node_modules/lodash/index.js",
          "templateengine/templateengine.js",
          "templateeditor/templateeditor.js",

          "../<%=config.test%>/**/*.js"
        ]
      }
    }
  };
};