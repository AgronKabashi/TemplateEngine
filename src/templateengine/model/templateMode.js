(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .constant("Cerberus.TemplateEngine.TemplateMode", {
      editDesign: 0,
      editContent: 1,
      view: 2
    });
})(window.angular);