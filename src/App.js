(function (angular, $, _) {
  angular
    .module("Demo", [
      "ui.router",
      "Cerberus.TemplateEngine",
      "Cerberus.TemplateEditor"
    ])
    .config([
      "$stateProvider",
      "$urlRouterProvider",
      "Cerberus.TemplateEngine.Service.TemplateProvider",
      function ($stateProvider, $urlRouterProvider, TemplateProvider) {
        TemplateProvider.SetProvider(Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider);

        $stateProvider
          .state("Home", {
          url: "/home",
          templateUrl: "home.html",
          controller: "Demo.Controller.Home"
        })
          .state("Design", {
          url: "/design/:Id",
          templateUrl: "TemplateEditor/View/Design.html",
          controller: "Demo.Controller.Design"
        })
          .state("View", {
          url: "/view/:Id",
          templateUrl: "view.html",
          controller: "Demo.Controller.View"
        });
  
        $urlRouterProvider.otherwise("/home");
      }
    ])
    .service("TemplatePresetsService", [
      "$http",
      function ($http) {
        var presets = [];
  
        this.GetPresets = function () {
          $http
            .get("template-presets.json")
            .then(function (response) {
            angular.extend(presets, response.data.TemplatePresets);
          });
  
          return presets;
        };
      }
    ])
    .controller("Demo.Controller.Home", [
      "$scope",
      "TemplatePresetsService",
      "Cerberus.TemplateEngine.Service.Template",
      function ($scope, TemplatePresetsService, TemplateService) {
        $scope.TemplatePresets = TemplatePresetsService.GetPresets();
        TemplateService.GetTemplates()
          .then(function (templates) {
          $scope.Templates = templates;
        });
  
        $scope.AddTemplate = function (templatePreset) {
          var template;
  
          if (templatePreset) {
            template = angular.extend({}, templatePreset.Data);
            template.Name = templatePreset.Name;
          }
          else {
            template = new Cerberus.TemplateEngine.Model.Template();
            template.Name = "Template";
          }
  
          TemplateService.SaveTemplate(template)
            .then(function (template) {
            $scope.Templates.push(template);
          });
        };
  
        $scope.RemoveTemplate = function (template) {
          var templateId = template.Id;
          TemplateService.RemoveTemplate(templateId)
            .then(function () {
            _.remove($scope.Templates, function (template) { return template.Id === templateId; });
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
        var templateId = $stateParams.Id || 0;
        TemplateService
          .GetTemplate(templateId)
          .then(function (template) {
          $scope.TemplateCSS = GenerateCSS(template);
          EventService.Notify("InitializeTemplate", template);
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
        var templateId = $stateParams.Id || 0;
        TemplateService
          .GetTemplate(templateId)
          .then(function (template) {
          DataBagService.AddData("Template", template);
          EventService.Notify("InitializeTemplate", template);
        });
      }
    ]);

  $(document).ready(function () {
    angular.bootstrap(document, ["Demo"]);
  });

  //For demo purposes only - should be served as a CSS file by the server instead
  function GenerateCSS(template) {
    var previousResolution;
    var generatedCSS = "";

    _.forEach(template.Resolutions, function (resolution) {
      if (!previousResolution) {
        generatedCSS += String.format("@media(max-width:{0}px){", resolution.ResolutionValue);
      }
      else {
        generatedCSS += String.format("@media(min-width:{0}px) and (max-width:{1}px){", previousResolution.ResolutionValue + 1, resolution.ResolutionValue);
      }

      _.forIn(resolution.ComponentVisualProperties, function (visualProperties, componentId) {
        generatedCSS += String.format("#TC{0} { {1} }", componentId, visualProperties);
      });

      generatedCSS += "}";

      previousResolution = resolution;
    });

    return generatedCSS;
  }
})(window.angular, window.$, window._);