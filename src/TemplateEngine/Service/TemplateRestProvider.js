define(
	[
		"angular",
		"ResourceBuilder"
	],
	function (angular, ResourceBuilder)
	{
		namespace("Cerberus.Tool.TemplateEngine.Service").TemplateRestProvider = angular.extend(function ($http, $q)
		{
			var serviceUrl = "";

			function CleanPromise(promise)
			{
				var defer = $q.defer();

				promise
					.then(function (response)
					{
						defer.resolve(response.data);
					})
					.catch(function ()
					{
						defer.reject();
					});

				return defer.promise;
			};

			this.Configure = function (url)
			{
				serviceUrl = url;
			};

			//Template
			this.GetTemplate = function (templateId)
			{
				return CleanPromise($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "template", ~~templateId)));
			};

			this.RemoveTemplate = function (templateId)
			{
				return CleanPromise($http.delete(ResourceBuilder.BuildResourceUrl(serviceUrl, "template", ~~templateId)));
			};

			this.SaveTemplate = function (template)
			{
				return CleanPromise($http.put(ResourceBuilder.BuildResourceUrl(serviceUrl, "template"), template));
			};

			this.CloneTemplate = function (templateId)
			{
				return CleanPromise($http.post(ResourceBuilder.BuildResourceUrl(serviceUrl, "template", ~~templateId, "clone")));
			};

			//Templates
			this.GetTemplates = function ()
			{
				return CleanPromise($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "templates")));
			};

			//TemplateInfo
			this.GetTemplateInfo = function (templateId)
			{
				return CleanPromise($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "templateinfo", ~~templateId)));
			};

			this.SaveTemplateInfo = function (template)
			{
				return CleanPromise($http.put(ResourceBuilder.BuildResourceUrl(serviceUrl, "templateinfo"), template));
			};

			//TemplateContent
			this.GetDocument = function (templateId, documentId, documentTypeId)
			{
				return CleanPromise($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "templatecontent", ~~templateId, ~~documentId, ~~documentTypeId)));
			};

			this.SaveDocument = function (template, documentId, documentTypeId)
			{
				return CleanPromise($http.put(ResourceBuilder.BuildResourceUrl(serviceUrl, "templatecontent", ~~documentId, documentTypeId), template));
			};

			this.GetControlPlugins = function ()
			{
				return CleanPromise($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "controlplugins")));
			};
		},
		{
			$inject: ["$http", "$q"]
		});
	});