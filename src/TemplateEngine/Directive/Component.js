(function (angular) {
  angular
    .module("Cerberus.TemplateEngine")
    .directive("csComponent", [
      "$controller",
      function ($controller) {
        return {
          restrict: "E",
          link: function (scope, element, attributes) {
            var component = scope.Component;

            element.attr({
              id: "TC" + component.Id,
              class: component.Name.toLowerCase()
            });
          },

          controller: [
            "$scope",
            "$controller",
            function ($scope, $controller) {
              $controller($scope.Component.ComponentType, { "$scope": $scope });
            }
          ]
        };
      }
    ]);
})(window.angular);