(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.Template", [TemplateService]);

  function TemplateService() {
    this.removeComponentsFromTemplate = function (template, components) {
      _.forEach(components, function (component) {
        // Remove the components from the template
        _.remove(template.components, { id: component.id });

        // Remove the components from the resolutions
        _.forEach(template.resolutions, function (resolution) {
          delete resolution.componentVisualProperties[component.id];
        });
      });
    };
  }
})(window.angular, window._);