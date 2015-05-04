(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
		.directive("csComponentplugins", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolver) {
        return {
          restrict: "E",
          scope: true,
          templateUrl: PathResolver.Resolve("View/ComponentPlugins.html"),

          link: function (scope, element, attrs) {
            //TODO: Remove watch after single use
            var singleWatch = scope.$watch("ComponentPlugins", function () {
              singleWatch();

              var cursorAt = { left: 0, top: 0 };
              element
                .find(".component-plugin")
                .draggable({
                  helper: "clone",
                  "cursorAt": cursorAt,

                  start: function () {
                    var componentPluginElement = $(this);
                    componentPluginElement.data("component-plugin-info", {
                      ComponentInfo: {
                        ComponentType: componentPluginElement.attr("data-control-type"),
                        Category: componentPluginElement.attr("data-control-category"),
                        Name: componentPluginElement.attr("data-name")
                      },
                      CursorAt: cursorAt
                    });

                    scope.IsExpanded = false;
                    scope.$digest();
                  }
                });
            });
          },

          controller: [
            "$scope",
            "TemplateEditorPath",
            "Cerberus.TemplateEngine.Service.Template",
            function ($scope, TemplateEditorPath, TemplateEngineService) {
              TemplateEngineService.GetComponentPlugins()
                .then(function (componentPlugins) {
                  $scope.ComponentPlugins = componentPlugins;
                  $scope.ApplicationBasePath = TemplateEditorPath;
                });
            }
          ]
        };
      }
		]);
})(window.angular);