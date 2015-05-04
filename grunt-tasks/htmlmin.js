"use strict";

module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      caseSensitive: true
    },
    files: [{
      expand: true,
      cwd: "<%= config.dist %>",
      src: "**/*.html",
      dest: "<%= config.dist %>"
    }
    ]
  }
};