(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csAutosizetemplate", [
      "$timeout",
      "Cerberus.TemplateEngine.Service.Event",
      function ($timeout, EventService) {
        return {
          restrict: "A",
          link: function (scope, element) {
            var templateElement = element;

            function updateTemplateHeight(component, isSecondExecution) {
              var scrollTop = templateElement.parent().scrollTop();
              templateElement.css("height", "auto");

              var height = templateElement.get(0).scrollHeight + "px";

              templateElement.css("height", height);
              templateElement.parent().scrollTop(scrollTop);

              //HACK!
              //Because of CSS transitions, some elements are not fully transformed after their properties are changed so detecting the height
              //can be tricky. By calling the method again, only 400ms later we can assume that the transition has finished and recalculate the height
              if (!isSecondExecution) {
                $timeout(function () {
                  updateTemplateHeight(component, true);
                }, 400);
              }
            }

            EventService.subscribe([
              "ComponentAdded",
              "ComponentUpdated",
              "ComponentPositionUpdated",
              "ComponentSizeUpdated",
              "ComponentsRemoved",
              "ResolutionSelected",
              "ComponentContentUpdated"], updateTemplateHeight);
          }
        };
      }
    ]);
})(window.angular);