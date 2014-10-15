define(
	[
		"../../../App.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.SocialMedia.RSSEditor";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"Cerberus.Tool.TemplateEditor.Localization",
				function ($scope, Localization)
				{
					$scope.Localization = Localization;
					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.SocialMedia.RSS());

					$scope.$watch("ControlData", function ()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
						{
							RSSFeedUrl: $scope.ControlData.RSSFeedUrl,
							ShowTitle: $scope.ControlData.ShowTitle,
							ShowDescription: $scope.ControlData.ShowDescription,
							ShowStoryDescription: $scope.ControlData.ShowStoryDescription,
							ShowStoryDate: $scope.ControlData.ShowStoryDate,
							MaxStories: $scope.ControlData.MaxStories
						});
					}, true);
				}
			]);

		return controllerId;
	});