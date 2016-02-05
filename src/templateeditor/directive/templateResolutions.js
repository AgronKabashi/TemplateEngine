(function (angular, $, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .constant("maxResolutionCount", 10)
    .constant("maxResolutionValue", 1024)
    .constant("maxResolutionDifference", 10)
    .directive("csTemplateresolutions", [
      "maxResolutionValue",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEditor.Service.PathResolver",
      "Cerberus.TemplateEditor.Service.TemplateResolution",
      function (maxResolutionValue, EventService, PathResolverService, TemplateResolutionService) {
        return {
          restrict: "E",
          scope: true,
          templateUrl: PathResolverService.resolve("view/templateResolutions.html"),

          link: function (scope, element) {
            var templateElement;
            var resolutionSlider = element.find(".resolution-slider:first");

            EventService.subscribe("ResolutionSelected", function (value) {
              resolutionSlider
                .slider("value", value)
                .children()
                .first()
                .attr("data-value", Math.min(value, maxResolutionValue));
              $("cs-template:first-child").css("width", value);
            });

            resolutionSlider
              .slider({
                step: 1,
                value: maxResolutionValue,
                max: maxResolutionValue,

                start: function () {
                  templateElement = $("cs-template");
                  return scope.template !== undefined;
                },

                slide: function (e, ui) {
                  var value = ~~ui.value;
                  $(this).children().first().attr("data-value", value);
                  templateElement.css("width", value);

                  var resolution = TemplateResolutionService.findResolution(scope.template, value);

                  if (scope.currentResolution === undefined || scope.currentResolution && resolution && resolution.resolutionValue !== scope.currentResolution.resolutionValue) {
                    scope.currentResolution = resolution;
                    scope.setDocumentWidth(value, scope.currentResolution);
                  }
                },

                stop: function (e, ui) {
                  var value = ~~ui.value;
                  $(this).children().first().attr("data-Value", value);
                  templateElement.css("width", value);
                  templateElement = undefined;
                  scope.sliderValue = value;
                }
              })
              .children()
              .first()
              .attr("data-value", Math.min(resolutionSlider.outerWidth(), maxResolutionValue));
          },

          controller: [
            "$scope",
            "maxResolutionValue",
            "Cerberus.TemplateEngine.Service.Event",
            "Cerberus.TemplateEditor.Service.DeviceResolution",
            "Cerberus.TemplateEngine.Service.DataBag",
            "Cerberus.TemplateEditor.Service.TemplateResolution",
            "Cerberus.TemplateEditor.Helper.TemplateEditor",
            TemplateResolutionsDirectiveController
          ]
        };
      }
    ]);

  function TemplateResolutionsDirectiveController(
    $scope,
    maxResolutionValue,
    EventService,
    DeviceResolutionService,
    DataBagService,
    TemplateResolutionService,
    TemplateEditorHelper) {
    function onComponentUpdate(component) {
      //Find resolution using current slider value: $scope.SliderValue
      var resolution = TemplateResolutionService.findResolution($scope.template, $scope.sliderValue);

      //Find component using component.Id
      //and update the values in the mediaquery for this component
      TemplateEditorHelper.setComponentVisualProperties($scope.template, resolution, component, true);
    }

    _.assign($scope, {
      maxResolutionValue: maxResolutionValue,
      sliderValue: maxResolutionValue,
      template: DataBagService.getData("Template"),
      resolutionPresets: DeviceResolutionService.getResolutions(),

      addResolution: function (resolutionPreset) {
        var resolutionValue = resolutionPreset !== undefined ? resolutionPreset.value : $scope.sliderValue;
        $scope.currentResolution = TemplateResolutionService.addResolution($scope.template, Math.min(resolutionValue, maxResolutionValue));
        $scope.presetsExpanded = false;

        if ($scope.currentResolution) {
          EventService.notify("ResolutionSelected", $scope.currentResolution.resolutionValue);
          $scope.setDocumentWidth($scope.currentResolution.resolutionValue, $scope.currentResolution);
        }
      },

      removeResolution: function (resolution) {
        TemplateResolutionService.removeResolution($scope.template, resolution);
        $scope.setDocumentWidth(resolution.resolutionValue);
      },

      setDocumentWidth: function (value, resolution) {
        $scope.sliderValue = value;
        resolution = resolution || TemplateResolutionService.findResolution($scope.template, value);
        $scope.currentResolution = resolution;

        DataBagService.addData("CurrentResolution", resolution);

        TemplateEditorHelper.remapComponentVisualProperties($scope.template, resolution);

        EventService.notify("ResolutionSelected", value);
      }
    });

    if ($scope.template) {
      $scope.setDocumentWidth($scope.template.resolutions[$scope.template.resolutions.length - 1].resolutionValue);
    }

    EventService.subscribe("InitializeTemplate", function (template) {
      $scope.template = template;
      $scope.currentResolution = template.resolutions[template.resolutions.length - 1];
      $scope.setDocumentWidth(template.resolutions[template.resolutions.length - 1].resolutionValue);
    });

    EventService.subscribe([
      "ComponentAdded",
      "ComponentUpdated",
      "ComponentPositionUpdated",
      "ComponentSizeUpdated"], onComponentUpdate);
  }
})(window.angular, window.jQuery, window._);