(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.TemplateResolution", [
      "MaxResolutionCount",
			"MaxResolutionValue",
			"MaxResolutionDifference",
      "Cerberus.TemplateEditor.Helper.TemplateEditor",
      function (MaxResolutionCount, MaxResolutionValue, MaxResolutionDifference, TemplateEditorHelper) {
        this.AddResolution = function (template, resolutionValue) {
          var resolution = new Cerberus.TemplateEngine.Model.Resolution(),
						  currentResolution = this.FindResolution(template, resolutionValue);

          if (template.Resolutions.length >= MaxResolutionCount) {
            //EventService.Notify("ShowMessage", Localization.ComponentResolutions.ReachedMaximumResolutions);
            return;
          }

          var previousRes = this.FindResolution(template, resolutionValue - MaxResolutionDifference);
          var nextRes = this.FindResolution(template, resolutionValue + MaxResolutionDifference);

          if (Math.abs(resolutionValue - previousRes.ResolutionValue) <= MaxResolutionDifference ||
            Math.abs(resolutionValue - nextRes.ResolutionValue) <= MaxResolutionDifference) {
            //EventService.Notify("ShowMessage", Localization.TemplateResolutions.NotEnoughSpace);
            return;
          }

          resolution.ResolutionValue = resolutionValue;
          resolution.ComponentVisualProperties = JSON.parse(JSON.stringify(currentResolution.ComponentVisualProperties));

          template.Resolutions.push(resolution);

          template.Resolutions.sort(function (a, b) {
            return a.ResolutionValue - b.ResolutionValue;
          });

          return resolution;
        };

        this.RemoveResolution = function (template, resolution) {
          var resolutionValue = resolution.ResolutionValue;
          _.remove(template.Resolutions, function (resolution) {
            return resolution.ResolutionValue === resolutionValue;
          });
        };

        this.FindResolution = function (template, resolutionValue) {
          var index = this.FindResolutionIndex(template, resolutionValue);

          return index >= 0 ? template.Resolutions[index] : null;
        };

        this.FindResolutionIndex = function (template, resolutionValue) {
          var result = _.findIndex(template.Resolutions, function (resolution) {
            return resolution.ResolutionValue >= resolutionValue;
          });

          return result >= 0 ? result : -1;
        };

        this.DistributeResolutionPropertiesToAllResolutions = function (template, sourceResolution, components) {
          _.forEach(components, function (component) {
            _.forEach(template.Resolutions, function (resolution) {
              TemplateEditorHelper.SetComponentVisualProperties(template, resolution, component);
            });
          });
        };

        this.DistributeResolutionPropertiesToLowerResolutions = function (template, sourceResolution, components) {
          _.forEach(components, function (component) {
            _.forEach(template.Resolutions, function (resolution) {

              if (resolution.ResolutionValue < sourceResolution.ResolutionValue) {
                TemplateEditorHelper.SetComponentVisualProperties(template, resolution, component);
              }
            });
          });
        };

        this.DistributeResolutionPropertiesToHigherResolutions = function (template, sourceResolution, components) {
          _.forEach(components, function (component) {
            _.forEach(template.Resolutions, function (resolution) {

              if (resolution.ResolutionValue > sourceResolution.ResolutionValue) {
                TemplateEditorHelper.SetComponentVisualProperties(template, resolution, component);
              }
            });
          });
        };
      }
    ]);
})(window.angular);