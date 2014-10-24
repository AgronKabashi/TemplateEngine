define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("templatecontrolactions", function ()
			{
				return {
					restrict: "E",
					templateUrl: "View/TemplateControlActions.html",

					controller:
					[
						"$scope",
						"Cerberus.Tool.TemplateEditor.Localization",
						"Cerberus.Tool.TemplateEngine.Service.DataBag",
						"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
						function ($scope, Localization, DataBagService, TemplateEditorHelper)
						{
							function CalculateHiddenControlCount()
							{
								DataBagService.GetData("Template")
									.then(function (template)
									{
										var templateControls = template.TemplateControls;
										$scope.HiddenControls = 0;
										for (var i = 0; i < templateControls.length; i++)
										{
											var templateControl = templateControls[i];
											if (templateControl.VisualProperties.indexOf("display:none") >= 0)
											{
												$scope.HiddenControls++;
											}
										}
									});
							}

							function UpdateCurrentResolution(scope, resolutionValue)
							{
								$scope.ResolutionIndex = TemplateEditorHelper.FindResolutionIndex($scope.Template, resolutionValue);
							}

							var templateMode = DataBagService.GetData("TemplateMode");

							$scope.ResolutionIndex = -1;
							$scope.SelectedControls = [];
							$scope.ShowTemplateEditorActions = templateMode === TemplateMode.EditDesign;
							$scope.ShowContentEditorActions = templateMode === TemplateMode.EditContent;
							$scope.HiddenControls = 0;

							$scope.$on("TemplateControlSelected", function (scope, templateControls)
							{
								$scope.SelectedControls = templateControls;
							});

							$scope.ToggleHiddenElements = function ()
							{
								$scope.ShowHiddenElements = !$scope.ShowHiddenElements;
								$scope.$emit("ShowHiddenElements", $scope.ShowHiddenElements);
							};

							$scope.$on("ResolutionSelected", CalculateHiddenControlCount);
							$scope.$on("ResolutionSelected", UpdateCurrentResolution);
							$scope.$on("TemplateControlVisibilityChanged", CalculateHiddenControlCount);

							$scope.RemoveSelectedTemplateControls = function ()
							{
								//get template control ids
								//remove them from the template
								DataBagService.GetData("Template")
									.then(function (template)
									{
										var selectedTemplateControl;

										for (var scIndex = 0; scIndex < $scope.SelectedControls.length; scIndex++)
										{
											selectedTemplateControl = $scope.SelectedControls[scIndex];
											template.TemplateControls.RemoveValue("Id", selectedTemplateControl.Id);
											TemplateEditorHelper.RemoveTemplateControlFromResolutions(template, selectedTemplateControl);
										}
									});
							};

							$scope.DistributeResolutionPropertiesToAllResolutions = function ()
							{
								DataBagService.GetData("Template")
									.then(function (template)
									{
										var selectedTemplateControl;

										for (var i = 0; i < $scope.SelectedControls.length; i++)
										{
											selectedTemplateControl = $scope.SelectedControls[i];
											for (var resolutionIndex = 0; resolutionIndex < template.Resolutions.length; resolutionIndex++)
											{
												var resolution = template.Resolutions[resolutionIndex];
												TemplateEditorHelper.SetTemplateControlVisualProperties(template, resolution, selectedTemplateControl);
											}
										}
									});
							};

							$scope.DistributeResolutionPropertiesToLowerResolutions = function ()
							{
								DataBagService.GetData("Template")
									.then(function (template)
									{
										var currentResolution = DataBagService.GetData("CurrentResolution");
										var selectedTemplateControl;

										for (var i = 0; i < $scope.SelectedControls.length; i++)
										{
											selectedTemplateControl = $scope.SelectedControls[i];
											for (var resolutionIndex = 0; resolutionIndex < template.Resolutions.length; resolutionIndex++)
											{
												var resolution = template.Resolutions[resolutionIndex];

												if (resolution.ResolutionValue < currentResolution.ResolutionValue)
												{
													TemplateEditorHelper.SetTemplateControlVisualProperties(template, resolution, selectedTemplateControl);
												}
											}
										}
									});
							};

							$scope.DistributeResolutionPropertiesToHigherResolutions = function ()
							{
								DataBagService.GetData("Template")
									.then(function (template)
									{
										var currentResolution = DataBagService.GetData("CurrentResolution");
										var selectedTemplateControl;

										for (var i = 0; i < $scope.SelectedControls.length; i++)
										{
											selectedTemplateControl = $scope.SelectedControls[i];
											for (var resolutionIndex = 0; resolutionIndex < template.Resolutions.length; resolutionIndex++)
											{
												var resolution = template.Resolutions[resolutionIndex];

												if (resolution.ResolutionValue > currentResolution.ResolutionValue)
												{
													TemplateEditorHelper.SetTemplateControlVisualProperties(template, resolution, selectedTemplateControl);
												}
											}
										}
									});
							};
						}
					]
				};
			});
	});