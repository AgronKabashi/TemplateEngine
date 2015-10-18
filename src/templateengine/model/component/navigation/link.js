(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.Navigation.Link", function () {
      this.Url = "";
      this.Tooltip = "";
      this.Text = "";
      this.Target = "";
    });
})(window.angular);