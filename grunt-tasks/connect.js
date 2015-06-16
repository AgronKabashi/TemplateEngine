"use strict";

module.exports = {
  options: {
    port: 9000,
    livereload: true,
    // change this to "0.0.0.0" to access the server from outside
    hostname: "localhost"
  },
  livereload: {
    options: {
      open: true,
      base: ["<%= config.dist %>"]
    }
  }
};