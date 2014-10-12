define(
	[
		"../../../App.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.Basic.YouTube";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"Cerberus.Tool.TemplateEditor.Localization",
				function ($scope, Localization)
				{
					$scope.Localization = Localization;
					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Basic.YouTube());

					$scope.$watch("ControlData", function ()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
						{
							VideoId: $scope.ControlData.VideoId,
							StartTime: $scope.ControlData.StartTime,
							AutoPlay: $scope.ControlData.AutoPlay,
							ShowControls: $scope.ControlData.ShowControls,
							DisableKeyboard: $scope.ControlData.DisableKeyboard,
							LoopInfinitely: $scope.ControlData.LoopInfinitely,
							HideYouTubeBrand: $scope.ControlData.HideYouTubeBrand,
							ShowVideoInfo: $scope.ControlData.ShowVideoInfo
						});
					}, true);
				}
			]);

		return controllerId;
	});