(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csTogglehiddenelements", [
      "Cerberus.TemplateEngine.Service.Event",
      function (EventService) {
        return {
          restrict: "A",
          link: function (scope, element) {
            EventService.subscribe("ShowHiddenElements", function (enable) {
              element.toggleClass("show-hidden-elements", enable);
            });
          }
        };
      }
    ]);
})(window.angular);