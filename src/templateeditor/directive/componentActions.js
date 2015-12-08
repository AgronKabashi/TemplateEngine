(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csComponentactions", [
      "Cerberus.TemplateEditor.Service.PathResolver",
      function (PathResolverService) {
        return {
          restrict: "E",
          templateUrl: PathResolverService.resolve("view/componentActions.html"),
          scope: true,
          controller: [
            "$scope",
            "Cerberus.TemplateEngine.Service.Event",
            "Cerberus.TemplateEditor.Localization",
            "Cerberus.TemplateEngine.Service.DataBag",
            "Cerberus.TemplateEditor.Service.TemplateResolution",
            "Cerberus.TemplateEditor.Service.Template",
            "Cerberus.TemplateEngine.TemplateMode",
            ComponentActionController]
        };
      }
    ]);

  function ComponentActionController($scope, EventService, Localization, DataBagService, TemplateResolutionService, TemplateService, TemplateModes) {
    var templateMode = DataBagService.getData("TemplateMode");

    _.assign($scope, {
      template: DataBagService.getData("Template"),
      resolutionIndex: -1,
      selectedComponents: [],
      localization: Localization,
      showTemplateEditorActions: templateMode === TemplateModes.editDesign,
      showContentEditorActions: templateMode === TemplateModes.editContent,
      hiddenControls: 0,

      distributeResolutionPropertiesToAllResolutions: function () {
        TemplateResolutionService.distributeResolutionPropertiesToAllResolutions($scope.template, DataBagService.getData("CurrentResolution"), $scope.selectedComponents);
      },

      distributeResolutionPropertiesToLowerResolutions: function () {
        TemplateResolutionService.distributeResolutionPropertiesToLowerResolutions($scope.template, DataBagService.getData("CurrentResolution"), $scope.selectedComponents);
      },

      distributeResolutionPropertiesToHigherResolutions: function () {
        TemplateResolutionService.distributeResolutionPropertiesToHigherResolutions($scope.template, DataBagService.getData("CurrentResolution"), $scope.selectedComponents);
      },

      toggleHiddenElements: function () {
        $scope.showHiddenElements = !$scope.showHiddenElements;
        EventService.notify("ShowHiddenElements", $scope.showHiddenElements);
      },

      removeSelectedComponents: function () {
        TemplateService.removeComponentsFromTemplate($scope.template, $scope.selectedComponents);
        $scope.selectedComponents = [];

        EventService.notify("ComponentsRemoved");
        EventService.notify("ComponentSelected");
      }
    });

    EventService.subscribe("InitializeTemplate", function (template) {
      $scope.template = template;
    });

    EventService.subscribe("ComponentSelected", function (components) {
      $scope.selectedComponents = components;
    });

    EventService.subscribe("ResolutionSelected", calculateHiddenControlCount);
    EventService.subscribe("ResolutionSelected", updateCurrentResolution);
    EventService.subscribe("ComponentVisibilityChanged", calculateHiddenControlCount);

    function calculateHiddenControlCount() {
      $scope.hasHiddenControls = false;

      _.forEach($scope.template.components, function (component) {
        if (component.visualProperties.indexOf("display:none") >= 0) {
          $scope.hasHiddenControls = true;
          return false;
        }
      });
    }

    function updateCurrentResolution(resolutionValue) {
      $scope.resolutionIndex = TemplateResolutionService.findResolutionIndex($scope.template, resolutionValue);
    }
  }
})(window.angular, window._);