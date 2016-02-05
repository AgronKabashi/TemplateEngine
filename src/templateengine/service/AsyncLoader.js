(function (angular) {
  "use strict";

  angular.module("Cerberus.TemplateEngine")
    .service("Cerberus.TemplateEngine.Service.AsyncLoader", [AsyncLoaderService]);

  function AsyncLoaderService() {
    this.load = function (src, successCallback, errorCallback) {
      var script = document.createElement("script");
      script.onload = script.onreadystatechanged = successCallback;
      script.onerror = errorCallback;
      script.src = src;
      document.head.appendChild(script);
    };
  }
})(window.angular);