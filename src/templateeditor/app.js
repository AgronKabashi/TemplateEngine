(function (angular, window) {
  "use strict";

  var scriptElements = window.document.getElementsByTagName('script'),
    thisElement = scriptElements[scriptElements.length - 1],
    documentLocation = window.document.location.origin.substr(0, document.location.href.lastIndexOf("/") + 1),
    scriptPath = thisElement.src.substr(0, thisElement.src.lastIndexOf("/") + 1).replace(documentLocation, "");

  var app = angular
    .module("Cerberus.TemplateEditor", ["Cerberus.TemplateEngine"])
    .constant("templateEditorPath", scriptPath);

  if (window.define && window.define.amd) {
    window.define([], app);
  }
})(window.angular, window);