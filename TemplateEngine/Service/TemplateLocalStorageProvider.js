namespace("Cerberus.Tool.TemplateEngine.Service")
	.TemplateLocalStorageProvider = function()
	{
		var repository;
		function updateLocalStorage()
		{
			localStorage.setItem("TemplateRepository", JSON.stringify(repository));
		}

		this.Configure = function (data) {};
					
		if ((repository = JSON.parse(localStorage.getItem("TemplateRepository"))) === undefined)
		{
			repository = {};
			updateLocalStorage();
		}

		this.GetTemplate = function (templateId, documentId, documentTypeId)
		{
			return repository.Templates[templateId];
		};

		this.GetTemplates = function ()
		{
			return repository.Templates;
		};

		this.SaveTemplate = function (template, successCallback, errorCallback)
		{
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

			if (successCallback)
			{
				successCallback(true, { d: template });
			}
		};

		this.RemoveTemplate = function (templateId, successCallback, errorCallback)
		{
			updateLocalStorage();
		};

		this.GetControlPlugins = function ()
		{
			return [
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
			];
		};

		this.CloneTemplate = function (templateId, successCallback, errorCallback)
		{
		};
	};