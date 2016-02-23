/*eslint no-unused-vars:0*/
/*eslint no-shadow:0*/
(function (angular, _, localStorage) {
  "use strict";

  var ModelFactory = angular.module("Cerberus.ModelFactory");

  function TemplateLocalStorageProvider($q) {
    var repository = JSON.parse(localStorage.getItem("TemplateRepository"));
    if (!repository || !repository.templates) {
      repository = { templates: {} };
    }

    function updateLocalStorage() {
      localStorage.setItem("TemplateRepository", JSON.stringify(repository));
    }

    this.configure = function () { };

    this.getTemplate = function (templateId, documentId, documentTypeId) {
      return $q.when(repository.templates[templateId]);
    };

    this.removeTemplate = function (templateId) {
      delete repository.templates[templateId];
      updateLocalStorage();

      return $q.when(true);
    };

    this.saveTemplate = function (template) {
      return $q.when(template)
        .then(function (template) {
          if (template.id <= 0) {
            template.id = ~~_.max(repository.templates, function (template) {
              return template.id;
            }).id + 1;
          }

          repository.templates[template.id] = template;

          if (!template.resolutions.length) {
            template.resolutions.push(ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Resolution"));
          }

          var components = template.components,
            resolutions = template.resolutions;

          var newResolutions = _.filter(resolutions, function (resolution) {
            return resolution.id === 0;
          });

          var highestComponentId = ~~Math.max(0, _.max(components, function (component) {
            return component.id;
          }).id);

          var highestResolutionId = ~~Math.max(0, _.max(resolutions, function (resolution) {
            return resolution.id;
          }).id);

          var newComponents = _.filter(components, function (component) {
            return component.id < 0;
          });

          //Generate unique ids for resolutions
          _.forEach(newResolutions, function (resolution) {
            resolution.id = ++highestResolutionId;
          });

          //Generate unique Ids for components
          _.forEach(newComponents, function (component) {
            var oldId = component.id;
            component.id = ++highestComponentId;

            //Sync Id across resolutions
            _.forEach(resolutions, function (resolution) {
              resolution.componentVisualProperties[component.id] = resolution.componentVisualProperties[oldId];
              delete resolution.componentVisualProperties[oldId];
            });
          });

          repository.templates[template.id] = template;
          updateLocalStorage();

          return template;
        });
    };

    this.cloneTemplate = function (templateId, successCallback, errorCallback) { };

    this.getTemplates = function () {
      var templates = _.map(repository.templates, function (template) {
        return template;
      });

      return $q.when(templates);
    };

    this.getTemplateInfo = function (templateId) {
      return this.getTemplate(templateId);
    };

    this.saveTemplateInfo = function (template) {

    };

    //TemplateContent
    this.getDocument = function (templateId, documentId, documentTypeId) {

    };

    this.saveDocument = function (template, documentId, documentTypeId) {

    };

    this.getComponentPlugins = function () {
      return $q.when([
        {
          id: 1,
          name: "text",
          category: "basic",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Basic.Text",
          imageUrl: "text.png"
        },
        {
          id: 2,
          name: "video",
          category: "basic",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Basic.Video",
          imageUrl: "video.png"
        },
        {
          id: 3,
          name: "youTube",
          category: "basic",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Basic.YouTube",
          imageUrl: "youTube.png"
        },
        {
          id: 4,
          name: "link",
          category: "navigation",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Navigation.Link",
          imageUrl: "link.png"
        },
        {
          id: 5,
          name: "rss",
          category: "socialMedia",
          componentType: "Cerberus.TemplateEngine.Controller.Component.SocialMedia.Rss",
          imageUrl: "rss.png"
        },
        {
          id: 6,
          name: "sharer",
          category: "socialMedia",
          componentType: "Cerberus.TemplateEngine.Controller.Component.SocialMedia.Sharer",
          imageUrl: "sharer.png"
        },
        {
          id: 7,
          name: "labelList",
          category: "gmail",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Gmail.LabelList",
          imageUrl: "gmail.png"
        },
        {
          id: 8,
          name: "messageList",
          category: "gmail",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Gmail.MessageList",
          imageUrl: "gmail.png"
        },
        {
          id: 9,
          name: "messageContent",
          category: "gmail",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Gmail.MessageContent",
          imageUrl: "gmail.png"
        },
        {
          id: 10,
          name: "authorization",
          category: "gmail",
          componentType: "Cerberus.TemplateEngine.Controller.Component.Gmail.Authorization",
          imageUrl: "gmail.png"
        }
      ]);
    };
  }

  ModelFactory.registerModel("Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider", angular.extend(TemplateLocalStorageProvider, { $inject: ["$q"] }));
})(window.angular, window._, window.localStorage);