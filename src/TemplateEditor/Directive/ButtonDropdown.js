(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
		.directive("csButtondropdown", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolver) {
        return {
          restrict: "E",
          transclude: true,
          scope: {
            disabled: "=",
            datasource: "=",
            onCommandClick: "=",
            onItemClick: "=",
            buttonclick: "=",
            limit: "=?",
            datatextfield: "@"
          },
          templateUrl: function (element, scope) {
            return PathResolver.Resolve(scope.onCommandClick ? "View/ButtonDropdown_CommandButton.html" : "View/ButtonDropdown.html");
          },
          controller: [
            "$scope",
            function ($scope) {
              $scope.limit = $scope.limit || ($scope.datasource ? $scope.datasource.length : 0);
              $scope.ItemClick = function (item) {
                $scope.onItemClick(item);
                $scope.Expanded = false;
              }
            }
          ]
        };
      }
		]);
})(window.angular);