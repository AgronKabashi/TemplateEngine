(function (angular, _) {
  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.Template", [TemplateService]);

  function TemplateService() {
    this.removeComponentsFromTemplate = function (template, components) {
      _.forEach(components, function (component) {
        _.remove(template.components, { id: component.id });
        _.forEach(template.resolutions, function (resolution) {
          delete resolution.componentVisualProperties[component.id];
        });
      });
    };
  }
})(window.angular, window._);