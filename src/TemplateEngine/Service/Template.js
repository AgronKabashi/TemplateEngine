(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .provider("Cerberus.TemplateEngine.Service.Template", function () {
      var templateProvider = Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider,
        templateProviderParameters = null;

      this.SetProvider = function (provider, parameters) {
        templateProvider = provider;
        templateProviderParameters = parameters;
      };

      this.$get = [
        "$injector",
        function ($injector) {
          var templateProviderInstance = $injector.instantiate(templateProvider);
          if (templateProviderParameters) {
            templateProviderInstance.Configure(templateProviderParameters);
          }

          return templateProviderInstance;
        }
      ];
    });
})(angular);