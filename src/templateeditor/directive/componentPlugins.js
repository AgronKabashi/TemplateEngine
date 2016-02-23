(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csComponentplugins", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolverService) {
        return {
          restrict: "E",
          scope: true,
          templateUrl: PathResolverService.resolve("view/componentPlugins.html"),

          link: function (scope, element) {
            //TODO: Remove watch after single use
            var singleWatch = scope.$watch("componentPlugins", function () {
              singleWatch();

              var cursorAt = { left: 0, top: 0 };
              element
                .find(".component-plugin")
                .draggable({
                  helper: "clone",
                  cursorAt: cursorAt,
                  start: function () {
                    var componentPluginElement = angular.element(this);
                    componentPluginElement.data("component-plugin-info", {
                      componentInfo: {
                        componentType: componentPluginElement.attr("data-control-type"),
                        category: componentPluginElement.attr("data-control-category"),
                        name: componentPluginElement.attr("data-name")
                      },
                      cursorAt: cursorAt
                    });

                    //scope.IsExpanded = false;
                    scope.$digest();
                  }
                });
            });
          },

          controller: [
            "$scope",
            "templateEditorPath",
            "Cerberus.TemplateEditor.Localization",
            "Cerberus.TemplateEngine.Service.Template",
            function ($scope, templateEditorPath, localization, TemplateEngineService) {
              $scope.localization = localization;

              TemplateEngineService.getComponentPlugins()
                .then(function (componentPlugins) {
                  $scope.componentPlugins = componentPlugins;
                  $scope.applicationBasePath = templateEditorPath;
                });
            }
          ]
        };
      }
    ]);
})(window.angular);