(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .service("Cerberus.TemplateEngine.Service.DataBag", function () {
      var dataBag = {};

      this.addData = function (id, value) {
        dataBag[id.toLowerCase()] = value;
      };

      this.getData = function (id) {
        return dataBag[id.toLowerCase()];
      };

      this.removeData = function (id) {
        delete dataBag[id.toLowerCase()];
      };
    });
})(window.angular);