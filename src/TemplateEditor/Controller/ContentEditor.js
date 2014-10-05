define(
	[
		"../App.js",
		"jquery-mCustomScrollbar"
	],
	function(templateEditorModule)
	{
		templateEditorModule
			.controller("Cerberus.Tool.TemplateEditor.Controller.ContentEditor",
			[
				"$scope",
				"$stateParams",
				"Cerberus.Tool.TemplateEditor.Localization",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				"Cerberus.Tool.TemplateEditor.Service.History",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				function ($scope, $stateParams, Localization, TemplateEngineService, HistoryService, DataBagService)
				{
					var controlIdCounter = 0,
						templateId = $stateParams.TemplateId || 0,
						documentId = $stateParams.DocumentId || 0,
						documentTypeId = $stateParams.DocumentTypeId || 0;

					$scope.Localization = Localization;

					DataBagService.AddData("TemplateMode", TemplateMode.EditContent);
					DataBagService.AddData("Template", TemplateEngineService.GetTemplate(templateId, documentId, documentTypeId));

					$scope.Save = function (successCallback)
					{
						TemplateEngineService.SaveTemplateContent(
							DataBagService.GetData("Template"),
							documentId,
							documentTypeId,
							function (result, response)
							{
								if (successCallback)
								{
									successCallback();
								}
							},
							//Save failed
							function (result, response)
							{
								alert(response.Message);
							});
					};

					$scope.Exit = function ()
					{
						var exitUrl = "/";
						window.location.href = exitUrl;
					};

					$scope.SaveExit = function ()
					{
						this.Save(function () { $scope.Exit() });
					};
				}
			]);
	});