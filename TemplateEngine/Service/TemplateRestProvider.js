namespace("Cerberus.Tool.TemplateEngine.Service")
	.TemplateRestProvider = function (HttpPostService)
	{
		var serviceUrl = "";

		this.Configure = function (url)
		{
			serviceUrl = url;
		};

		this.GetTemplateInfo = function (templateId)
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/GetTemplateInfo",
				Parameters:
				{
					"templateId": templateId
				},
				DefaultValue: new Cerberus.Tool.TemplateEngine.Model.Template(),
				MergeResultWithDefaultValue: true
			});
		};

		this.GetTemplate = function (templateId, documentId, documentTypeId)
		{
			documentId = ~~documentId;
			documentTypeId = ~~documentTypeId;

			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/GetTemplate",
				Parameters:
				{
					"templateId": templateId,
					"documentId": documentId,
					"documentTypeId": documentTypeId
				},
				DefaultValue: new Cerberus.Tool.TemplateEngine.Model.Template(),
				MergeResultWithDefaultValue: true
			});
		};

		this.GetTemplates = function ()
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/GetTemplates",
				DefaultValue: [],
				MergeResultWithDefaultValue: true
			});
		};

		this.SaveTemplateInfo = function (template, successCallback, errorCallback)
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/SaveTemplateInfo",
				Parameters:
				{
					"template": template
				},
				SuccessCallback: successCallback,
				ErrorCallback: errorCallback
			});
		};

		this.SaveTemplate = function (template, successCallback, errorCallback)
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/SaveTemplate",
				Parameters:
				{
					"template": template
				},
				SuccessCallback: successCallback,
				ErrorCallback: errorCallback
			});
		};

		this.SaveTemplateContent = function (template, documentId, documentTypeId, successCallback, errorCallback)
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/SaveTemplateContent",
				Parameters:
				{
					"template": template,
					"documentId": documentId,
					"documentTypeId": documentTypeId
				},
				SuccessCallback: successCallback,
				ErrorCallback: errorCallback
			});
		};

		this.RemoveTemplate = function (templateId, successCallback, errorCallback)
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/RemoveTemplate",
				Parameters:
				{
					"templateId": templateId
				},
				SuccessCallback: successCallback,
				ErrorCallback: errorCallback
			});
		};

		this.GetControlPlugins = function ()
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/GetControlPlugins",
				DefaultValue: [],
				MergeResultWithDefaultValue: true
			});
		};

		this.CloneTemplate = function (templateId, successCallback, errorCallback)
		{
			return HttpPostService.ExecuteCommand(
			{
				Url: serviceUrl + "/CloneTemplate",
				Parameters:
				{
					"templateId": templateId
				},
				DefaultValue: 0,
				MergeResultWithDefaultValue: true,
				SuccessCallback: successCallback,
				ErrorCallback: errorCallback
			});
		};
	};

namespace("Cerberus.Tool.TemplateEngine.Service").TemplateRestProvider.$inject = ["Cerberus.Service.HttpService"];