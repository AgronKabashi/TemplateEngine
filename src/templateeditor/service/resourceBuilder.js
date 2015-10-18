(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.ResourceBuilder", [
      "templateEditorPath",
      function (templateEditorPath) {
        this.BuildResource = function () {
          return angular.extend([], arguments).slice(0).join("/");
        };
      }
    ]);
})(window.angular);