(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csComponentproperties", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolver) {
        return {
          restrict: "E",
          scope: true,
          templateUrl: PathResolver.resolve("view/componentProperties.html"),

          link: function (scope, element, attrs) {
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
            "Cerberus.TemplateEditor.Service.PathResolver",
            "Cerberus.TemplateEngine.Service.Event",
            "Cerberus.TemplateEditor.Localization",
            "Cerberus.TemplateEditor.Service.StyleSetting",
            "Cerberus.TemplateEditor.Helper.CSS",
            ComponentPropertiesController
          ]
        };
      }
    ]);

  function ComponentPropertiesController(
    $scope,
    $controller,
    PathResolver,
    EventService,
    Localization,
    StyleSettingService,
    CSSHelper) {
    var componentVisibilityHasChanged = false;
    var ignoreComponentUpdatedEvent = false;

    _.assign($scope, {
      borderStyles: StyleSettingService.getBorderStyles(),
      backgroundImageRepeatOptions: StyleSettingService.getBackgroundImageRepeatOptions(),
      backgroundPositionHorizontalOptions: StyleSettingService.getBackgroundPositionHorizontalOptions(),
      backgroundPositionVerticalOptions: StyleSettingService.getBackgroundPositionVerticalOptions(),
      backgroundSizeOptions: StyleSettingService.getBackgroundSizeOptions(),
      editorUrl: "",
      fontFamilies: StyleSettingService.getAvailableFontFamilies(),
      localization: Localization,

      getEditorPath: function (editorName) {
        return PathResolver.resolve(String.format("view/componentProperties/{0}.html", editorName));
      },

      toggleComponentVisibility: function () {
        componentVisibilityHasChanged = true;
      },

      transpose: function (orientation, primaryPropertyName, secondaryPropertyName) {
        var oldPropertyName = $scope[orientation] ? secondaryPropertyName : primaryPropertyName;
        var newPropertyName = $scope[orientation] ? primaryPropertyName : secondaryPropertyName;
        var value = $scope.visualProperties[oldPropertyName];

        $scope[orientation] = !$scope[orientation];

        delete $scope.visualProperties[oldPropertyName];

        $scope.visualProperties[newPropertyName] = value;
      }
    });

    $scope.$watch("visualProperties", onPropertyChanged, true);
    EventService.subscribeMultiple(["ComponentUpdating", "ComponentUpdated"], onComponentUpdated);
    EventService.subscribe("ResolutionSelected", onResolutionSelected);
    EventService.subscribe("ComponentSelected", onComponentSelected);

    //Respond to when the selected component's VisualProperties has changed
    //from outside the directive
    function onComponentUpdated(component) {
      if (ignoreComponentUpdatedEvent || !component || $scope.selectedComponent !== component) {
        return;
      }

      $scope.visualProperties = CSSHelper.fromCss($scope.selectedComponent.visualProperties);
    }

    function onPropertyChanged() {
      if (!$scope.selectedComponent) {
        return;
      }

      $scope.selectedComponent.visualProperties = CSSHelper.toCss($scope.visualProperties);

      ignoreComponentUpdatedEvent = true;
      EventService.notify("ComponentUpdated", $scope.selectedComponent);
      ignoreComponentUpdatedEvent = false;

      if (componentVisibilityHasChanged) {
        EventService.notify("ComponentVisibilityChanged", $scope.selectedComponent, $scope.visualProperties.display !== 'none');
        componentVisibilityHasChanged = false;
      }
    }

    function onResolutionSelected(resolutionValue) {
      if (!$scope.selectedComponent) {
        return;
      }

      $scope.visualProperties = CSSHelper.fromCss($scope.selectedComponent.visualProperties);
      $scope.isTransposedHorizontal = $scope.visualProperties.right !== undefined;
      $scope.isTransposedVertical = $scope.visualProperties.bottom !== undefined;
    }

    function onComponentSelected(selectedComponents) {
      //TODO: allow editing multiple components?
      var component = selectedComponents !== undefined && selectedComponents.length === 1 ? selectedComponents[0] : undefined;

      $scope.selectedComponent = component;

      if (component) {
        $scope.content = component.content;
        $scope.visualProperties = CSSHelper.fromCss($scope.selectedComponent.visualProperties);
        $scope.isTransposedHorizontal = $scope.visualProperties.right !== undefined;
        $scope.isTransposedVertical = $scope.visualProperties.bottom !== undefined;

        var viewPath = PathResolver.resolve(String.format("/View/ComponentEditor/{0}/{1}.html", component.category, component.name));
        var componentEditoryId = String.format("Cerberus.TemplateEditor.Controller.ComponentEditor.{0}.{1}", component.category, component.name);

        $scope.editorController = $controller(componentEditoryId, { "$scope": $scope });
        $scope.editorViewPath = viewPath;
        $scope.hasEditor = true;
      }
    }
  }
})(window.angular, window._);