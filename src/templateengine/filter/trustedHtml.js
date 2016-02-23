(function (angular) {
  "use strict";

  angular.module("Cerberus.TemplateEngine")
    .filter("trustedHtml", [
      "$sce",
      function ($sce) {
        return function (html) {
          return $sce.trustAsHtml(html);
        };
      }
    ]);
})(window.angular);