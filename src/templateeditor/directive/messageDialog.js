(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csMessagedialog", function () {
      return {
        restrict: "E",
        scope: true,
        template: '<div class="ng-cloak">{{ Message }}</div>',

        link: function () {
          // TODO:
          // scope.$on("ShowMessage", function (scope, message) {
          //   window.alert(message);
          // });
        }
      };
    });
})(window.angular);