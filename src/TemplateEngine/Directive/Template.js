(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .directive("csTemplate", [
      "Cerberus.TemplateEngine.Service.DataBag",
      function (DataBagService) {
        return {
          restrict: "E",
          scope: {},
          controller: [
            "$scope",
            "Cerberus.TemplateEngine.Service.Event",
            "Cerberus.TemplateEngine.Service.PathResolver",
            function ($scope, EventService, PathResolverService) {
              $scope.Template = DataBagService.GetData("Template");

              $scope.GetComponentPath = function (component) {
                return PathResolverService.Resolve(String.format("View/Component/{0}/{1}.html", component.Category, component.Name));
              };

              //The template is supplied from outside
              EventService.Subscribe("InitializeTemplate", function (template) {
                $scope.Template = template;
              });
            }],

          template: function (element, attributes) {
            var isEditMode = (attributes.templateMode || "View") !== "View";
            var nameAttribute = "",
            styleAttribute = "";

            if (isEditMode) {
              nameAttribute = "data-friendly-name=\"{{Component.FriendlyName}}\" data-component-name=\"{{Component.Name}}\"";
              styleAttribute = "style=\"{{Component.VisualProperties}}\"";
            }

            return String.format("<cs-component ng-repeat=\"Component in Template.Components track by Component.Id\" \
              {0} {1} \
              ng-class=\"Component.Class\" \
              ng-include=\"::GetComponentPath(Component)\"></cs-component>",
              nameAttribute,
              styleAttribute);
          }
        };
      }
  ]);
})(window.angular);