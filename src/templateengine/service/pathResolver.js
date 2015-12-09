(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .service("Cerberus.TemplateEngine.Service.PathResolver", [
      "templateEnginePath",
      function (appPath) {
        this.resolve = function (path) {
          return appPath + path;
        };
      }
    ]);
})(window.angular);