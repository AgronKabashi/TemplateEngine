(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.PathResolver", [
      "templateEditorPath",
      function (modulePath) {
        this.resolve = function (path) {
          return String.format("{0}{1}", modulePath, path);
        };
      }
    ]);
})(window.angular);