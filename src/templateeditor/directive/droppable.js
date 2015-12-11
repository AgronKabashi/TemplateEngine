(function (angular, $) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csDroppable", [
      "Cerberus.TemplateEngine.Service.Event",
      function (EventService) {
        return {
          restrict: "A",
          link: function (scope, element) {
            element.droppable({
              accept: ".component-plugin",
              drop: function (event, ui) {
                var componentPluginInfo = ui.draggable.data("component-plugin-info");

                var droppedElement = $(this);
                var x = ui.offset.left - droppedElement.offset().left + componentPluginInfo.cursorAt.left;
                var y = ui.offset.top - droppedElement.offset().top + componentPluginInfo.cursorAt.top;

                EventService.notify("AddComponent", angular.extend(componentPluginInfo.componentInfo, {
                  visualProperties: String.format("left:{0}px;top:{1}px;", ~~x, ~~y)
                }));
              }
            });
          }
        };
      }
    ]);
})(window.angular, window.jQuery);