(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csUnitfield", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolverService) {
        return {
          restrict: "E",
          scope: {
            model: "=",
            isAngularUnit: "=",
            placeholder: "@"
          },
          templateUrl: PathResolverService.resolve("view/unitField.html")
        };
      }
    ]);
})(window.angular);