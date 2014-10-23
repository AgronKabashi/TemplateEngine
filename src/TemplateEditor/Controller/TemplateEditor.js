define(
	[
		"../App.js",

		//Global Dependencies
		"jquery-ui-resizable-fix",
		"jquery-mCustomScrollbar"
	],
	function (templateEditorModule)
	{
		templateEditorModule
			.controller("Cerberus.Tool.TemplateEditor.Controller.TemplateEditor",
			[
				"$scope",
				"$stateParams",
				"Cerberus.Tool.TemplateEditor.Localization",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				"Cerberus.Tool.TemplateEditor.Service.History",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				function ($scope, $stateParams, Localization, TemplateService, HistoryService, DataBagService)
				{
					var controlIdCounter = 0,
						templateId = ~~$stateParams.TemplateId;

					function GenerateControlId()
					{
						return --controlIdCounter;
					}

					$scope.Localization = Localization;

					DataBagService.AddData("TemplateMode", TemplateMode.EditDesign);
					DataBagService.AddData("Template", TemplateService.GetTemplate(templateId));

					//
					$scope.$on("AddTemplateControl", function (scope, controlArguments)
					{
						$scope.AddTemplateControl(controlArguments.ControlInfo, controlArguments.VisualProperties);
					});

					$scope.AddTemplateControl = function (controlInfo, visualProperties)
					{
						var templateControl = new Cerberus.Tool.TemplateEngine.Model.TemplateControl();
						templateControl.ControlType = controlInfo.ControlType;
						templateControl.Category = controlInfo.Category;
						templateControl.VisualProperties = visualProperties;
						templateControl.ControlName = controlInfo.Name;
						templateControl.Id = GenerateControlId();
						templateControl.CreationGUID = templateControl.Id;

						DataBagService.GetData("Template")
							.then(function (template)
							{
								template.TemplateControls.push(templateControl);
								$scope.$emit("TemplateControlAdded", templateControl);
							});
					};

					$scope.Save = function ()
					{
						var templatePromise = TemplateService.SaveTemplate(DataBagService.GetData("Template"));

						templatePromise.then(function (template)
						{
							DataBagService.AddData("Template", templatePromise);
							$scope.$broadcast("ReloadTemplate", template);
						});

						return templatePromise;
					};

					$scope.Exit = function ()
					{
						window.location.href = "/";
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