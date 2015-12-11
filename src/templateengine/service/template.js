(function (angular) {
  "use strict";

  var ModelFactory = angular.module("Cerberus.ModelFactory");

  angular
    .module("Cerberus.TemplateEngine")
    .provider("Cerberus.TemplateEngine.Service.Template", [
      function () {
        // Default template provider
        var templateProvider = ModelFactory.getModelType("Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider"),
          templateProviderParameters = null;

        this.setProvider = function (provider, parameters) {
          templateProvider = provider;
          templateProviderParameters = parameters;
        };

        this.$get = [
          "$injector",
          function ($injector) {
            var templateProviderInstance = $injector.instantiate(templateProvider);
            if (templateProviderParameters) {
              templateProviderInstance.configure(templateProviderParameters);
            }

            return templateProviderInstance;
          }
        ];
      }
    ]);
})(window.angular);