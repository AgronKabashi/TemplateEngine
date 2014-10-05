define(
	[
		"../App.js"
	],
	function (app)
	{
		app.directive("messagedialog", function ()
			{
				return {
					restrict: "E",
					template: '<div class="ng-cloak">{{ Message }}</div>',
					
					link: function (scope, element, attributes)
					{
						scope.$on("ShowMessage", function (scope, message)
						{
							alert(message);
						});
					}
				};
			});
	});