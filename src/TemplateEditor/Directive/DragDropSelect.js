define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("enableDragDropSelect",
			[
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				function (TemplateEditorHelper)
				{
					return {
						restrict: "A",
						link: function (scope, element, attributes)
						{
							var templateElement = element.find(".template");

							scope.$on("ShowHiddenElements", function (scope, enable)
							{
								if (enable)
								{
									templateElement.addClass("show-hidden-elements");
								}
								else
								{
									templateElement.removeClass("show-hidden-elements");
								}
							});

							//TODO: Fix
							setTimeout(function ()
							{
								TemplateEditorHelper.EnableDraggableResizableSelectable(scope, templateElement);
								$("body").addClass("animatable");
							}, 1000);

							scope.$on("ReloadTemplate", function ()
							{
								//TODO: Fix
								setTimeout(function ()
								{
									TemplateEditorHelper.EnableDraggableResizableSelectable(scope, templateElement);
								}, 0);
							});

							TemplateEditorHelper.EnableDrop(scope, templateElement);
						}
					};
				}
			])
			.directive("enableSelect",
			[
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				function (TemplateEditorHelper)
				{
					return {
						restrict: "A",
						link: function (scope, element, attributes)
						{
							var templateElement = element.find(".template");

							//TODO: Fix
							setTimeout(function ()
							{
								TemplateEditorHelper.EnableSelectable(scope, templateElement);
							}, 1000);

							scope.$on("ReloadTemplate", function ()
							{
								//TODO: Fix
								setTimeout(function ()
								{
									TemplateEditorHelper.EnableSelectable(scope, templateElement);
								}, 0);
							});
						}
					};
				}
			]);
	});