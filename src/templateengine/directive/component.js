(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .directive("csComponent", [
      function () {
        return {
          restrict: "E",
          link: function (scope, element) {
            var component = scope.component;

            element.attr({
              id: "TC" + component.id,
              class: component.name.toLowerCase()
            });
          },

          controller: [
            "$scope",
            "$controller",
            function ($scope, $controller) {
              $controller($scope.component.componentType, { "$scope": $scope });
            }
          ]
        };
      }
    ]);
})(window.angular);