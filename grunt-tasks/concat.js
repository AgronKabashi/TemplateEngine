"use strict";

module.exports = {
  options: {
    separator: '\n'
  },
  templateEngine: {
    src: '<%= config.src %>/TemplateEngine/**/*.js',
    dest: '<%= config.dist %>/TemplateEngine/TemplateEngine.js'
  },
  templateEditor: {
    src: '<%= config.src %>/TemplateEditor/**/*.js',
    dest: '<%= config.dist %>/TemplateEditor/TemplateEditor.js'
  }
};