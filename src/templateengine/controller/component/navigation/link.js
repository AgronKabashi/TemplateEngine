(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Navigation.Link", [
      "$scope",
      function ($scope) {
        $scope.content = $scope.component.content;
      }
    ]);
})(window.angular);