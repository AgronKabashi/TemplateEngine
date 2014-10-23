define(
	[
		//Global Dependencies
		"angular",
		"LazyConfig",
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
	function (angular, LazyConfig)
	{
		var moduleId = "Cerberus.Tool.TemplateEditor";
		return angular
			.module(moduleId,
			[
				"ui.router",
				"Cerberus.Tool.TemplateEngine",
				"Cerberus.Tool.TemplateEditor.Localization",
				"Cerberus.Tool.TemplateEditor.Service.StyleSetting",
				"Cerberus.Tool.TemplateEditor.Service.History",
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				"Cerberus.Tool.TemplateEditor.Helper.CSS"
			])
			.constant("TemplateEditorPath", window.location.pathname)
			.config(LazyConfig(moduleId))
			.config(
			[
				"Cerberus.Tool.TemplateEngine.Service.TemplateProvider",
				function (TemplateProvider)
				{
					TemplateProvider.SetProvider(Cerberus.Tool.TemplateEngine.Service.TemplateLocalStorageProvider);
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