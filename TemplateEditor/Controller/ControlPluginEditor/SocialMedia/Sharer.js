define(
	[
		"../../../App.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.SocialMedia.SharerEditor";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"Cerberus.Tool.TemplateEditor.Localization",
				function ($scope, Localization)
				{
					$scope.Localization = Localization;
					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.SocialMedia.Sharer());

					$scope.$watch("ControlData", function ()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
							{
								Facebook: $scope.ControlData.Facebook,
								Twitter: $scope.ControlData.Twitter,
								GooglePlus: $scope.ControlData.GooglePlus
							});
					}, true);
				}
			]);

		return controllerId;
	});