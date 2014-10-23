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
				"$stateParams",
				"Cerberus.Tool.TemplateEditor.Localization",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				"Cerberus.Tool.TemplateEditor.Service.History",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				function ($scope, $stateParams, Localization, TemplateEngineService, HistoryService, DataBagService)
				{
					var controlIdCounter = 0,
						templateId = ~~$stateParams.TemplateId,
						documentId = ~~$stateParams.DocumentId,
						documentTypeId = ~~$stateParams.DocumentTypeId;

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
						var exitUrl = "/";
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