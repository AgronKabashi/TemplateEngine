define(
	[
		"../App.js",
		"jquery-mCustomScrollbar"
	],
	function (templateEditorModule)
	{
		templateEditorModule
			.controller("Cerberus.Tool.TemplateEditor.Controller.ContentEditor",
			[
				"$scope",
				"$location",
				"$stateParams",
				"Cerberus.Tool.TemplateEditor.Localization",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				"Cerberus.Tool.TemplateEditor.Service.History",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				function ($scope, $location, $stateParams, Localization, TemplateEngineService, HistoryService, DataBagService)
				{
					var controlIdCounter = 0,
						templateId = ~~$stateParams.TemplateId,
						documentId = ~~$stateParams.DocumentId,
						documentTypeId = ~~$stateParams.DocumentTypeId,
						location = $location;

					$scope.Localization = Localization;

					DataBagService.AddData("TemplateMode", TemplateMode.EditContent);
					DataBagService.AddData("Template", TemplateEngineService.GetDocument(templateId, documentId, documentTypeId));

					$scope.Save = function (successCallback)
					{
						return TemplateEngineService.SaveDocument(DataBagService.GetData("Template"),
								documentId,
								documentTypeId);
					};

					$scope.Exit = function ()
					{
						var exitUrl = location.search()["ExitUrl"] || "/";
						window.location.href = exitUrl;
					};

					$scope.SaveExit = function ()
					{
						this.Save()
							.then(function ()
							{
								$scope.Exit()
							});
					};
				}
			]);
	});