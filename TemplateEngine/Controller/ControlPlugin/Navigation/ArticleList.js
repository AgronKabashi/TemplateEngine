namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation")
	.ArticleListType =
	{
		List: 0,
		CompactList: 1,
		Thumbnails: 2,
		DetailedList: 3
	};

namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation")
	.ArticleList = function ()
	{
		this.FolderId = 0;
		this.ShowImage = true;
		this.ShowTitle = true;
		this.ShowDescription = true;
		this.ShowMoreLink = true;
		this.MoreLabel = "";
		this.MaxArticles = 3;
		this.ListMode = Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleListType.List;
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Navigation.ArticleList",
	[
		"$scope",
		"$injector",
		function ($scope, $injector)
		{
			var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleList();

			$scope.GetImageSource = function (menuItem, $index)
			{
				var result = "";

				if ($scope.ControlData.ListMode == Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleListType.CompactList)
				{
					result = menuItem.Thumbnail;
				}
				else if ($scope.ControlData.ListMode == Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleListType.Thumbnails)
				{
					result = menuItem.Thumbnail;
				}
				else if ($scope.ControlData.ListMode == Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleListType.DetailedList)
				{
					result = $index == 0 ? menuItem.Image : menuItem.Thumbnail;
				}
				else if ($scope.ControlData.ListMode == Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleListType.List)
				{
					result = menuItem.Image;
				}

				return result;
			};

			//Load dependencies
			require(["/Module/CMS/Service/Article.js"], function ()
			{
				$scope.ArticleService = $injector.get("Cerberus.Module.CMS.Service.Article");
				
				//Ensures that whenever content is updated, so is the view
				$scope.$watch("TemplateControl.Content", function ()
				{
					var oldFolderId = $scope.ControlData != null ? $scope.ControlData.FolderId : 0;
					$scope.ControlData = JSON.tryParse($scope.TemplateControl.Content, defaultContent);
										
					var articleListTypes = Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleListType;
					$scope.ClassMap =
					{
						List: $scope.ControlData.ListMode == articleListTypes.List,
						CompactList: $scope.ControlData.ListMode == articleListTypes.CompactList,
						Thumbnails: $scope.ControlData.ListMode == articleListTypes.Thumbnails,
						DetailedList: $scope.ControlData.ListMode == articleListTypes.DetailedList
					};

					if ($scope.ControlData.FolderId <= 0)
					{
						$scope.MenuItems = [];
					}
					else if (oldFolderId != $scope.ControlData.FolderId)
					{
						$scope.MenuItems = $scope.ArticleService ? $scope.ArticleService.GetArticles($scope.ControlData.FolderId, { Publication: 1 }) : [];
					}
				});

				$scope.$digest();
			});			
		}
	]);