define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("buttonDropdown", function ()
			{
				return {
					restrict: "E",
					transclude: true,
					scope:
					{
						disabled: "=",
						datasource: "=",
						onCommandClick: "=",
						onItemClick: "=",
						buttonclick: "=",
						limit: "=?",
						datatextfield: "@"
					},
					templateUrl: function(element, scope)
					{
						return scope.onCommandClick ? "View/ButtonDropdown_CommandButton.html" : "View/ButtonDropdown.html";
					},
					controller: 
					[
						"$scope",
						function ($scope)
						{
							$scope.limit = $scope.limit || $scope.datasource.length;
							$scope.ItemClick = function (item)
							{
								$scope.onItemClick(item);
								$scope.Expanded = false;
							}
						}
					]
				};
			});
	});