(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .controller("Cerberus.TemplateEditor.Controller.ComponentEditor.Basic.Video", [
      "$scope",
      function ($scope) {
        $scope.modelOptions = {
          updateOn: "blur"
        };
      }
    ]);
})(window.angular);