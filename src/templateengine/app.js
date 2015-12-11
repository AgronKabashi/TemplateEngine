(function (angular, define, document) {
  "use strict";

  var scriptElements = document.getElementsByTagName("script"),
    thisElement = scriptElements[scriptElements.length - 1],
    documentLocation = document.location.origin.substr(0, document.location.href.lastIndexOf("/") + 1),
    scriptPath = thisElement.src.substr(0, thisElement.src.lastIndexOf("/") + 1).replace(documentLocation, "");

  var app = angular
    .module("Cerberus.TemplateEngine", ["ngSanitize", "Cerberus.ModelFactory"])
    .constant("templateEnginePath", scriptPath);

  if (define && define.amd) {
    define([], app);
  }
})(window.angular, window.define, window.document);