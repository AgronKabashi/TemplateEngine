define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("enableDragDropSelect",
			[
				"$timeout",
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				function ($timeout, TemplateEditorHelper)
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
							$timeout(function ()
							{
								$("body")
									.addClass("animatable")
									.click(function (event)
									{
										var target = $(event.target);

										//Do not deselect template controls if the user is switching between resolutions
										if (target.hasClass("resolution"))
										{
											return;
										}

										$(".template-control.selected").removeClass("selected");

										scope.$emit("TemplateControlSelected", null);
										scope.$digest();
									});
							}, 1000);

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