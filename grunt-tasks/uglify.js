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
      cwd: "<%= config.dist %>",
      src: "**/*.js",
      dest: "<%= config.dist %>"
    }
    ]
  }
};