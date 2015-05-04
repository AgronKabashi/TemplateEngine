(function (angular) {
  namespace("Cerberus.TemplateEngine.Service")
    .TemplateLocalStorageProvider = angular.extend(function ($q) {
      var repository;

      function updateLocalStorage() {
        localStorage.setItem("TemplateRepository", JSON.stringify(repository));
      }

      this.Configure = function (data) { };

      repository = JSON.parse(localStorage.getItem("TemplateRepository")) || { Templates: {} };

      this.GetTemplate = function (templateId, documentId, documentTypeId) {
        return $q.when(repository.Templates[templateId]);
      };

      this.RemoveTemplate = function (templateId) {
        delete repository.Templates[templateId];
        updateLocalStorage();

        return $q.when(true);
      };

      this.SaveTemplate = function (template) {
        return $q.when(template)
          .then(function (template) {
            if (template.Id <= 0) {
              template.Id = ~~_.max(repository.Templates, function (template) {
                return template.Id;
              }).Id + 1;
            }

            repository.Templates[template.Id] = template;

            if (!template.Resolutions.length) {
              template.Resolutions.push(new Cerberus.TemplateEngine.Model.Resolution());
            }

            var components = template.Components,
                resolutions = template.Resolutions,
                newResolutions = _.filter(resolutions, function (resolution) { return resolution.Id === 0; }),
                highestComponentId = ~~Math.max(0, _.max(components, function (component) { return component.Id; }).Id),
                highestResolutionId = ~~Math.max(0, _.max(newResolutions, function (resolution) { return resolution.Id; }).Id),
                newComponents = _.filter(components, function (component) { return component.Id < 0; });

            //Generate unique ids for resolutions
            _.forEach(newResolutions, function (resolution) {
              resolution.Id = ++highestResolutionId;
            });

            //Generate unique Ids for components
            _.forEach(newComponents, function (component) {
              var oldId = component.Id;
              component.Id = ++highestComponentId;

              //Sync Id across resolutions
              _.forEach(resolutions, function (resolution) {
                resolution.ComponentVisualProperties[component.Id] = resolution.ComponentVisualProperties[oldId];
                delete resolution.ComponentVisualProperties[oldId];
              });
            });

            updateLocalStorage();

            return template;
          });
      };

      this.CloneTemplate = function (templateId, successCallback, errorCallback) {
      };

      this.GetTemplates = function () {
        var templates = _.map(repository.Templates, function (template) {
          return template;
        });

        return $q.when(templates);
      };

      this.GetTemplateInfo = function (templateId) {
        return this.GetTemplate(templateId);
      };

      this.SaveTemplateInfo = function (template) {

      };

      //TemplateContent
      this.GetDocument = function (templateId, documentId, documentTypeId) {

      };

      this.SaveDocument = function (template, documentId, documentTypeId) {

      };

      this.GetComponentPlugins = function () {
        return $q.when([
          {
            Id: 1,
            Name: "Text",
            Category: "Basic",
            ComponentType: "Cerberus.TemplateEngine.Controller.Component.Basic.Text",
            ImageUrl: "Text.png"
          },
          {
            Id: 2,
            Name: "Video",
            Category: "Basic",
            ComponentType: "Cerberus.TemplateEngine.Controller.Component.Basic.Video",
            ImageUrl: "Video.png"
          },
          {
            Id: 3,
            Name: "YouTube",
            Category: "Basic",
            ComponentType: "Cerberus.TemplateEngine.Controller.Component.Basic.YouTube",
            ImageUrl: "YouTube.png"
          },
          {
            Id: 4,
            Name: "Link",
            Category: "Navigation",
            ComponentType: "Cerberus.TemplateEngine.Controller.Component.Navigation.Link",
            ImageUrl: "Link.png"
          },
          {
            Id: 5,
            Name: "RSS",
            Category: "SocialMedia",
            ComponentType: "Cerberus.TemplateEngine.Controller.Component.SocialMedia.RSS",
            ImageUrl: "RSS.png"
          },
          {
            Id: 6,
            Name: "Sharer",
            Category: "SocialMedia",
            ComponentType: "Cerberus.TemplateEngine.Controller.Component.SocialMedia.Sharer",
            ImageUrl: "Sharer.png"
          }
        ]);
      };
    },
	{
	  $inject: ["$q"]
	});
})(angular);