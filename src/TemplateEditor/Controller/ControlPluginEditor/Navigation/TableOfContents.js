define(
	[
		"../../../App.js"
	],
	function (templateEditorModule)
	{
		var controllerId = "Cerberus.Tool.TemplateEditor.Controller.ControlPluginEditor.Navigation.TableOfContentsEditor";
		templateEditorModule.controller(controllerId,
			[
				"$scope",
				"Cerberus.Tool.TemplateEditor.Localization",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				function ($scope, Localization, DataBagService)
				{
					$scope.Localization = Localization;
					DataBagService.GetData("Template")
						.then(function(template)
						{
							$scope.Template = template;
						});

					$scope.ControlData = JSON.tryParse($scope.SelectedTemplateControl.Content, new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.TableOfContents());

					$scope.FilterList = function (item)
					{
						//Filter out plugins that do not have user generated content
						return $scope.SelectedTemplateControl != null
							&& item.Id > 0				//Template Controls need to have a proper TemplateControlId to be valid options (i.e. saved in DB)
							//TODO: Hard-coded to RTF controls but eventually there should be a property on TemplateControls
							//that determine which features are available, in this case something like UserGeneratedContent + HasTitles
							//would be appropriate
							&& item.ControlType == "Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Basic.RTF";
					};

					$scope.$watch("ControlData", function ()
					{
						$scope.SelectedTemplateControl.Content = JSON.stringify(
						{
							SourceTemplateControlId: ~~$scope.ControlData.SourceTemplateControlId
						});
					}, true);
				}
			]);

		return controllerId;
	});