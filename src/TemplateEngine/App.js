define(
	[
		"require",
		"angular",
		"LazyConfig",
		"angular-sanitize",

		//Services
		"./Service/Template.js",
		"./Service/DataBag.js"
	],
	function (require, angular, LazyConfig)
	{
		var moduleId = "Cerberus.Tool.TemplateEngine";
		return angular
			.module(moduleId,
				[
					"ngSanitize",
					"Cerberus.Tool.TemplateEngine.Service.DataBag",
					"Cerberus.Tool.TemplateEngine.Service.Template"
				])
			.constant("TemplateEnginePath", require.toUrl("."))
			.config(LazyConfig(moduleId))
			.service("Cerberus.Tool.TemplateEngine.Service.PathResolver",
				[
					"TemplateEnginePath",
					function (modulePath)
					{
						this.Resolve = function (path)
						{
							return String.format("{0}/{1}", modulePath, path);
						};
					}
				])
			.controller("Cerberus.Tool.TemplateEngine",
				[
					"$scope",
					"Cerberus.Tool.TemplateEngine.Service.Template",
					"Cerberus.Tool.TemplateEngine.Service.DataBag",
					"Cerberus.Tool.TemplateEngine.Service.PathResolver",
					function ($scope, TemplateEngineService, DataBagService, PathResolverService)
					{
						$scope.BaseControlPath = PathResolverService.Resolve("View/Base.html");
						//The template is supplied from outside
						DataBagService.GetData("Template")
							.then(function (template)
							{
								$scope.Template = template;
							});

						$scope.$on("ReloadTemplate", function (scope, template)
						{
							$scope.Template = template;
						});
					}
				]);
	});