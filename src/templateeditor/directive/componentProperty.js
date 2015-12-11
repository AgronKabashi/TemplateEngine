(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .directive("csComponentproperty", [
      function () {
        return {
          restrict: "A",
          require: "^^csComponentproperties",

          link: function (/*scope, element, attributes, componentPropertiesController*/) {
          }
        };
      }
    ]);
})(window.angular);