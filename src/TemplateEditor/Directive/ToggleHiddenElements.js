define(
	[
		"../App.js"
	],
	function (app)
	{
		return app
			.directive("csToggleHiddenElements", function ()
			{
				return {
					restrict: "A",
					scope: false,
					link: function (scope, element, attributes)
					{
						var templateElement = element.find(".template");

						scope.$on("ShowHiddenElements", function (scope, enable)
						{
							if (enable)
							{
								element.addClass("show-hidden-elements");
							}
							else
							{
								element.removeClass("show-hidden-elements");
							}
						});
					}
				}
			});
	});