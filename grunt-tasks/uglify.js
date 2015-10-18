"use strict";

module.exports = {
  options: {
    mangle: {
      except: ["jQuery", "*.min.js"]
    }
  },
  default: {
    files: [{
      expand: true,
      cwd: "<%= config.dest %>",
      src: "**/*.js",
      dest: "<%= config.dest %>"
    }]
  }
};