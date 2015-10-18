/**
 * DEMO CODE
 * FOR DEMONSTRATION PURPOSES ONLY
 * BEST PRACTICES ARE NOT FOLLOWED
 */
(function (angular, $, _) {
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
      "Cerberus.ModelFactoryProvider",
      "Cerberus.TemplateEngine.Service.TemplateProvider",
      function ($stateProvider, $urlRouterProvider, ModelFactoryProvider, TemplateProvider) {
        TemplateProvider.setProvider(ModelFactoryProvider.$get().getModelType("Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider"));

        $stateProvider
          .state("demo", {
            url: "/demo",
            templateUrl: "demo.html",
            controller: "Demo.Controller.Home"
          })
          .state("design", {
            url: "/design/:id",
            templateUrl: "templateeditor/view/design.html",
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
   .service("TemplatePresetsService", [
      "$http",
      function ($http) {
        var presets = [];

        this.getPresets = function () {
          $http
            .get("template-presets.json")
            .then(function (response) {
              angular.extend(presets, response.data.templatePresets);
            });

          return presets;
        };
      }
    ])
    .controller("Demo.Controller.Home", [
      "$scope",
      "TemplatePresetsService",
      "Cerberus.TemplateEngine.Service.Template",
      "Cerberus.ModelFactory",
      function ($scope, TemplatePresetsService, TemplateService, ModelFactory) {
        $scope.templatePresets = TemplatePresetsService.getPresets();
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
            .then(function (template) {
              $scope.templates.push(template);
            });
        };

        $scope.removeTemplate = function (template) {
          var templateId = template.id;
          TemplateService.removeTemplate(templateId)
            .then(function () {
              _.remove($scope.templates, function (template) { return template.id === templateId; });
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
      "$stateParams",
      "Cerberus.TemplateEngine.Service.Template",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.DataBag",
      function ($scope, $stateParams, TemplateService, EventService, DataBagService) {
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

    _.forEach(template.Resolutions, function (resolution) {
      if (!previousResolution) {
        generatedCSS += String.format("@media(max-width:{0}px){", resolution.resolutionValue);
      }
      else {
        generatedCSS += String.format("@media(min-width:{0}px) and (max-width:{1}px){", previousResolution.resolutionValue + 1, resolution.resolutionValue);
      }

      _.forIn(resolution.componentVisualProperties, function (visualProperties, componentId) {
        generatedCSS += String.format("#TC{0} { {1} }", componentId, visualProperties);
      });

      generatedCSS += "}";

      previousResolution = resolution;
    });

    return generatedCSS;
  }
})(window.angular, window.$, window._);