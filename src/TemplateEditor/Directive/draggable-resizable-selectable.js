define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("csDraggableSelectableResizable",
			[
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				function(TemplateEditorHelper)
				{
					return {
						link: function(scope, element, attributes)
						{
							TemplateEditorHelper.EnableDraggable(scope, element);
							TemplateEditorHelper.EnableResizable(scope, element);
							TemplateEditorHelper.EnableSelectable(scope, element);
						}
					};
				}
			]);
	});