(function (angular) {
  "use strict";

  var ModelFactory = angular.module("Cerberus.ModelFactory");

  function TemplateRestProvider($http, $q) {
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

    this.removeTemplate = function (templateId) {
      return templateId > 0 ? cleanPromise($http.delete(buildResourceUrl(serviceUrl, "template", ~~templateId))) : emptyRejectedPromise();
    };

    this.saveTemplate = function (template) {
      return template !== undefined ? cleanPromise($http.put(buildResourceUrl(serviceUrl, "template"), template)) : emptyRejectedPromise();
    };

    this.cloneTemplate = function (templateId) {
      return templateId > 0 ? cleanPromise($http.post(buildResourceUrl(serviceUrl, "template", ~~templateId, "clone"))) : emptyRejectedPromise();
    };

    // Templates
    this.getTemplates = function () {
      return cleanPromise($http.get(buildResourceUrl(serviceUrl, "templates")));
    };

    // TemplateInfo
    this.getTemplateInfo = function (templateId) {
      return templateId > 0 ? cleanPromise($http.get(buildResourceUrl(serviceUrl, "templateinfo", ~~templateId))) : emptyResolvedPromise();
    };

    this.saveTemplateInfo = function (template) {
      return template !== undefined ? cleanPromise($http.put(buildResourceUrl(serviceUrl, "templateinfo"), template)) : emptyRejectedPromise();
    };

    // TemplateContent
    this.getDocument = function (templateId, documentId, documentTypeId) {
      return cleanPromise($http.get(buildResourceUrl(serviceUrl, "templatecontent", ~~templateId, ~~documentId, ~~documentTypeId)));
    };

    this.saveDocument = function (template, documentId, documentTypeId) {
      return cleanPromise($http.put(buildResourceUrl(serviceUrl, "templatecontent", ~~documentId, documentTypeId), template));
    };

    this.getComponentPlugins = function () {
      return cleanPromise($http.get(buildResourceUrl(serviceUrl, "componentplugins")));
    };
  }

  ModelFactory.registerModel("Cerberus.TemplateEngine.Service.TemplateRestProvider", angular.extend(TemplateRestProvider, { $inject: ["$http", "$q"] }));
})(window.angular);