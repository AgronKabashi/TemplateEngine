define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("controlpluginfilter", function ()
			{
				return {
					restrict: "E",
					templateUrl: "View/ControlPluginFilter.html",

					controller:
					[
						"$scope",
						function ($scope)
						{
							if (!$scope.Enabled)
							{
								return;
							}

							$scope.Filters =
								[
									{
										Name: "All",
										Selected: true
									},
									{
										Name: "Basic",
										Category: "Basic"
									},
									{
										Name: "Navigation",
										Category: "Navigation"
									},
									{
										Name: "Socal Media",
										Category: "SocialMedia"
									}
								];

							$scope.CurrentFilter = $scope.Filters[0];

							$scope.SetFilter = function (filter)
							{
								$scope.CurrentFilter.Selected = false;
								filter.Selected = true;
								$scope.CurrentFilter = filter;
							};
						}
					]
				};
			});
	});