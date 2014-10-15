define(
	[
		"../../../App.js",
		"/Module/CMS/Service/Folder.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.Navigation.Menu";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"$injector",
				"Cerberus.Tool.TemplateEditor.Localization",
				function ($scope, $injector, Localization)
				{
					$scope.Localization = Localization;
					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.Menu());

					//Load dependencies
					$scope.FolderService = $injector.get("Cerberus.Module.CMS.Service.Folder");
					$scope.Folders = $scope.FolderService.GetFolders(0);

					$scope.$watch("ControlData", function ()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
						{
							FolderId: ~~$scope.ControlData.FolderId
						});
					}, true);
				}
			]);

		return controllerId;
	});