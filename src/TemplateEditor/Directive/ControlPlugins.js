define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("controlplugins", function ()
			{
				return {
					restrict: "E",
					templateUrl: "View/ControlPlugins.html",

					link: function (scope, element, attrs)
					{
						setTimeout(function ()
						{
							var cursorAt = { left: 0, top: 0 };
							element
								.find(".control-plugin")
								.draggable(
								{
									helper: "clone",
									"cursorAt": cursorAt,

									start: function ()
									{
										var controlPluginElement = $(this);
										controlPluginElement.data("control-info",
										{
											ControlType: controlPluginElement.attr("data-control-type"),
											Category: controlPluginElement.attr("data-control-category"),
											Name: controlPluginElement.attr("data-name"),
											CursorAt: cursorAt
										});

										scope.IsExpanded = false;
										scope.$digest();
									}
								});

						}, 1000);
					},

					controller:
					[
						"$scope",
						"Cerberus.Tool.TemplateEngine.Service.Template",
						function ($scope, TemplateEngineService)
						{
							TemplateEngineService.GetControlPlugins()
								.then(function(controlPlugins)
								{
									$scope.ControlPlugins = controlPlugins;
								});
						}
					]
				};
			});
	});