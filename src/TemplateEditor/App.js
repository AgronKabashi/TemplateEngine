define(
	[
		//Global Dependencies
		"angular",
		"angular-ui-router",

		//External Dependencies
		"../TemplateEngine/App.js",
		"../TemplateEngine/Directive/TemplateRenderer.js",

		//Local Depdendencies
		"./Localization/en-us.js",

		"./Service/StyleSetting.js",
		"./Service/History.js",

		"./Helper/TemplateEditor.js",
		"./Helper/CSS.js"
	],
	function (angular)
	{
	  return angular
			.module("Cerberus.Tool.TemplateEditor",
			[
				"ng",
				"ui.router",
				"Cerberus.Tool.TemplateEngine",
				"Cerberus.Tool.TemplateEditor.Localization",
				"Cerberus.Tool.TemplateEditor.Service.StyleSetting",
				"Cerberus.Tool.TemplateEditor.Service.History",
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				"Cerberus.Tool.TemplateEditor.Helper.CSS"
			])
			.constant("TemplateEditorPath", window.location.pathname)
			.config(
			[
				"$controllerProvider",
				"$compileProvider",
				"Cerberus.Tool.TemplateEngine.Service.TemplateProvider",
				function ($controllerProvider, $compileProvider, TemplateEngineProvider)
				{
					TemplateEngineProvider.SetProvider(Cerberus.Tool.TemplateEngine.Service.TemplateLocalStorageProvider);

					var app = angular.module("Cerberus.Tool.TemplateEditor");
					app.controller = function (id, args)
					{
						$controllerProvider.register(id, args);
						return app;
					};

					app.directive = function (id, args)
					{
						$compileProvider.directive(id, args);
						return app;
					};
				}
			])
			.service("Cerberus.Tool.TemplateEditor.Service.PathResolver",
			[
				"TemplateEditorPath",
				function (modulePath)
				{
				  this.Resolve = function (path)
				  {
				    return String.format("{0}{1}", modulePath, path);
				  };
				}
			]);
	});