"use strict";

module.exports = {
  dist: {
    options: {
      includePaths: require("node-neat").includePaths,
      outputStyle: "compressed"
    },
    files: [{
      expand: true,
      cwd: "<%= config.src %>",
      src: "**/*.scss",
      dest: "<%= config.dist %>",
      ext: ".css"
    }
    ]
  }
};