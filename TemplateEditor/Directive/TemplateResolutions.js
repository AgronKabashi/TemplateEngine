define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.constant("MaxResolutionCount", 10)
			.constant("MaxResolutionValue", 1024)
			.constant("MaxResolutionDifference", 20)
			.directive("templateresolutions",
			[
				"MaxResolutionValue",
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				function (MaxResolutionValue, TemplateEditorHelper)
				{
					return {
						restrict: "E",
						templateUrl: "View/TemplateResolutions.html",

						link: function (scope, element, attrs)
						{
							var templateElement = $(".template:first-child");
							var resolutionSlider = element.find(".resolution-slider");
							var resolutionContainer = element.find(".resolution-container");

							scope.$on("ResolutionSelected", function (scope, value)
							{
								resolutionSlider
									.slider("value", value)
									.children()
									.first()
									.attr("data-value", Math.min(value, MaxResolutionValue));
								templateElement.css("width", value + "px");
							});

							scope.CurrentResolution = scope.Template.Resolutions[scope.Template.Resolutions.length - 1];

							//Waits until the template has been loaded and the resolutions are available
							var timerHandle = setInterval(function ()
							{
								if (scope.Template.Resolutions.length > 0)
								{
									scope.SetDocumentWidth(scope.Template.Resolutions[scope.Template.Resolutions.length - 1].ResolutionValue);

									scope.$digest();
									clearInterval(timerHandle);
								}
							}, 100);

							resolutionSlider.slider(
							{
								step: 1,
								value: MaxResolutionValue,
								max: MaxResolutionValue,

								slide: function (event, ui)
								{
									var value = ~~ui.value;
									$(this).children().first().attr("data-Value", value);
									templateElement.css("width", value + "px");

									var resolution = TemplateEditorHelper.FindResolution(scope.Template, value);

									if (scope.CurrentResolution == null || scope.CurrentResolution && resolution && resolution.ResolutionValue != scope.CurrentResolution.ResolutionValue)
									{
										scope.CurrentResolution = resolution;
										scope.SetDocumentWidth(value, scope.CurrentResolution);
										scope.$apply();
									}
								},

								stop: function (event, ui)
								{
									var value = ~~ui.value;
									$(this).children().first().attr("data-Value", value);
									templateElement.css("width", value + "px");

									scope.SliderValue = value;
								}
							})
							.children()
							.first()
							.attr("data-value", resolutionSlider.outerWidth());
						},

						controller:
						[
							"$scope",
							"MaxResolutionCount",
							"MaxResolutionValue",
							"MaxResolutionDifference",
							"Cerberus.Tool.TemplateEditor.Localization",
							"Cerberus.Tool.TemplateEngine.Service.DataBag",
							function ($scope, MaxResolutionCount, MaxResolutionValue, MaxResolutionDifference, Localization, DataBagService)
							{
								$scope.MaxResolutionValue = MaxResolutionValue;
								$scope.SliderValue = MaxResolutionValue;
								$scope.DataBagService = DataBagService;
								$scope.Template = DataBagService.GetData("Template");

								$scope.ResolutionPresets =
								[
									{
										Name: "640px - Apple iPhone 4&5",
										Value: 640
									},
									{
										Name: "768px - Apple iPad 1&2",
										Value: 768
									}
								];

								$scope.$on("ReloadTemplate", function (scope, template)
								{
									$scope.Template = template;
								});

								$scope.$on("TemplateControlUpdated", function (scope, templateControl) { TemplateEditorHelper.OnTemplateControlUpdate(scope, templateControl); });
								$scope.$on("TemplateControlAdded", function (scope, templateControl) { TemplateEditorHelper.OnTemplateControlUpdate(scope, templateControl); });

								$scope.AddResolution = function (resolutionPreset)
								{
									var template = DataBagService.GetData("Template"),
										resolution = new Cerberus.Tool.TemplateEngine.Model.Resolution(),
										resolutionValue = Math.min(resolutionPreset != null ? resolutionPreset.Value : $scope.SliderValue, MaxResolutionValue),
										currentResolution = TemplateEditorHelper.FindResolution(template, resolutionValue);

									if (template.Resolutions.length >= MaxResolutionCount)
									{
										$scope.$emit("ShowMessage", Localization.TemplateControlResolutions.ReachedMaximumResolutions);
										return;
									}

									var previousRes = TemplateEditorHelper.FindResolution(template, resolutionValue - MaxResolutionDifference);
									var nextRes = TemplateEditorHelper.FindResolution(template, resolutionValue + MaxResolutionDifference);

									if (Math.abs(resolutionValue - previousRes.ResolutionValue) <= MaxResolutionDifference ||
										Math.abs(resolutionValue - nextRes.ResolutionValue) <= MaxResolutionDifference)
									{
										$scope.$emit("ShowMessage", Localization.TemplateControlResolutions.NotEnoughSpace);
										return;
									}

									resolution.ResolutionValue = resolutionValue;
									resolution.TemplateControlVisualProperties = JSON.parse(JSON.stringify(currentResolution.TemplateControlVisualProperties));

									template.Resolutions.push(resolution);

									$scope.CurrentResolution = resolution;

									template.Resolutions.sort(function (a, b)
									{
										return a.ResolutionValue - b.ResolutionValue;
									});

									$scope.PresetsExpanded = false;
								};

								$scope.RemoveResolution = function (resolution)
								{
									$scope.Template.Resolutions.RemoveValue("ResolutionValue", resolution.ResolutionValue);
									$scope.SetDocumentWidth(resolution.ResolutionValue);
								};

								$scope.SetDocumentWidth = function (value, resolution)
								{
									$scope.SliderValue = value;
									resolution = resolution || TemplateEditorHelper.FindResolution($scope.Template, value);
									$scope.CurrentResolution = resolution;

									DataBagService.AddData("CurrentResolution", resolution);

									TemplateEditorHelper.RemapTemplateControlVisualProperties($scope.Template, resolution);

									$scope.$emit("ResolutionSelected", value);
								};
							}
						]
					};
				}
			]);
	});