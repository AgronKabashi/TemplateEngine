(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component", function () {
      this.id = 0;
      this.friendlyName = "";
      this.name = "";

      this.visualProperties = "";
      this.componentType = "";
      this.category = "basic";
      this.creationGUID = "";

      this.class = "";

      this.content = {};
    });
})(window.angular);