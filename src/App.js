define(
	[
		"angular",
		"TemplateEngine/Service/Template.js"
	],
	function (angular)
	{
		angular
			.module("Demo", ["Cerberus.Tool.TemplateEngine.Service.Template"])
			.config(
			[
				"Cerberus.Tool.TemplateEngine.Service.TemplateProvider",
				function (TemplateProvider)
				{
					TemplateProvider.SetProvider(Cerberus.Tool.TemplateEngine.Service.TemplateLocalStorageProvider);
				}
			])
			.service("TemplatePresetsService", function ($http)
			{
				var presets = [];

				this.GetPresets = function ()
				{
					$http
						.get("template-presets.json")
						.then(function (response)
						{
							angular.extend(presets, response.data.TemplatePresets);
						});

					return presets;
				};
			})
			.controller("DemoController",
			[
				"$scope",
				"TemplatePresetsService",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				function ($scope, TemplatePresetsService, TemplateService)
				{
					$scope.TemplatePresets = TemplatePresetsService.GetPresets();
					TemplateService.GetTemplates()
						.then(function (templates)
						{
							$scope.Templates = templates;
						});

					$scope.AddTemplate = function (templatePreset)
					{
						var template;

						if (templatePreset)
						{
							template = angular.extend({}, templatePreset.Data);
							template.Name = templatePreset.Name;
						}
						else
						{
							template = new Cerberus.Tool.TemplateEngine.Model.Template();
							template.Name = "Template";
							template.Resolutions.push(new Cerberus.Tool.TemplateEngine.Model.Resolution());
						}

						TemplateService.SaveTemplate(template)
							.then(function (template)
							{
								$scope.Templates.push(template);
							});
					};

					$scope.RemoveTemplate = function (template)
					{
						TemplateService.RemoveTemplate(template.Id)
							.then(function()
							{
								$scope.Templates.RemoveValue("Id", template.Id);
							});
					};
				}
			]);

		require(["domReady!"], function (document)
		{
			angular.bootstrap(document, ["Demo"]);
		});
	});