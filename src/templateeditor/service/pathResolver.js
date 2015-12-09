(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.PathResolver", [
      "templateEditorPath",
      function (appPath) {
        this.resolve = function (path) {
          return appPath + path;
        };
      }
    ]);
})(window.angular);