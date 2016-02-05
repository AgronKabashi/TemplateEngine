(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.Gmail.MessageList", function () {
      this.localization = {
        emptyList: "",
        loading: ""
      };
    });
})(window.angular);