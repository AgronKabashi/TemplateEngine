define(
	[
		"require",
		"angular",
		"angular-sanitize",

		//Services
		"./Service/Template.js",
		"./Service/DataBag.js"
	],
	function (require, angular)
	{
		return angular
			.module("Cerberus.Tool.TemplateEngine",
				[
					"ng",
					"ngSanitize",
					"Cerberus.Tool.TemplateEngine.Service.DataBag",
					"Cerberus.Tool.TemplateEngine.Service.Template"
				])
			.constant("TemplateEnginePath", require.toUrl("."))
			.config(
				[
					"$controllerProvider",
					"$compileProvider",
					function ($controllerProvider, $compileProvider)
					{
						var app = angular.module("Cerberus.Tool.TemplateEngine");
						app.controller = function (id, args) {
							$controllerProvider.register(id, args);
							return app;
						};

						app.directive = function (id, args) {
							$compileProvider.directive(id, args);
							return app;
						};
					}
				])
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
						//The template is supplied from outside
						$scope.Template = DataBagService.GetData("Template");
						$scope.BaseControlPath = PathResolverService.Resolve("View/Base.html");

						$scope.$on("ReloadTemplate", function (scope, template)
						{
							$scope.Template = template;
							DataBagService.AddData("Template", $scope.Template);
						});
					}
				]);
	});