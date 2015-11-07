(function (angular) {
  "use strict";

  angular.module("Cerberus.TemplateEngine")
    .filter("trustedUrl", [
      "$sce",
      function ($sce) {
        return function (url) {
          return $sce.trustAsResourceUrl(url);
        };
      }
    ]);
})(window.angular);