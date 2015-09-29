(function (angular) {
  "use strict";

  var ModelFactory = angular.module("Cerberus.ModelFactory");

  function TemplateRestProvider($http, $q, ModelFactory) {
    var serviceUrl = "";

    function cleanPromise(promise) {
      var defer = $q.defer();

      promise
        .then(function (response) {
          defer.resolve(response.data);
        })
        .catch(function () {
          defer.reject();
        });

      return defer.promise;
    }

    function buildResourceUrl() {
      return angular.extend([], arguments).slice(0).join("/");
    }

    function emptyResolvedPromise() {
      var defer = $q.defer();
      defer.resolve();
      return defer.promise;
    }

    function emptyRejectedPromise() {
      var defer = $q.defer();
      defer.reject();
      return defer.promise;
    }

    this.configure = function (url) {
      serviceUrl = url;
    };

    //Template
    this.getTemplate = function (templateId) {
      return templateId > 0 ? cleanPromise($http.get(buildResourceUrl(serviceUrl, "template", ~~templateId))) : emptyResolvedPromise();
    };

    this.RemoveTemplate = function (templateId) {
      return templateId > 0 ? cleanPromise($http.delete(buildResourceUrl(serviceUrl, "template", ~~templateId))) : emptyRejectedPromise();
    };

    this.SaveTemplate = function (template) {
      return template !== undefined ? cleanPromise($http.put(buildResourceUrl(serviceUrl, "template"), template)) : emptyRejectedPromise();
    };

    this.CloneTemplate = function (templateId) {
      return templateId > 0 ? cleanPromise($http.post(buildResourceUrl(serviceUrl, "template", ~~templateId, "clone"))) : emptyRejectedPromise();
    };

    //Templates
    this.GetTemplates = function () {
      return cleanPromise($http.get(buildResourceUrl(serviceUrl, "templates")));
    };

    //TemplateInfo
    this.GetTemplateInfo = function (templateId) {
      return templateId > 0 ? cleanPromise($http.get(buildResourceUrl(serviceUrl, "templateinfo", ~~templateId))) : emptyResolvedPromise();
    };

    this.SaveTemplateInfo = function (template) {
      return template !== undefined ? cleanPromise($http.put(buildResourceUrl(serviceUrl, "templateinfo"), template)) : emptyRejectedPromise();
    };

    //TemplateContent
    this.GetDocument = function (templateId, documentId, documentTypeId) {
      return cleanPromise($http.get(buildResourceUrl(serviceUrl, "templatecontent", ~~templateId, ~~documentId, ~~documentTypeId)));
    };

    this.SaveDocument = function (template, documentId, documentTypeId) {
      return cleanPromise($http.put(buildResourceUrl(serviceUrl, "templatecontent", ~~documentId, documentTypeId), template));
    };

    this.GetComponentPlugins = function () {
      return cleanPromise($http.get(buildResourceUrl(serviceUrl, "componentplugins")));
    };
  }

  ModelFactory.registerModel("Cerberus.TemplateEngine.Service.TemplateRestProvider", angular.extend(TemplateRestProvider, { $inject: ["$http", "$q"] }));
})(window.angular);