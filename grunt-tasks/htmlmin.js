"use strict";

module.exports = {
  default: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      caseSensitive: true
    },
    files: [{
      expand: true,
      cwd: "<%= config.dest %>",
      src: "**/*.html",
      dest: "<%= config.dest %>"
    }
    ]
  }
};