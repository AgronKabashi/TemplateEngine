"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-contrib-concat"
  ].forEach(grunt.loadNpmTasks);

  return {
    options: {
      separator: "\n",
      banner: "'use strict';\n",
      process: function (src, filepath) {
        return "// Source: " + filepath + "\n" +
          src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, "$1");
      }
    },
    templateEngine: {
      src: [
        "<%= config.src %>/templateengine/modelFactory.js",
        "<%= config.src %>/templateengine/app.js",
        "<%= config.src %>/templateengine/utility.js",
        "<%= config.src %>/templateengine/**/*.js"
      ],
      dest: "<%= config.dest %>/templateengine/templateengine.js"
    },
    templateEditor: {
      src: "<%= config.src %>/templateeditor/**/*.js",
      dest: "<%= config.dest %>/templateeditor/templateeditor.js"
    }
  };
};