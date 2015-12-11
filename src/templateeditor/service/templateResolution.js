(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.TemplateResolution", [
      "maxResolutionCount",
      "maxResolutionValue",
      "maxResolutionDifference",
      "Cerberus.ModelFactory",
      "Cerberus.TemplateEditor.Helper.TemplateEditor",
      TemplateResolutionService
    ]);

  function TemplateResolutionService(maxResolutionCount, maxResolutionValue, maxResolutionDifference, ModelFactory, TemplateEditorHelper) {
    this.addResolution = function (template, resolutionValue) {
      var resolution = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Resolution"),
        currentResolution = this.findResolution(template, resolutionValue);

      if (template.resolutions.length >= maxResolutionCount) {
        //EventService.Notify("ShowMessage", Localization.ComponentResolutions.ReachedMaximumResolutions);
        return undefined;
      }

      var previousRes = this.findResolution(template, resolutionValue - maxResolutionDifference);
      var nextRes = this.findResolution(template, resolutionValue + maxResolutionDifference);

      if (previousRes && Math.abs(resolutionValue - previousRes.resolutionValue) <= maxResolutionDifference ||
        nextRes && Math.abs(resolutionValue - nextRes.resolutionValue) <= maxResolutionDifference) {
        //EventService.Notify("ShowMessage", Localization.TemplateResolutions.NotEnoughSpace);
        return undefined;
      }

      resolution.resolutionValue = resolutionValue;
      // Create a deep copy of the existing components' visual properties
      resolution.componentVisualProperties = currentResolution && currentResolution.componentVisualProperties ? JSON.parse(JSON.stringify(currentResolution.componentVisualProperties)) : {};

      template.resolutions.push(resolution);

      template.resolutions.sort(function (a, b) {
        return a.resolutionValue - b.resolutionValue;
      });

      return resolution;
    };

    this.removeResolution = function (template, resolution) {
      _.remove(template.resolutions, { resolutionValue: resolution.resolutionValue });
    };

    this.findResolution = function (template, resolutionValue) {
      var index = this.findResolutionIndex(template, resolutionValue);

      return template.resolutions[index];
    };

    this.findResolutionIndex = function (template, resolutionValue) {
      return _.findIndex(template.resolutions, function (resolution) {
        return resolution.resolutionValue >= resolutionValue;
      });
    };

    this.distributeResolutionPropertiesToAllResolutions = function (template, sourceResolution, components) {
      _.forEach(components, function (component) {
        _.forEach(template.resolutions, function (resolution) {
          TemplateEditorHelper.setComponentVisualProperties(template, resolution, component);
        });
      });
    };

    this.distributeResolutionPropertiesToLowerResolutions = function (template, sourceResolution, components) {
      _.forEach(components, function (component) {
        _.forEach(template.resolutions, function (resolution) {

          if (resolution.resolutionValue < sourceResolution.resolutionValue) {
            TemplateEditorHelper.setComponentVisualProperties(template, resolution, component);
          }
        });
      });
    };

    this.distributeResolutionPropertiesToHigherResolutions = function (template, sourceResolution, components) {
      _.forEach(components, function (component) {
        _.forEach(template.resolutions, function (resolution) {

          if (resolution.resolutionValue > sourceResolution.resolutionValue) {
            TemplateEditorHelper.setComponentVisualProperties(template, resolution, component);
          }
        });
      });
    };
  }
})(window.angular, window._);