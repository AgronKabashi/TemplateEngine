define(
	[
		"../App.js"
	],
	function (app)
	{
		return app
			.directive("csAutosizeTemplate",
			[
				"$timeout",
				function ($timeout)
				{
					return {
						restrict: "A",
						link: function (scope, element, attributes)
						{
							var templateElement = element.children(".template");

							function UpdateTemplateHeight(scope, templateControl, isSecondExecution)
							{
								var scrollTop = templateElement.parent().scrollTop();
								templateElement.css("height", "auto");

								var height = templateElement.get(0).scrollHeight + "px";

								templateElement.css("height", height);
								templateElement.parent().scrollTop(scrollTop);

								//HACK!
								//Because of CSS transitions, some elements are not fully transformed after their properties are changed so detecting the height
								//can be tricky. By calling the method again, only 400ms later we can assume that the transition has finished and recalculate the height
								if (!isSecondExecution)
								{
									$timeout(function ()
									{
										UpdateTemplateHeight(scope, templateControl, true);
									}, 400);
								}
							}

							scope.$on("TemplateControlUpdated", UpdateTemplateHeight);
							scope.$on("ResolutionSelected", UpdateTemplateHeight);
							scope.$on("TemplateControlAdded", UpdateTemplateHeight);
							scope.$on("TemplateControlContentUpdated", UpdateTemplateHeight);
						}
					};
				}
			]);
	});