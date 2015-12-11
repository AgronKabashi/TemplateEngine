(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csButtondropdown", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolverService) {
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
            return PathResolverService.resolve(scope.onCommandClick ? "view/buttonDropdown_CommandButton.html" : "view/buttonDropdown.html");
          },
          controller: [
            "$scope",
            function ($scope) {
              $scope.itemLimit = $scope.limit || ($scope.datasource ? $scope.datasource.length : 0);
              $scope.itemClick = function (item) {
                $scope.onItemClick(item);
                $scope.expanded = false;
              };
            }
          ]
        };
      }
    ]);
})(window.angular);