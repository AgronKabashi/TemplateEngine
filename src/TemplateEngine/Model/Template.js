(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Template", function () {
      this.name = "";
      this.id = 0;
      this.visualProperties = "";
      this.createdDateAsString = "";
      this.lastModifiedDateAsString = "";
      this.components = [];
      this.resolutions = [];
    });
})(window.angular);