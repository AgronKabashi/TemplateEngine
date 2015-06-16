(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
		.directive("csComponentactions", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolver) {
        return {
          restrict: "E",
          templateUrl: PathResolver.Resolve("View/ComponentActions.html"),
          scope: true,
          controller: [
            "$scope",
            "Cerberus.TemplateEngine.Service.Event",
            "Cerberus.TemplateEditor.Localization",
            "Cerberus.TemplateEngine.Service.DataBag",
            "Cerberus.TemplateEditor.Service.TemplateResolution",
            function ($scope, EventService, Localization, DataBagService, TemplateResolutionService) {
              function CalculateHiddenControlCount() {
                $scope.HasHiddenControls = false;

                _.forEach($scope.Template.Components, function (component) {
                  if (component.VisualProperties.indexOf("display:none") >= 0) {
                    $scope.HasHiddenControls = true;
                    return false;
                  }
                });
              }

              function UpdateCurrentResolution(resolutionValue) {
                $scope.ResolutionIndex = TemplateResolutionService.FindResolutionIndex($scope.Template, resolutionValue);
              }

              this.InitializeScope = function () {
                var templateMode = DataBagService.GetData("TemplateMode");

                _.extend($scope, {
                  Template: DataBagService.GetData("Template"),
                  ResolutionIndex: -1,
                  SelectedComponents: [],
                  Localization: Localization,
                  ShowTemplateEditorActions: templateMode === Cerberus.TemplateEngine.TemplateMode.EditDesign,
                  ShowContentEditorActions: templateMode === Cerberus.TemplateEngine.TemplateMode.EditContent,
                  HiddenControls: 0,

                  DistributeResolutionPropertiesToAllResolutions: function () {
                    TemplateResolutionService.DistributeResolutionPropertiesToAllResolutions($scope.Template, DataBagService.GetData("CurrentResolution"), $scope.SelectedComponents);
                  },

                  DistributeResolutionPropertiesToLowerResolutions: function () {
                    TemplateResolutionService.DistributeResolutionPropertiesToLowerResolutions($scope.Template, DataBagService.GetData("CurrentResolution"), $scope.SelectedComponents);
                  },

                  DistributeResolutionPropertiesToHigherResolutions: function () {
                    TemplateResolutionService.DistributeResolutionPropertiesToHigherResolutions($scope.Template, DataBagService.GetData("CurrentResolution"), $scope.SelectedComponents);
                  },

                  ToggleHiddenElements: function () {
                    $scope.ShowHiddenElements = !$scope.ShowHiddenElements;
                    EventService.Notify("ShowHiddenElements", $scope.ShowHiddenElements);
                  },

                  RemoveSelectedComponents: function () {
                    var template = $scope.Template;
                    _.remove($scope.SelectedComponents, function (selectedComponent) {
                      _.remove(template.Components, function (component) { return component.Id === selectedComponent.Id; });
                      TemplateEditorHelper.RemoveComponentFromResolutions(template, selectedComponent);

                      return true;
                    });

                    EventService.Notify("ComponentsRemoved");
                  }
                });
              };

              this.InitializeEvents = function () {
                EventService.Subscribe("InitializeTemplate", function (template) {
                  $scope.Template = template;
                });

                EventService.Subscribe("ComponentSelected", function (components) {
                  $scope.SelectedComponents = components;
                });

                EventService.Subscribe("ResolutionSelected", CalculateHiddenControlCount);
                EventService.Subscribe("ResolutionSelected", UpdateCurrentResolution);
                EventService.Subscribe("ComponentVisibilityChanged", CalculateHiddenControlCount);
              };

              this.InitializeScope();
              this.InitializeEvents();
            }
          ]
        };
      }
		]);
})(window.angular);