(function (angular, _) {
  "use strict";

  function GetComponentModels(selectedElements) {
    var result = new Array(selectedElements.length);

    _.forEach(selectedElements, function (element, index) {
      result[index] = angular.element(element).scope().Component;
    });

    return result;
  }

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csComponentselection", [
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEditor.Helper.TemplateEditor",
      function (EventService, TemplateEditorHelper) {
        return {
          restrict: "A",
          link: function (scope, element, attributes) {
            element
              .addClass("animatable")
              .click(function (event) {
                var element = $(event.target);
                var elementTagName = event.target.tagName.toLowerCase();

                //Do not deselect components if the user is switching between resolutions
                if (element.hasClass("resolution")) {
                  return;
                }

                var selectedElements = $("cs-component.selected");
                if (!event.ctrlKey) {
                  selectedElements
                    .removeClass("selected")
                    .resizable("destroy")
                    .draggable("destroy");
                  selectedElements = [];
                }

                if (elementTagName === "cs-component") {
                  var isSelected = element.hasClass("selected");

                  //toggle selected class on element
                  element.toggleClass("selected", !isSelected);

                  if (!isSelected) {
                    selectedElements.push(element);
                    TemplateEditorHelper.EnableDraggable(element);
                    TemplateEditorHelper.EnableResizable(element);
                  }
                  else {
                    element
                      .resizable("destroy")
                      .draggable("destroy");
                  }
                }

                var selectedComponents = GetComponentModels(selectedElements);
                EventService.Notify("ComponentSelected", selectedComponents);
              });
          }
        };
      }]);
})(window.angular, window._);