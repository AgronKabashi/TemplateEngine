define(
	[
		"../App.js"
	],
	function (app)
	{
		return app
			.directive("csDroppable",
			[
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				function (TemplateEditorHelper)
				{
					return {
						restrict: "A",
						scope: false,
						link: function (scope, element, attributes)
						{
							TemplateEditorHelper.EnableDrop(scope, element.find(".template"));
						}
					};
				}
			]);
	});