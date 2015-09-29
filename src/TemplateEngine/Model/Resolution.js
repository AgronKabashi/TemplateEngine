(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Resolution", function (resolutionValue) {
      this.id = 0;
      this.resolutionValue = ~~resolutionValue || 10000;
      this.componentVisualProperties = {};
    });
})(window.angular);