"use strict";

module.exports = {
  inject_apiUrl: {
    options: {
      patterns: [{
        match: "APIURL",
        replacement: "<%= config.apiUrl %>"
      }
      ]
    },
    files: [{
      expand: true,
      flatten: true,
      src: ["<%= config.dest %>/templateeditor/app.js"],
      dest: "<%= config.dest %>/templateeditor"
    }
    ]
  }
};