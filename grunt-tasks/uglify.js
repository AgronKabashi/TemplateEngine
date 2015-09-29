"use strict";

module.exports = {
  options: {
    mangle: {
      except: ["jQuery", "*.min.js"]
    }
  },
  all: {
    files: [{
      expand: true,
      cwd: "<%= config.dest %>",
      src: "**/*.js",
      dest: "<%= config.dest %>"
    }
    ]
  }
};