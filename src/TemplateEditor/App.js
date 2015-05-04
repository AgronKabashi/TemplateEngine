(function (angular, define) {
  "use strict";

  var scriptElements = document.getElementsByTagName('script'),
    thisElement = scriptElements[scriptElements.length - 1],
    scriptPath = thisElement.src.substr(0, thisElement.src.lastIndexOf('/') + 1);

  var app = angular
    .module("Cerberus.TemplateEditor", ["Cerberus.TemplateEngine"])
    .constant("TemplateEditorPath", scriptPath)
    .service("Cerberus.TemplateEditor.Service.PathResolver", [
		  "TemplateEditorPath",
		  function (appPath) {
		    this.Resolve = function (path) {
		      return String.format("{0}/{1}", appPath, path);
		    };
		  }
  ]);

  if (define && define.amd) {
    define([], app);
  }
})(window.angular, window.define);