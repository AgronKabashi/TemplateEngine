/**
 * THIS APP IS FOR DEMONSTRATION PURPOSES ONLY
 * BEST PRACTICES ARE NOT FOLLOWED
 */
(function (angular, $, _) {
  "use strict";

  angular
    .module("Demo", [
      "ui.router",
      "Cerberus.ModelFactory",
      "Cerberus.TemplateEngine",
      "Cerberus.TemplateEditor"
    ])
    .config([
      "$stateProvider",
      "$urlRouterProvider",
      "templateEditorPath",
      "Cerberus.ModelFactoryProvider",
      "Cerberus.TemplateEngine.Service.TemplateProvider",
      function ($stateProvider, $urlRouterProvider, templateEditorPath, ModelFactoryProvider, TemplateProvider) {
        TemplateProvider.setProvider(ModelFactoryProvider.$get().getModelType("Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider"));

        $stateProvider
          .state("demo", {
            url: "/demo",
            templateUrl: "demo.html",
            controller: "Demo.Controller.Home"
          })
          .state("design", {
            url: "/design/:id",
            templateUrl: templateEditorPath + "view/design.html",
            controller: "Demo.Controller.Design"
          })
          .state("view", {
            url: "/view/:id",
            templateUrl: "view.html",
            controller: "Demo.Controller.View"
          });

        $urlRouterProvider.otherwise("/demo");
      }
    ])
    .controller("Demo.Controller.Home", [
      "$scope",
      "$http",
      "Cerberus.TemplateEngine.Service.Template",
      "Cerberus.ModelFactory",
      function ($scope, $http, TemplateService, ModelFactory) {
        $http.get("template-presets.json")
          .then(function (response) {
            $scope.templatePresets = response.data.templatePresets;
          });

        TemplateService.getTemplates()
          .then(function (templates) {
            $scope.templates = templates;
          });

        $scope.addTemplate = function (templatePreset) {
          var template;

          if (templatePreset) {
            template = angular.extend({}, templatePreset.data);
            template.name = $scope.newTemplateName || templatePreset.name;
          }
          else {
            template = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Template");
            template.name = $scope.newTemplateName || "Template";
          }

          $scope.newTemplateName = "";

          TemplateService.saveTemplate(template)
            .then(function (savedTemplate) {
              $scope.templates.push(savedTemplate);
            });
        };

        $scope.removeTemplate = function (template) {
          var templateId = template.id;
          TemplateService.removeTemplate(templateId)
            .then(function () {
              _.remove($scope.templates, { id: templateId });
            });
        };
      }
    ])
    .controller("Demo.Controller.View", [
      "$scope",
      "$stateParams",
      "Cerberus.TemplateEngine.Service.Template",
      "Cerberus.TemplateEngine.Service.Event",
      function ($scope, $stateParams, TemplateService, EventService) {
        var templateId = $stateParams.id || 0;
        TemplateService
          .getTemplate(templateId)
          .then(function (template) {
            $scope.templateCSS = generateCSS(template);
            EventService.notify("InitializeTemplate", template);
          });
      }
    ])
    .controller("Demo.Controller.Design", [
      "$scope",
      "$state",
      "$stateParams",
      "Cerberus.TemplateEngine.Service.Template",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.DataBag",
      function ($scope, $state, $stateParams, TemplateService, EventService, DataBagService) {
        EventService.subscribe("ExitTemplateEditor", function () {
          $state.go("demo");
        });

        var templateId = $stateParams.id || 0;
        TemplateService
          .getTemplate(templateId)
          .then(function (template) {
            DataBagService.addData("Template", template);
            EventService.notify("InitializeTemplate", template);
          });
      }
    ]);

  $(document).ready(function () {
    angular.bootstrap(document, ["Demo"]);
  });

  //For demo purposes only - should be served as a CSS file by the server instead
  function generateCSS(template) {
    var previousResolution;
    var generatedCSS = "";

    _.forEach(template.resolutions, function (resolution) {
      if (!previousResolution) {
        generatedCSS += String.format("@media(max-width:{0}px){", resolution.resolutionValue);
      }
      else {
        generatedCSS += String.format("@media(min-width:{0}px) and (max-width:{1}px){", previousResolution.resolutionValue + 1, resolution.resolutionValue);
      }

      var isFixedHeight = false;
      _.forIn(resolution.componentVisualProperties, function (visualProperties, componentId) {
        // Special case - Fixed height containers must be rendered as blocks
        // to allow for scrollbars
        isFixedHeight = visualProperties.indexOf("overflow:") >= 0;

        generatedCSS += String.format("#TC{0}{{1};{2}}", componentId, isFixedHeight ? "display:block" : "", visualProperties);
      });

      generatedCSS += "}";

      previousResolution = resolution;
    });

    return generatedCSS;
  }
})(window.angular, window.$, window._);