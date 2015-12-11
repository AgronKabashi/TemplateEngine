"use strict";

module.exports = function (grunt) {
  // Dependencies
  [
    "grunt-angular-templates"
  ].forEach(grunt.loadNpmTasks);

  return {
    options: {
      append: true,
      htmlmin: {
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,

        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        caseSensitive: true
      }
    },
    templateEngine: {
      src: "<%=config.src%>/templateengine/**/*.html",
      dest: "<%=concat.templateEngine.dest%>",
      options: {
        bootstrap: function (module, script) {
          script = script.replace(/'{{placeholder}}\//g, "templateEnginePath + '");

          return "\n(function (angular){angular.module('" + module + "').run(['$templateCache','templateEnginePath', function ($templateCache,templateEnginePath){\n" + script + "}]);\n})(window.angular);";
        },
        module: "Cerberus.TemplateEngine",
        prefix: "{{placeholder}}",
        url: function (url) {
          return url.replace(grunt.config.get("config.src") + "/templateengine/", "");
        }
      }
    },
    templateEditor: {
      src: "<%=config.src%>/templateeditor/**/*.html",
      dest: "<%=concat.templateEditor.dest%>",
      options: {
        bootstrap: function (module, script) {
          script = script.replace(/'{{placeholder}}\//g, "templateEditorPath + '");

          return "\n(function (angular){angular.module('" + module + "').run(['$templateCache','templateEditorPath',function ($templateCache,templateEditorPath){\n" + script + "}]);\n})(window.angular);";
        },
        module: "Cerberus.TemplateEditor",
        prefix: "{{placeholder}}",
        url: function (url) {
          return url.replace(grunt.config.get("config.src") + "/templateeditor/", "");
        }
      }
    }
  };
};