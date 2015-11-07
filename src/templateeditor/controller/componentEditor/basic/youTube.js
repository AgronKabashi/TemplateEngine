(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .controller("Cerberus.TemplateEditor.Controller.ComponentEditor.Basic.YouTube", [
      "$scope",
      function ($scope) {
        $scope.modelOptions = {
          updateOn: "blur"
        };
      }
    ]);
})(window.angular);