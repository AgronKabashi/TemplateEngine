define(
	[
		"../App.js"
	],
	function (templateEditorModule)
	{
		return templateEditorModule
			.directive("templatecontrolproperties",
			[
				"Cerberus.Tool.TemplateEditor.Helper.CSS",
				function (CSSHelper)
				{
					return {
						restrict: "E",
						templateUrl: "View/TemplateControlProperties.html",

						link: function (scope, element, attrs)
						{
							//
							element
								.click(function (event, ui)
								{
									event.stopPropagation();
								});

							var templateControlPropertiesContainer = element.find(".template-control-properties-container");

							templateControlPropertiesContainer
								.resizable(
								{
									minWidth: 150,
									handles: "w"
								})
								.mCustomScrollbar(
								{
									theme: "dark",
									scrollInertia: 150,
									contentTouchScroll: true,
									advanced:
									{
										updateOnContentResize: true
									}
								});

							element
								.find(".quick-navigation-container > a")
								.click(function ()
								{
									var navigateToElementName = $(this).attr("data-navigateTo");
									templateControlPropertiesContainer.mCustomScrollbar("scrollTo", String.format("[name={0}]", navigateToElementName));
								});
						},

						controller:
						[
							"$scope",
							"$controller",
							"Cerberus.Tool.TemplateEditor.Localization",
							"Cerberus.Tool.TemplateEditor.Service.StyleSetting",
							"Cerberus.Tool.TemplateEditor.Service.PathResolver",
							function ($scope, $controller, Localization, StyleSettingService, PathResolverService)
							{
								var eventOriginatedFromSelf = false;
								var updateControlPropertyValuesFunction = function (scope, templateControl)
								{
									if (templateControl && $scope.SelectedTemplateControl == templateControl && !eventOriginatedFromSelf)
									{
										$scope.VisualProperties = CSSHelper.FromCss($scope.SelectedTemplateControl.VisualProperties);
									}
								};

								$scope.Localization = Localization;
								$scope.EditorUrl = "";

								$scope.FontFamilies = StyleSettingService.GetAvailableFontFamilies();
								$scope.BorderStyles = StyleSettingService.GetBorderStyles();

								$scope.BackgroundImageRepeatOptions = StyleSettingService.GetBackgroundImageRepeatOptions();
								$scope.BackgroundPositionHorizontalOptions = StyleSettingService.GetBackgroundPositionHorizontalOptions();
								$scope.BackgroundPositionVerticalOptions = StyleSettingService.GetBackgroundPositionVerticalOptions();
								$scope.BackgroundSizeOptions = StyleSettingService.GetBackgroundSizeOptions();

								$scope.PropertyChanged = function ()
								{
									if (!$scope.SelectedTemplateControl)
									{
										return;
									}

									$scope.SelectedTemplateControl.VisualProperties = CSSHelper.ToCss($scope.VisualProperties);

									//Since we listen for the same event, ensure that we do not perform unnecessary processing
									eventOriginatedFromSelf = true;
									$scope.$broadcast("TemplateControlUpdated", $scope.SelectedTemplateControl);
									eventOriginatedFromSelf = false;
								};

								$scope.EditorLoaded = function ()
								{
									$scope.HasEditor = true;
								};

								$scope.ToggleTemplateControlVisibility = function ()
								{
									$scope.$emit("TemplateControlVisibilityChanged", $scope.SelectedTemplateControl, $scope.VisualProperties.display != 'none');
								};

								$scope.Transpose = function (orientation, primaryPropertyName, secondaryPropertyName)
								{
									var oldPropertyName = $scope[orientation] ? secondaryPropertyName : primaryPropertyName;
									var newPropertyName = $scope[orientation] ? primaryPropertyName : secondaryPropertyName;
									var value = $scope.VisualProperties[oldPropertyName];

									$scope[orientation] = !$scope[orientation];

									delete $scope.VisualProperties[oldPropertyName];

									$scope.VisualProperties[newPropertyName] = value;

									$scope.PropertyChanged();
								};

								$scope.$on("TemplateControlUpdated", updateControlPropertyValuesFunction);
								$scope.$on("TemplateControlUpdating", updateControlPropertyValuesFunction);

								$scope.$on("ResolutionSelected", function (scope, resolutionValue)
								{
									if (!$scope.SelectedTemplateControl)
									{
										return;
									}

									$scope.VisualProperties = CSSHelper.FromCss($scope.SelectedTemplateControl.VisualProperties);
									$scope.IsTransposedHorizontal = $scope.VisualProperties.right != undefined;
									$scope.IsTransposedVertical = $scope.VisualProperties.bottom != undefined;
								});

								//When a control has been selected, we need to make it available
								$scope.$on("TemplateControlSelected", function (scope, templateControls)
								{
									var templateControl = templateControls != null && templateControls.length == 1 ? templateControls[0] : null;

									$scope.SelectedTemplateControl = templateControl;

									if (templateControl)
									{
										$scope.VisualProperties = CSSHelper.FromCss($scope.SelectedTemplateControl.VisualProperties);
										$scope.IsTransposedHorizontal = $scope.VisualProperties.right != undefined;
										$scope.IsTransposedVertical = $scope.VisualProperties.bottom != undefined;

										var pathFormat = "./{0}/ControlPluginEditor/{1}/{2}.{3}";
										var controllerPath = String.format(pathFormat, "Controller", templateControl.Category, templateControl.ControlName, "js");
										var viewPath = String.format(pathFormat, "View", templateControl.Category, templateControl.ControlName, "html");;

										$scope.HasEditor = false;

										require([controllerPath], function (controllerId) {
											$scope.EditorController = $controller(controllerId, { "$scope": $scope });
											$scope.EditorViewPath = viewPath;
											$scope.HasEditor = true;
											$scope.$digest();
										});
									}
								});
							}
						]
					};
				}
			]);
	});