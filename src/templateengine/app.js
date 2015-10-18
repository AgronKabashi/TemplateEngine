(function (angular, define) {
  "use strict";

  var scriptElements = window.document.getElementsByTagName("script"),
    thisElement = scriptElements[scriptElements.length - 1],
    scriptPath = thisElement.src.substr(0, thisElement.src.lastIndexOf("/") + 1);

  var app = angular
    .module("Cerberus.TemplateEngine", ["ngSanitize", "Cerberus.ModelFactory"])
    .constant("templateEnginePath", scriptPath)
    .service("Cerberus.TemplateEngine.Service.PathResolver", [
      "templateEnginePath",
      function (appPath) {
        this.resolve = function (path) {
          return String.format("{0}{1}", appPath, path);
        };
      }
    ]);

  if (define && define.amd) {
    define([], app);
  }
})(window.angular, window.define);