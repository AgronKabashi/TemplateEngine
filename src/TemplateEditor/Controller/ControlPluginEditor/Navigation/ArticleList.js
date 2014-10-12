define(
	[
		"../../../App.js",

		"../../../Directive/TreeView.js",
		"/Module/CMS/Service/Folder.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.Navigation.ArticleList";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"$injector",
				"Cerberus.Tool.TemplateEditor.Localization",
				function ($scope, $injector, Localization)
				{
					$scope.Localization = Localization;
					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleList());

					$scope.ArticleListTypes = Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.ArticleListType;

					//Load dependencies
					$scope.FolderService = $injector.get("Cerberus.Module.CMS.Service.Folder");
					$scope.TreeViewData =
					{
						FolderId: $scope.ControlData.FolderId
					};

					$scope.FolderService.GetFolderHierarchyAsIdArray($scope.ControlData.FolderId, function (result)
						{
							$scope.TreeViewData.ExpandFolderList = result;
						});

					$scope.$watch("TreeViewData.FolderId", function ()
					{
						if ($scope.ControlData.FolderId == $scope.TreeViewData.FolderId)
						{
							return;
						}
						$scope.ControlData.FolderId = $scope.TreeViewData.FolderId;
						//$scope.UpdateControlContent();
					});

					$scope.$watch("ControlData", function ()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
						{
							FolderId: ~~$scope.ControlData.FolderId,
							ShowImage: $scope.ControlData.ShowImage,
							ShowTitle: $scope.ControlData.ShowTitle,
							ShowDescription: $scope.ControlData.ShowDescription,
							ShowMoreLink: $scope.ControlData.ShowMoreLink,
							MoreLabel: $scope.ControlData.MoreLabel,
							MaxArticles: $scope.ControlData.MaxArticles,
							ListMode: $scope.ControlData.ListMode
						});
					}, true);
				}
			]);

		return controllerId;
	});