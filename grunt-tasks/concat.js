"use strict";

module.exports = {
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
      "<%= config.src %>/TemplateEngine/App.js",
      "<%= config.src %>/TemplateEngine/Utility.js",
      "<%= config.src %>/TemplateEngine/**/*.js"
    ],
    dest: "<%= config.dist %>/TemplateEngine/TemplateEngine.js"
  },
  templateEditor: {
    src: "<%= config.src %>/TemplateEditor/**/*.js",
    dest: "<%= config.dist %>/TemplateEditor/TemplateEditor.js"
  }
};