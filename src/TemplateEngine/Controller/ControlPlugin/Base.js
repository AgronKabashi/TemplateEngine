define(
	[
		"../../App.js"
	],
	function (app)
	{
		app.controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Base",
			[
				"$scope",
				"$controller",
				"Cerberus.Tool.TemplateEngine.Service.PathResolver",
				function ($scope, $controller, PathResolverService)
				{
					var pathFormat = "{0}/ControlPlugin/{1}/{2}.{3}";
					var viewPath = String.format(pathFormat, "View", $scope.TemplateControl.Category, $scope.TemplateControl.ControlName, "html");
					var controllerPath = String.format(pathFormat, "Controller", $scope.TemplateControl.Category, $scope.TemplateControl.ControlName, "js");

					//Lazy load the controller for this Template Control Plugin
					require([PathResolverService.Resolve(controllerPath)], function ()
					{
						////Now that the controller has been loaded, we load the view
						$scope.Controller = $controller($scope.TemplateControl.ControlType, { "$scope": $scope });
						$scope.ViewPath = PathResolverService.Resolve(viewPath);
						$scope.$digest();
					});
				}
			]);
	});