namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation")
	.Menu = function ()
	{
		this.FolderId = 0;
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Navigation.Menu",
	[
		"$scope",
		"$injector",
		"$timeout",
		function ($scope, $injector, $timeout)
		{
			var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.Menu();

			//Load dependencies
			require(["/Module/CMS/Service/Article.js"], function ()
			{
				$scope.ArticleService = $injector.get("Cerberus.Module.CMS.Service.Article");

				//Ensures that whenever content is updated, so is the view
				$scope.$watch("TemplateControl.Content", function ()
				{
					$scope.ControlData = JSON.tryParse($scope.TemplateControl.Content, defaultContent);
					$scope.MenuItems = $scope.ArticleService ? $scope.ArticleService.GetArticles($scope.ControlData.FolderId, { Publication: 1, OrderBy: 0 }) : [];
				});

				$scope.$digest();
			});
		}
	]);