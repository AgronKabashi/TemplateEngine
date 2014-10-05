define(
	[
		"./App.js",
		"./Controller/TemplateEditor.js",
		"./Controller/ContentEditor.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.config(
			[
				"$stateProvider",
				"$urlRouterProvider",
				function ($stateProvider, $urlRouterProvider)
				{
					$stateProvider
						.state("Template",
						{
							url: "/Template/:TemplateId",
							controller: "Cerberus.Tool.TemplateEditor.Controller.TemplateEditor",
							templateUrl: "View/TemplateEditor.html"
						})
						.state("Content",
						{
							url: "/Content/:TemplateId/:DocumentId/:DocumentTypeId",
							controller: "Cerberus.Tool.TemplateEditor.Controller.ContentEditor",
							templateUrl: "View/ContentEditor.html"
						});
				}
			]);
	});