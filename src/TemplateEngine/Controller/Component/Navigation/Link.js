(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Navigation.Link", [
      "$scope",
      function ($scope) {
        $scope.Content = $scope.Component.Content;
      }
    ]);
})(window.angular);