"use strict";

module.exports = {
  default: {
    options: {
      hostname: "localhost",
      livereload: true,
      open: true,
      port: 9000,
      base: "<%= config.dest %>"
    }
  }
};