(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
		.directive("csComponentproperties", [
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEditor.Service.PathResolver",
			"Cerberus.TemplateEditor.Helper.CSS",
			function (EventService, PathResolver, CSSHelper) {
			  return {
			    restrict: "E",
			    scope: true,
			    templateUrl: PathResolver.Resolve("View/ComponentProperties.html"),

			    link: function (scope, element, attrs) {
			      //
			      element
              .click(function (event, ui) {
                event.stopPropagation();
              })
              //make the properties pane resizable
              .find(".component-properties-container")
              .resizable({
                minWidth: 150,
                handles: "w"
              });
			    },

			    controller: [
            "$scope",
            "$controller",
            "Cerberus.TemplateEditor.Localization",
            "Cerberus.TemplateEditor.Service.StyleSetting",
            function ($scope, $controller, Localization, StyleSettingService) {
              var componentVisibilityHasChanged = false;
              var ignoreComponentUpdatedEvent = false;

              //Respond to when the selected component's VisualProperties has changed
              //from outside the directive
              this.OnComponentUpdated = function (component) {
                if (ignoreComponentUpdatedEvent || !component || $scope.SelectedComponent !== component) {
                  return;
                }

                $scope.VisualProperties = CSSHelper.FromCss($scope.SelectedComponent.VisualProperties);
              };

              this.OnPropertyChanged = function () {
                if (!$scope.SelectedComponent) {
                  return;
                }

                $scope.SelectedComponent.VisualProperties = CSSHelper.ToCss($scope.VisualProperties);

                ignoreComponentUpdatedEvent = true;
                EventService.Notify("ComponentUpdated", $scope.SelectedComponent);
                ignoreComponentUpdatedEvent = false;

                if (componentVisibilityHasChanged) {
                  EventService.Notify("ComponentVisibilityChanged", $scope.SelectedComponent, $scope.VisualProperties.display !== 'none');
                  componentVisibilityHasChanged = false;
                }
              };

              this.OnResolutionSelected = function (resolutionValue) {
                if (!$scope.SelectedComponent) {
                  return;
                }

                $scope.VisualProperties = CSSHelper.FromCss($scope.SelectedComponent.VisualProperties);
                $scope.IsTransposedHorizontal = $scope.VisualProperties.right !== undefined;
                $scope.IsTransposedVertical = $scope.VisualProperties.bottom !== undefined;
              };

              this.OnComponentSelected = function (selectedComponents) {
                //TODO: allow editing multiple components?
                var component = selectedComponents !== undefined && selectedComponents.length === 1 ? selectedComponents[0] : undefined;

                $scope.SelectedComponent = component;

                if (component) {
                  $scope.Content = component.Content;
                  $scope.VisualProperties = CSSHelper.FromCss($scope.SelectedComponent.VisualProperties);
                  $scope.IsTransposedHorizontal = $scope.VisualProperties.right !== undefined;
                  $scope.IsTransposedVertical = $scope.VisualProperties.bottom !== undefined;

                  var viewPath = PathResolver.Resolve(String.format("/View/ComponentEditor/{0}/{1}.html", component.Category, component.Name));
                  var componentEditoryId = String.format("Cerberus.TemplateEditor.Controller.ComponentEditor.{0}.{1}", component.Category, component.Name);

                  $scope.EditorController = $controller(componentEditoryId, { "$scope": $scope });
                  $scope.EditorViewPath = viewPath;
                  $scope.HasEditor = true;
                }
              };

              this.InitializeScope = function () {
                $scope.EditorUrl = "";
                $scope.Localization = Localization;
                $scope.FontFamilies = StyleSettingService.GetAvailableFontFamilies();
                $scope.BorderStyles = StyleSettingService.GetBorderStyles();
                $scope.BackgroundImageRepeatOptions = StyleSettingService.GetBackgroundImageRepeatOptions();
                $scope.BackgroundPositionHorizontalOptions = StyleSettingService.GetBackgroundPositionHorizontalOptions();
                $scope.BackgroundPositionVerticalOptions = StyleSettingService.GetBackgroundPositionVerticalOptions();
                $scope.BackgroundSizeOptions = StyleSettingService.GetBackgroundSizeOptions();

                $scope.$watch("VisualProperties", this.OnPropertyChanged, true);

                $scope.GetEditorPath = function (editorName) {
                  return PathResolver.Resolve(String.format("View/ComponentProperties/{0}.html", editorName));
                };

                $scope.ToggleComponentVisibility = function () {
                  componentVisibilityHasChanged = true;
                };

                $scope.Transpose = function (orientation, primaryPropertyName, secondaryPropertyName) {
                  var oldPropertyName = $scope[orientation] ? secondaryPropertyName : primaryPropertyName;
                  var newPropertyName = $scope[orientation] ? primaryPropertyName : secondaryPropertyName;
                  var value = $scope.VisualProperties[oldPropertyName];

                  $scope[orientation] = !$scope[orientation];

                  delete $scope.VisualProperties[oldPropertyName];

                  $scope.VisualProperties[newPropertyName] = value;
                };
              };

              this.InitializeEvents = function () {
                EventService.Subscribe("ComponentUpdated", this.OnComponentUpdated);
                EventService.Subscribe("ComponentUpdating", this.OnComponentUpdated);
                EventService.Subscribe("ResolutionSelected", this.OnResolutionSelected);
                EventService.Subscribe("ComponentSelected", this.OnComponentSelected);
              };


              this.InitializeScope();
              this.InitializeEvents();
            }
			    ]
			  };
			}
		]);
})(window.angular);