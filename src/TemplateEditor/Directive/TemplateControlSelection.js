define(
	[
		"../App.js"
	],
	function (app)
	{
		return app
			.directive("csTemplateControlSelection",
			[
				"$timeout",
				function ($timeout)
				{
					return {
						restrict: "A",
						link: function (scope, element, attributes)
						{
							//TODO: Fix
							$timeout(function ()
							{
								element
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
						}
					};
				}
			]);
	});