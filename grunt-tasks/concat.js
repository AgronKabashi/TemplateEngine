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
    },
    libraries: {
      options: {
        banner: ""
      },
      src: [
        "node_modules/jquery/dist/jquery.min.js",
        "lib/jquery-ui.min.js",
        "node_modules/angular/angular.min.js",
        "node_modules/angular-sanitize/angular-sanitize.min.js",
        "node_modules/angular-ui-router/release/angular-ui-router.min.js",
        "<%= lodash.build.dest %>"
      ],
      dest: "<%=config.dest%>/depcache.js"
    }
  };
};