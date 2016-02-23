(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component", function () {
      this.id = 0;
      this.friendlyName = "";     // User defined name for the component
      this.name = "";	            //

      this.visualProperties = ""; //
      this.componentType = "";    // Determines which plugin to use
      this.category = "basic";    // The category that best fits the component
      this.creationGUID = "";     // Used internally by template editor

      this.class = "";            // User defined class

      this.content = {};
    });
})(window.angular);