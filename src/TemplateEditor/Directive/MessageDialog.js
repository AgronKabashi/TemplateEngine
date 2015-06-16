(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csMessagedialog", function () {
      return {
        restrict: "E",
        scope: true,
        template: '<div class="ng-cloak">{{ Message }}</div>',

        link: function (scope, element, attributes) {
          scope.$on("ShowMessage", function (scope, message) {
            alert(message);
          });
        }
      };
    });
})(window.angular);