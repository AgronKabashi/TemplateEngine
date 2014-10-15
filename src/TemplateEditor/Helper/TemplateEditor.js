define(
	[
		"angular"
	],
	function (angular)
	{
		return angular
			.module("Cerberus.Tool.TemplateEditor.Helper.TemplateEditor", [])
			.service("Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
			[
				function ()
				{
					//properties that are not on this list will be stripped away
					var validProperties =
					[
						"display",
						"left",
						"right",
						"top",
						"bottom",
						"width",
						"height",
						"opacity",
						"font-family",
						"font-size",
						"font-style",
						"font-weight",
						"text-decoration",
						"color",
						"min-height",
						"min-width",
						"transform",
						"overflow",
						"-webkit-transform",
						"word-spacing",
						"text-align",
						"padding-top",
						"padding-right",
						"padding-bottom",
						"padding-left",
						"border-top-style",
						"border-top-width",
						"border-top-color",
						"border-right-style",
						"border-right-width",
						"border-right-color",
						"border-bottom-style",
						"border-bottom-width",
						"border-bottom-color",
						"border-left-style",
						"border-left-width",
						"border-left-color",
						"border-top-left-radius",
						"border-top-right-radius",
						"border-bottom-right-radius",
						"border-bottom-left-radius",
						"background-color",
						"background-image",
						"background-repeat",
						"background-size",
						"background-position-x",
						"background-position-y",
						"text-shadow",
						"box-shadow",
						"white-space",
						"z-index"
					];

					/***************************************************************
					PRESENTATION LOGIC
					***************************************************************/
					function ExtractVisualProperties(style)
					{
						var result = [];
						var propertyName = "",
							sanitizedPropertyName = "",
							propertyValue = "";

						for (var i = 0, length = validProperties.length; i < length; i++)
						{
							propertyName = validProperties[i];
							sanitizedPropertyName = propertyName.replace(/-([A-Z])/gi, function (v) { return v[1].toUpperCase(); });
							propertyValue = style[sanitizedPropertyName];

							if (propertyValue !== "")
							{
								result.push(String.format("{0}:{1}", propertyName, propertyValue));
							}
						}

						return result.join(";");
					}

					function StoreDragResizeSettings(element)
					{
						var style = element.get(0).style;
						var isTransposedHorizontal = style.right.length > 0,
							isTransposedVertical = style.bottom.length > 0,
							horizontalUnitName = isTransposedHorizontal ? "right" : "left",
							verticalUnitName = isTransposedVertical ? "bottom" : "top",
							widthInPercent = !isNaN(parseInt(style["width"])) && style["width"].indexOf("%") >= 0,
							heightInPercent = !isNaN(parseInt(style["height"])) && style["height"].indexOf("%") >= 0,
							horizontalInPercent = !isNaN(parseInt(style[horizontalUnitName])) && style[horizontalUnitName].indexOf("%") >= 0,
							verticalInPercent = !isNaN(parseInt(style[verticalUnitName])) && style[verticalUnitName].indexOf("%") >= 0;

						element.attr(
						{
							"IsTransposedHorizontal": isTransposedHorizontal,
							"IsTransposedVertical": isTransposedVertical,
							"UnitHorizontal": horizontalInPercent,
							"UnitVertical": verticalInPercent,
							"UnitWidth": widthInPercent,
							"UnitHeight": heightInPercent
						});
					}

					function SanitizeDragValues(element)
					{
						var nativeElement = element.get(0);
						var template = element.parent(),
							templateWidth = template.width(),
							templateHeight = template.height();

						var horizontal = 0,
							vertical = 0,
							width = 0,
							height = 0,
							isTransposedVertical = element.attr("IsTransposedVertical") == "true",
							isTransposedHorizontal = element.attr("IsTransposedHorizontal") == "true",
							horizontalInPercent = element.attr("UnitHorizontal") == "true",
							verticalInPercent = element.attr("UnitVertical") == "true",
							elementWidth = tryParseInt(element.outerWidth()),
							elementHeight = tryParseInt(element.outerHeight());

						//jQuery draggable can't handle positioning types other than left/top
						//Since left/top have higher priority than their transposed counterparts, we can set the values for the counterparts if needed
						//without any repercussions.

						//Horizontal Positioning
						if (horizontalInPercent)
						{
							//Percentage based positioning
							horizontal = tryParseInt(element.css("left"));
							element.css("left", String.format("{0}%", (100.0 * horizontal / templateWidth).toFixed(1)));

							if (isTransposedHorizontal)
							{
								nativeElement.style["right"] = String.format("{0}%", (100 - (100.0 * (horizontal / templateWidth + elementWidth / templateWidth))).toFixed(1));
							}
						}
						else
						{
							//Pixel based positioning
							var value = tryParseInt(nativeElement.style["left"]);
							nativeElement.style["left"] = value + "px";

							if (isTransposedHorizontal)
							{
								nativeElement.style["right"] = templateWidth - value - elementWidth + "px";
							}
						}

						//Vertical Positioning
						if (verticalInPercent)
						{
							//Percentage based positioning
							vertical = tryParseInt(element.css("top"));
							element.css("top", String.format("{0}%", (100.0 * vertical / templateHeight).toFixed(1)));

							if (isTransposedVertical)
							{
								nativeElement.style["bottom"] = String.format("{0}%", (100 - (100.0 * (vertical / templateHeight + elementHeight / templateHeight))).toFixed(1));
							}
						}
						else
						{
							//Pixel based positioning
							var value = tryParseInt(nativeElement.style["top"]);
							nativeElement.style["top"] = value + "px";

							if (isTransposedVertical)
							{
								nativeElement.style["bottom"] = templateHeight - value - elementHeight + "px";
							}
						}
					}

					function SanitizeResizeValues(element)
					{
						var nativeElement = element.get(0);

						var template = element.parent(),
							templateWidth = template.width(),
							templateHeight = template.height();

						var width = 0,
							height = 0,
							widthInPercent = element.attr("UnitWidth") == "true",
							heightInPercent = element.attr("UnitHeight") == "true";

						//Dimensions
						if (widthInPercent)
						{
							width = tryParseInt(element.css("width"));
							element.css("width", String.format("{0}%", (100.0 * width / templateWidth).toFixed(1)));
						}

						if (heightInPercent)
						{
							height = tryParseInt(element.css("height"));
							element.css("height", String.format("{0}%", (100.0 * height / templateHeight).toFixed(1)));
						}
					}

					this.UpdateVisualProperties = function (eventId, element)
					{
						var scope = element.scope();
						var nativeElement = element.get(0);

						var removePropertyMethod = nativeElement.style.removeProperty ? nativeElement.style.removeProperty : nativeElement.style.removeAttribute;

						//resizable adds position:absolute even though it's already in the applied class
						removePropertyMethod.call(nativeElement.style, "position");

						//scope.TemplateControl.VisualProperties = element.attr("style");
						scope.TemplateControl.VisualProperties = ExtractVisualProperties(element.get(0).style);
						scope.$emit(eventId, scope.TemplateControl);
						scope.$apply();
					};

					this.EnableDraggable = function (scope, templateControlElement)
					{
						var self = this;
						var table = {};

						templateControlElement
							.draggable(
							{
								snap: true,
								snapTolerance: 10,
								start: function (e, ui)
								{
									var sourceElement = $(this);
									var elements = $(".template-control.selected");
									var allowDrag = sourceElement.hasClass("selected");

									sourceElement.draggable("option", "snap", e.ctrlKey);

									if (allowDrag)
									{
										elements
											.each(function ()
											{
												var element = $(this);
												StoreDragResizeSettings(element);

												table[this.id] = 
												{
													StartPosition: element.position()
												};
											})
											.addClass("ui-draggable-dragging");
									}

									return allowDrag;
								},

								drag: function (e, ui)
								{
									var sourceElement = $(this);
									var elements = $(".template-control.selected");

									sourceElement.draggable("option", "snap", e.ctrlKey);

									var offsetLeft = ui.originalPosition.left - ui.position.left;
									var offsetTop = ui.originalPosition.top - ui.position.top;

									elements.each(function ()
									{
										var element = $(this);

										elementData = table[this.id];
										element.css(
										{
											left: elementData.StartPosition.left - offsetLeft,
											top: elementData.StartPosition.top - offsetTop
										});
									
										SanitizeDragValues(element);
										self.UpdateVisualProperties("TemplateControlUpdating", element);
									});
								},

								stop: function (e, ui)
								{
									var sourceElement = $(this);
									var elements = $(".template-control.selected");
									var offsetLeft = ui.originalPosition.left - ui.position.left;
									var offsetTop = ui.originalPosition.top - ui.position.top;

									elements.each(function ()
									{
										var element = $(this);
										var nativeElement = element.get(0);

										elementData = table[this.id];
										element.css(
										{
											left: elementData.StartPosition.left - offsetLeft,
											top: elementData.StartPosition.top - offsetTop
										});

										SanitizeDragValues(element);

										var removePropertyMethod = nativeElement.style.removeProperty ? nativeElement.style.removeProperty : nativeElement.style.removeAttribute;
										var isTransposedHorizontal = element.attr("IsTransposedHorizontal") == "true";
										var isTransposedVertical = element.attr("IsTransposedVertical") == "true";

										if (isTransposedHorizontal)
										{
											removePropertyMethod.call(nativeElement.style, "left");
										}

										if (isTransposedVertical)
										{
											removePropertyMethod.call(nativeElement.style, "top");
										}

										element
											.removeAttr("IsTransposedHorizontal")
											.removeAttr("IsTransposedVertical")
											.removeAttr("UnitWidth")
											.removeAttr("UnitHeight")
											.removeAttr("UnitHorizontal")
											.removeAttr("UnitVertical");

										self.UpdateVisualProperties("TemplateControlUpdated", element);
									})
									.removeClass("ui-draggable-dragging");
								}
							});
					};

					this.EnableResizable = function (scope, templateControlElement)
					{
						var self = this;
						templateControlElement
							.resizable(
							{
								start: function ()
								{
									var element = $(this);
									StoreDragResizeSettings(element);
								},

								resize: function ()
								{
									var element = $(this);
									SanitizeResizeValues(element);

									self.UpdateVisualProperties("TemplateControlUpdating", element);
								},

								stop: function (event, ui)
								{
									var element = $(this);
									var nativeElement = element.get(0);
									SanitizeResizeValues(element);

									element
										.removeAttr("IsTransposedHorizontal")
										.removeAttr("IsTransposedVertical")
										.removeAttr("UnitWidth")
										.removeAttr("UnitHeight")
										.removeAttr("UnitHorizontal")
										.removeAttr("UnitVertical");

									self.UpdateVisualProperties("TemplateControlUpdated", element);
								}
							});
					};

					this.EnableSelectable = function (scope, templateControlElement)
					{
						var self = this;
						var templateElement = templateControlElement.parent();

						templateControlElement
							.unbind("click")
							.click(function (event)
							{
								//Show properties for this control
								var currentControlElement = $(this);
								var currentScope = currentControlElement.scope();

								currentControlElement.data("Name", currentScope.TemplateControl.ControlName);

								if (currentControlElement.hasClass("selected") && !event.ctrlKey)
								{
									return false;
								}

								currentControlElement.toggleClass("selected");

								if (!event.ctrlKey)
								{
									currentControlElement.siblings(".selected").removeClass("selected");
								}

								var selectedTemplateControls = [];
								var selectedTemplateControlElements = templateElement.children(".template-control.selected");
								selectedTemplateControlElements.each(function ()
								{
									selectedTemplateControls.push(angular.element(this).scope().TemplateControl);
								});

								scope.$emit("TemplateControlSelected", selectedTemplateControls);
								scope.$digest();

								event.stopPropagation();
							});
					};

					this.EnableDraggableResizableSelectable = function (scope, templateElement)
					{
						var templateControlElements = templateElement.children(".template-control");

						this.EnableDraggable(scope, templateElement, templateControlElements);
						this.EnableResizable(scope, templateElement, templateControlElements);
						this.EnableSelectable(scope, templateElement, templateControlElements);

					};

					this.EnableDrop = function (scope, templateElement)
					{
						var self = this;

						templateElement
							.droppable(
							{
								accept: ".control-plugin",
								drop: function (event, ui)
								{
									var controlInfo = ui.draggable.data("control-info");

									var element = $(this);
									var x = ui.offset.left - element.offset().left + controlInfo.CursorAt.left;
									var y = ui.offset.top - element.offset().top + controlInfo.CursorAt.top;

									scope.$emit("AddTemplateControl",
										{
											ControlInfo: controlInfo,
											VisualProperties: String.format("left:{0}px;top:{1}px;", ~~x, ~~y)
										});

									scope.$digest();
								}
							});
					};

					/***************************************************************
					BUSINESS LOGIC
					TODO: Refactor into separate service
					***************************************************************/
					this.FindResolution = function (template, value)
					{
						var index = this.FindResolutionIndex(template, value);

						return index >= 0 ? template.Resolutions[index] : null;
					};

					this.FindResolutionIndex = function (template, value)
					{
						var result = -1;

						//there will always be one resolution available
						for (var i = 0; i < template.Resolutions.length; i++)
						{
							var resolution = template.Resolutions[i];

							if (resolution.ResolutionValue >= value)
							{
								result = i;
								break;
							}
						}

						return result;
					};

					this.GetTemplateControlVisualProperties = function (templateControlId, templateControlVisualProperties)
					{
						for (var i = 0; i < templateControlVisualProperties.length; i++)
						{
							if (templateControlVisualProperties[i].Key == templateControlId)
							{
								return templateControlVisualProperties[i].Value;
							}
						}

						return "";
					};

					this.RemapTemplateControlVisualProperties = function (template, resolution)
					{
						for (var i = 0; i < template.TemplateControls.length; i++)
						{
							var templateControl = template.TemplateControls[i];
							templateControl.VisualProperties = this.GetTemplateControlVisualProperties(templateControl.Id, resolution.TemplateControlVisualProperties);
						}
					};

					this.SetTemplateControlVisualProperties = function (template, resolution, templateControl)
					{
						for (var i = 0; i < resolution.TemplateControlVisualProperties.length; i++)
						{
							var templateControlVisualProperties = resolution.TemplateControlVisualProperties[i];
							if (templateControlVisualProperties.Key == templateControl.Id)
							{
								resolution.TemplateControlVisualProperties[i].Value = templateControl.VisualProperties;
								return;
							}
						}

						for (var i = 0; i < template.Resolutions.length; i++)
						{
							//there was no visualproperties available for this specific control so we add it
							template.Resolutions[i].TemplateControlVisualProperties.push(
							{
								Key: templateControl.Id,
								Value: templateControl.VisualProperties
							});
						}
					};

					this.OnTemplateControlUpdate = function (scope, templateControl)
					{
						var template = scope.currentScope.DataBagService.GetData("Template");

						//Find resolution using current slider value: $scope.SliderValue
						var resolution = this.FindResolution(template, scope.currentScope.SliderValue);

						//Find template control using templateControl.Id
						//and update the values in the mediaquery for this template control
						this.SetTemplateControlVisualProperties(template, resolution, templateControl);
					};

					this.RemoveTemplateControlFromResolutions = function (template, templateControl)
					{
						for (var resolutionIndex = 0; resolutionIndex < template.Resolutions.length; resolutionIndex++)
						{
							var resolution = template.Resolutions[resolutionIndex];
							resolution.TemplateControlVisualProperties.RemoveValue("Key", templateControl.Id);
						}
					};
				}
			]);
	});