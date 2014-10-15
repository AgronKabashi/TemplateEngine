define(
	[
		"../../../App.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.Navigation.Link";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"Cerberus.Tool.TemplateEditor.Localization",
				function ($scope, Localization)
				{
					$scope.Localization = Localization;
					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.Link());

					$scope.$watch("ControlData", function ()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
							{
								Url: $scope.ControlData.Url,
								Tooltip: $scope.ControlData.Tooltip,
								Text: $scope.ControlData.Text,
								Target: $scope.ControlData.Target
							});
					}, true);
				}
			]);

		return controllerId;
	});