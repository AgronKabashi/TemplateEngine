(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.Navigation.Link", function () {
      this.url = "";
      this.tooltip = "";
      this.text = "";
      this.target = "";
    });
})(window.angular);