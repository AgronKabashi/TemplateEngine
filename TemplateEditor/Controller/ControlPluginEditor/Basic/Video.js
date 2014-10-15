define(
	[
		"../../../App.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.Basic.Video";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"Cerberus.Tool.TemplateEditor.Localization",
				function ($scope, Localization)
				{
					$scope.Localization = Localization;
					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Basic.Video());

					$scope.$watch("ControlData", function()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
						{
							Mp4SourceUrl: $scope.ControlData.Mp4SourceUrl,
							OggSourceUrl: $scope.ControlData.OggSourceUrl,
							AutoPlay: $scope.ControlData.AutoPlay,
							ShowControls: $scope.ControlData.ShowControls,
							LoopInfinitely: $scope.ControlData.LoopInfinitely
						});
					}, true);
				}
			]);

		return controllerId;
	});