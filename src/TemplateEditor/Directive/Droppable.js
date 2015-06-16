(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
		.directive("csDroppable", [
      "Cerberus.TemplateEngine.Service.Event",
      function (EventService) {
        return {
          restrict: "A",
          link: function (scope, element, attributes) {
            element.droppable({
              accept: ".component-plugin",
              drop: function (event, ui) {
                var componentPluginInfo = ui.draggable.data("component-plugin-info");

                var element = $(this);
                var x = ui.offset.left - element.offset().left + componentPluginInfo.CursorAt.left;
                var y = ui.offset.top - element.offset().top + componentPluginInfo.CursorAt.top;

                EventService.Notify("AddComponent", angular.extend(componentPluginInfo.ComponentInfo, {
                  VisualProperties: String.format("left:{0}px;top:{1}px;", ~~x, ~~y)
                }));
              }
            });
          }
        };
      }
		]);
})(window.angular);