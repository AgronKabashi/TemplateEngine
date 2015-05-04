(function (angular) {
  namespace("Cerberus.TemplateEngine.Service")
    .TemplateRestProvider = angular.extend(function ($http, $q) {
      var serviceUrl = "";

      function CleanPromise(promise) {
        var defer = $q.defer();

        promise
          .then(function (response) {
            defer.resolve(response.data);
          })
          .catch(function () {
            defer.reject();
          });

        return defer.promise;
      };

      function BuildResourceUrl() {
        return angular.extend([], arguments).slice(0).join("/");
      }

      function EmptyResolvedPromise() {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
      }

      function EmptyRejectedPromise() {
        var defer = $q.defer();
        defer.reject();
        return defer.promise;
      }

      this.Configure = function (url) {
        serviceUrl = url;
      };

      //Template
      this.GetTemplate = function (templateId) {
        return templateId > 0 ? CleanPromise($http.get(BuildResourceUrl(serviceUrl, "template", ~~templateId))) : EmptyResolvedPromise();
      };

      this.RemoveTemplate = function (templateId) {
        return templateId > 0 ? CleanPromise($http.delete(BuildResourceUrl(serviceUrl, "template", ~~templateId))) : EmptyRejectedPromise();
      };

      this.SaveTemplate = function (template) {
        return template != null ? CleanPromise($http.put(BuildResourceUrl(serviceUrl, "template"), template)) : EmptyRejectedPromise();
      };

      this.CloneTemplate = function (templateId) {
        return templateId > 0 ? CleanPromise($http.post(BuildResourceUrl(serviceUrl, "template", ~~templateId, "clone"))) : EmptyRejectedPromise();
      };

      //Templates
      this.GetTemplates = function () {
        return CleanPromise($http.get(BuildResourceUrl(serviceUrl, "templates")));
      };

      //TemplateInfo
      this.GetTemplateInfo = function (templateId) {
        return templateId > 0 ? CleanPromise($http.get(BuildResourceUrl(serviceUrl, "templateinfo", ~~templateId))) : EmptyResolvedPromise();
      };

      this.SaveTemplateInfo = function (template) {
        return template != null ? CleanPromise($http.put(BuildResourceUrl(serviceUrl, "templateinfo"), template)) : EmptyRejectedPromise();
      };

      //TemplateContent
      this.GetDocument = function (templateId, documentId, documentTypeId) {
        return CleanPromise($http.get(BuildResourceUrl(serviceUrl, "templatecontent", ~~templateId, ~~documentId, ~~documentTypeId)));
      };

      this.SaveDocument = function (template, documentId, documentTypeId) {
        return CleanPromise($http.put(BuildResourceUrl(serviceUrl, "templatecontent", ~~documentId, documentTypeId), template));
      };

      this.GetComponentPlugins = function () {
        return CleanPromise($http.get(BuildResourceUrl(serviceUrl, "componentplugins")));
      };
    },
	{
	  $inject: ["$http", "$q"]
	});
})(angular);