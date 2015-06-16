(function (angular) {
	"use strict";

	angular
		.module("Cerberus.TemplateEditor")
		.constant("MaxResolutionCount", 10)
		.constant("MaxResolutionValue", 1024)
		.constant("MaxResolutionDifference", 10)
		.directive("csTemplateresolutions", [
		"MaxResolutionValue",
		"Cerberus.TemplateEngine.Service.Event",
		"Cerberus.TemplateEditor.Service.PathResolver",
		"Cerberus.TemplateEditor.Service.TemplateResolution",
		"Cerberus.TemplateEditor.Helper.TemplateEditor",
		function (MaxResolutionValue, EventService, PathResolver, TemplateResolutionService, TemplateEditorHelper) {
			return {
				restrict: "E",
				scope: true,
				templateUrl: PathResolver.Resolve("View/TemplateResolutions.html"),

				link: function (scope, element, attrs) {
					var templateElement;
					var resolutionSlider = element.find(".resolution-slider");
					var resolutionContainer = element.find(".resolution-container");

					EventService.Subscribe("ResolutionSelected", function (value) {
						resolutionSlider
							.slider("value", value)
							.children()
							.first()
							.attr("data-value", Math.min(value, MaxResolutionValue));
						$("cs-template:first-child").css("width", value + "px");
					});

					resolutionSlider.slider({
						step: 1,
						value: MaxResolutionValue,
						max: MaxResolutionValue,

						start: function (event, ui) {
							templateElement = $("cs-template");
							return scope.Template !== undefined;
						},

						slide: function (event, ui) {
							var value = ~~ui.value;
							$(this).children().first().attr("data-Value", value);
							templateElement.css("width", value + "px");

							var resolution = TemplateResolutionService.FindResolution(scope.Template, value);

							if (scope.CurrentResolution === undefined|| scope.CurrentResolution && resolution && resolution.ResolutionValue !== scope.CurrentResolution.ResolutionValue) {
								scope.CurrentResolution = resolution;
								scope.SetDocumentWidth(value, scope.CurrentResolution);
							}
						},

						stop: function (event, ui) {
							var value = ~~ui.value;
							$(this).children().first().attr("data-Value", value);
							templateElement.css("width", value + "px");
							templateElement = undefined;
							scope.SliderValue = value;
						}
					})
						.children()
						.first()
						.attr("data-value", resolutionSlider.outerWidth());
				},

				controller: [
					"$scope",
					"MaxResolutionCount",
					"MaxResolutionValue",
					"MaxResolutionDifference",
					"Cerberus.TemplateEditor.Service.DeviceResolution",
					"Cerberus.TemplateEditor.Localization",
					"Cerberus.TemplateEngine.Service.DataBag",
					function ($scope,
						MaxResolutionCount,
						MaxResolutionValue,
						MaxResolutionDifference,
						DeviceResolutionService,
						Localization,
						DataBagService) {
						function OnComponentUpdate(component) {
							//Find resolution using current slider value: $scope.SliderValue
							var resolution = TemplateResolutionService.FindResolution($scope.Template, $scope.SliderValue);

							//Find component using component.Id
							//and update the values in the mediaquery for this component
							TemplateEditorHelper.SetComponentVisualProperties($scope.Template, resolution, component);
						}

						this.InitializeScope = function () {
						  _.extend($scope, {
						    MaxResolutionValue: MaxResolutionValue,
						    SliderValue: MaxResolutionValue,
						    DataBagService: DataBagService,
						    Template: DataBagService.GetData("Template"),
						    ResolutionPresets: DeviceResolutionService.GetResolutions(),

						    AddResolution: function (resolutionPreset) {
						      $scope.CurrentResolution = TemplateResolutionService.AddResolution($scope.Template, Math.min(resolutionPreset !== undefined ? resolutionPreset.Value : $scope.SliderValue, MaxResolutionValue));
						      $scope.PresetsExpanded = false;
						      EventService.Notify("ResolutionSelected", $scope.CurrentResolution.ResolutionValue);
						    },

						    RemoveResolution: function (resolution) {
						      TemplateResolutionService.RemoveResolution($scope.Template, resolution);
						      $scope.SetDocumentWidth(resolution.ResolutionValue);
						    },

						    SetDocumentWidth: function (value, resolution) {
						      $scope.SliderValue = value;
						      resolution = resolution || TemplateResolutionService.FindResolution($scope.Template, value);
						      $scope.CurrentResolution = resolution;

						      DataBagService.AddData("CurrentResolution", resolution);

						      TemplateEditorHelper.RemapComponentVisualProperties($scope.Template, resolution);

						      EventService.Notify("ResolutionSelected", value);
						    }
						  });

						  if ($scope.Template) {
						    $scope.SetDocumentWidth($scope.Template.Resolutions[$scope.Template.Resolutions.length - 1].ResolutionValue);
						  }
						};

						this.InitializeEvents = function () {
							EventService.Subscribe("InitializeTemplate", function (template) {
								$scope.Template = template;
								$scope.CurrentResolution = template.Resolutions[template.Resolutions.length - 1];
								$scope.SetDocumentWidth(template.Resolutions[template.Resolutions.length - 1].ResolutionValue);
							});

							EventService.Subscribe("ComponentUpdated", OnComponentUpdate);
							EventService.Subscribe("ComponentAdded", OnComponentUpdate);
						};

						this.InitializeScope();
						this.InitializeEvents();
					}
				]
			};
		}
	]);
})(window.angular);