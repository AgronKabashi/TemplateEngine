define(
	[
		"angular"
	],
	function (angular)
	{
		namespace("Cerberus.Tool.TemplateEngine.Service").TemplateLocalStorageProvider = angular.extend(function ($q)
		{
			var repository;
			function updateLocalStorage()
			{
				localStorage.setItem("TemplateRepository", JSON.stringify(repository));
			}

			this.Configure = function (data) { };

			repository = JSON.parse(localStorage.getItem("TemplateRepository")) || { Templates: {} };

			this.GetTemplate = function (templateId, documentId, documentTypeId)
			{
				return $q.when(repository.Templates[templateId]);
			};

			this.RemoveTemplate = function (templateId)
			{
				delete repository.Templates[templateId];
				updateLocalStorage();

				return $q.when(true);
			};

			this.SaveTemplate = function (template)
			{
				return $q.when(template)
					.then(function (template)
					{
						if (template.Id <= 0)
						{
							template.Id = ~~_.max(repository.Templates, function (template)
							{
								return template.Id;
							}).Id + 1;
						}

						repository.Templates[template.Id] = template;

						var templateControls = template.TemplateControls;
						var resolutions = template.Resolutions;
						var newResolutions = _.where(resolutions, function (resolution) { return resolution.Id === 0; });
						var highestTemplateControlId = ~~Math.max(0, _.max(templateControls, function (templateControl) { return templateControl.Id; }).Id);
						var highestResolutionId = ~~Math.max(0, _.max(newResolutions, function (resolution) { return resolution.Id; }).Id);
						var newTemplateControls = _.where(templateControls, function (templateControl) { return templateControl.Id < 0; });

						//Generate unique ids for resolutions
						_.forEach(newResolutions, function (resolution)
						{
							resolution.Id = ++highestResolutionId;
						});

						//Generate unique Ids for template controls
						_.forEach(newTemplateControls, function (templateControl)
						{
							var oldId = templateControl.Id;
							templateControl.Id = ++highestTemplateControlId;

							//Sync Id across resolutions
							_.forEach(resolutions, function (resolution)
							{
								var reference = _.find(resolution.TemplateControlVisualProperties, { Key: oldId });
								reference.Key = templateControl.Id;
							});
						});

						updateLocalStorage();

						return template;
					});
			};

			this.CloneTemplate = function (templateId, successCallback, errorCallback)
			{
			};

			this.GetTemplates = function ()
			{
				var templates = _.map(repository.Templates, function (template)
				{
					return template;
				});

				return $q.when(templates);
			};

			this.GetTemplateInfo = function (templateId)
			{
				return this.GetTemplate(templateId);
			};

			this.SaveTemplateInfo = function (template)
			{

			};

			//TemplateContent
			this.GetDocument = function (templateId, documentId, documentTypeId)
			{

			};

			this.SaveDocument = function (template, documentId, documentTypeId)
			{

			};

			this.GetControlPlugins = function ()
			{

			};

			this.GetControlPlugins = function ()
			{
				return $q.when([
					{
						Id: 1,
						Name: "Text",
						Category: "Basic",
						ControlType: "Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Basic.Text",
						ImageUrl: "Text.png"
					},
					{
						Id: 2,
						Name: "Video",
						Category: "Basic",
						ControlType: "Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Basic.Video",
						ImageUrl: "Video.png"
					},
					{
						Id: 3,
						Name: "YouTube",
						Category: "Basic",
						ControlType: "Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Basic.YouTube",
						ImageUrl: "YouTube.png"
					},
					{
						Id: 4,
						Name: "Link",
						Category: "Navigation",
						ControlType: "Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Navigation.Link",
						ImageUrl: "Link.png"
					},
					{
						Id: 5,
						Name: "RSS",
						Category: "SocialMedia",
						ControlType: "Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.SocialMedia.RSS",
						ImageUrl: "RSS.png"
					},
					{
						Id: 6,
						Name: "Sharer",
						Category: "SocialMedia",
						ControlType: "Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.SocialMedia.Sharer",
						ImageUrl: "Sharer.png"
					}
				]);
			};
		},
		{
			$inject: ["$q"]
		});
	});