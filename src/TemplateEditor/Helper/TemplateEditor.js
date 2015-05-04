(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Helper.TemplateEditor", [
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.DataBag",
      function (EventService, DataBagService) {
        var self = this;
        //properties that are not on this list will be stripped away
        //TODO: Refactor into Cerberus.TemplateEditor.Helper.CSS
        var validProperties = [
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
        //TODO: Remove - should be handled by Cerberus.TemplateEditor.Helper.CSS
        function ExtractVisualProperties(style) {
          var result = [];
          var propertyName = "",
            sanitizedPropertyName = "",
            propertyValue = "";

          for (var i = 0, length = validProperties.length; i < length; i++) {
            propertyName = validProperties[i];
            sanitizedPropertyName = propertyName.replace(/-([A-Z])/gi, function (v) { return v[1].toUpperCase(); });
            propertyValue = style[sanitizedPropertyName];

            if (propertyValue !== "") {
              result.push(String.format("{0}:{1}", propertyName, propertyValue));
            }
          }

          return result.join(";");
        }

        function StoreDragResizeSettings(element) {
          var style = element.get(0).style;
          var isTransposedHorizontal = style.right.length > 0,
            isTransposedVertical = style.bottom.length > 0,
            horizontalUnitName = isTransposedHorizontal ? "right" : "left",
            verticalUnitName = isTransposedVertical ? "bottom" : "top",
            widthInPercent = !isNaN(parseInt(style["width"])) && style["width"].indexOf("%") >= 0,
            heightInPercent = !isNaN(parseInt(style["height"])) && style["height"].indexOf("%") >= 0,
            horizontalInPercent = !isNaN(parseInt(style[horizontalUnitName])) && style[horizontalUnitName].indexOf("%") >= 0,
            verticalInPercent = !isNaN(parseInt(style[verticalUnitName])) && style[verticalUnitName].indexOf("%") >= 0;

          element.data("dragResizeSettings", {
            "IsTransposedHorizontal": isTransposedHorizontal,
            "IsTransposedVertical": isTransposedVertical,
            "UnitHorizontal": horizontalInPercent,
            "UnitVertical": verticalInPercent,
            "UnitWidth": widthInPercent,
            "UnitHeight": heightInPercent
          });
        }

        function SanitizeDragValues(element) {
          var nativeElement = element.get(0);
          var template = element.parent(),
            templateWidth = template.width(),
            templateHeight = template.height();

          var horizontal = 0,
            vertical = 0,
            width = 0,
            height = 0,
            dragResizeSettings = element.data("dragResizeSettings"),
            isTransposedVertical = dragResizeSettings.IsTransposedVertical,
            isTransposedHorizontal = dragResizeSettings.IsTransposedHorizontal,
            horizontalInPercent = dragResizeSettings.UnitHorizontal,
            verticalInPercent = dragResizeSettings.UnitVertical,
            elementWidth = element.outerWidth(),
            elementHeight = ~~element.outerHeight();

          //jQuery draggable can't handle positioning types other than left/top
          //Since left/top have higher priority than their transposed counterparts, we can set the values for the counterparts if needed
          //without any repercussions.

          //Horizontal Positioning
          if (horizontalInPercent) {
            //Percentage based positioning
            horizontal = tryParseInt(element.css("left"));
            element.css("left", String.format("{0}%", (100.0 * horizontal / templateWidth).toFixed(1)));

            if (isTransposedHorizontal) {
              nativeElement.style["right"] = String.format("{0}%", (100 - (100.0 * (horizontal / templateWidth + elementWidth / templateWidth))).toFixed(1));
            }
          }
          else {
            //Pixel based positioning
            var value = tryParseInt(nativeElement.style["left"]);
            nativeElement.style["left"] = value + "px";

            if (isTransposedHorizontal) {
              nativeElement.style["right"] = templateWidth - value - elementWidth + "px";
            }
          }

          //Vertical Positioning
          if (verticalInPercent) {
            //Percentage based positioning
            vertical = tryParseInt(element.css("top"));
            element.css("top", String.format("{0}%", (100.0 * vertical / templateHeight).toFixed(1)));

            if (isTransposedVertical) {
              nativeElement.style["bottom"] = String.format("{0}%", (100 - (100.0 * (vertical / templateHeight + elementHeight / templateHeight))).toFixed(1));
            }
          }
          else {
            //Pixel based positioning
            var value = tryParseInt(nativeElement.style["top"]);
            nativeElement.style["top"] = value + "px";

            if (isTransposedVertical) {
              nativeElement.style["bottom"] = templateHeight - value - elementHeight + "px";
            }
          }
        }

        function SanitizeResizeValues(element) {
          var nativeElement = element.get(0);

          var template = element.parent(),
            templateWidth = template.width(),
            templateHeight = template.height();

          var width = 0,
            height = 0,
            dragResizeSettings = element.data("dragResizeSettings"),
            widthInPercent = dragResizeSettings.UnitWidth,
            heightInPercent = dragResizeSettings.UnitHeight;

          //Dimensions
          if (widthInPercent) {
            width = tryParseInt(element.css("width"));
            element.css("width", String.format("{0}%", (100.0 * width / templateWidth).toFixed(1)));
          }

          if (heightInPercent) {
            height = tryParseInt(element.css("height"));
            element.css("height", String.format("{0}%", (100.0 * height / templateHeight).toFixed(1)));
          }
        }

        this.UpdateVisualProperties = function (eventId, element) {
          var scope = element.scope();
          var nativeElement = element.get(0);

          var removePropertyMethod = nativeElement.style.removeProperty ? nativeElement.style.removeProperty : nativeElement.style.removeAttribute;

          //resizable adds position:absolute even though it's already in the applied class
          removePropertyMethod.call(nativeElement.style, "position");
          scope.Component.VisualProperties = ExtractVisualProperties(nativeElement.style);
          EventService.Notify(eventId, scope.Component);
        };

        this.EnableDraggable = function (componentElement) {
          var self = this;
          var table = {};
          var selectedElements;

          componentElement
            .draggable({
              snap: true,
              snapTolerance: 10,
              start: function (e, ui) {
                var sourceElement = $(this);
                var selectedElements = $("cs-component.selected");
                var allowDrag = sourceElement.hasClass("selected");

                sourceElement.draggable("option", "snap", e.ctrlKey);

                if (allowDrag) {
                  selectedElements
                    .each(function () {
                      var element = $(this);
                      StoreDragResizeSettings(element);

                      table[this.id] = {
                        StartPosition: element.position()
                      };
                    })
                    .addClass("ui-draggable-dragging");
                }

                return allowDrag;
              },

              drag: function (e, ui) {
                var sourceElement = $(this),
                    elementData,
                    selectedElements = $("cs-component.selected"),
                    offsetLeft = ui.originalPosition.left - ui.position.left,
                    offsetTop = ui.originalPosition.top - ui.position.top;

                sourceElement.draggable("option", "snap", e.ctrlKey);

                selectedElements.each(function () {
                  var element = $(this);

                  elementData = table[this.id];
                  element.css({
                    left: elementData.StartPosition.left - offsetLeft,
                    top: elementData.StartPosition.top - offsetTop
                  });

                  SanitizeDragValues(element);

                  //TODO: Update only if we're dragging a single component
                  self.UpdateVisualProperties("ComponentUpdating", element);
                });
              },

              stop: function (e, ui) {
                var sourceElement = $(this),
                    selectedElements = $("cs-component.selected"),
                    dragResizeSettings = sourceElement.data("dragResizeSettings"),
                    offsetLeft = ui.originalPosition.left - ui.position.left,
                    offsetTop = ui.originalPosition.top - ui.position.top,
                    elementData;

                selectedElements.each(function () {
                  var element = $(this);
                  var nativeElement = element.get(0);

                  elementData = table[this.id];
                  element.css({
                    left: elementData.StartPosition.left - offsetLeft,
                    top: elementData.StartPosition.top - offsetTop
                  });

                  SanitizeDragValues(element);

                  var removePropertyMethod = nativeElement.style.removeProperty ? nativeElement.style.removeProperty : nativeElement.style.removeAttribute;
                  var isTransposedHorizontal = dragResizeSettings.IsTransposedHorizontal;
                  var isTransposedVertical = dragResizeSettings.IsTransposedVertical;

                  if (isTransposedHorizontal) {
                    removePropertyMethod.call(nativeElement.style, "left");
                  }

                  if (isTransposedVertical) {
                    removePropertyMethod.call(nativeElement.style, "top");
                  }

                  element
                    .removeAttr("IsTransposedHorizontal")
                    .removeAttr("IsTransposedVertical")
                    .removeAttr("UnitWidth")
                    .removeAttr("UnitHeight")
                    .removeAttr("UnitHorizontal")
                    .removeAttr("UnitVertical");

                  self.UpdateVisualProperties("ComponentUpdated", element);
                })
                .removeClass("ui-draggable-dragging");
              }
            });
        };

        this.EnableResizable = function (element) {
          var self = this;
          element
            .resizable(
            {
              start: function () {
                var element = $(this);
                StoreDragResizeSettings(element);
              },

              resize: function () {
                var element = $(this);
                SanitizeResizeValues(element);

                self.UpdateVisualProperties("ComponentUpdating", element);
              },

              stop: function (event, ui) {
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

                self.UpdateVisualProperties("ComponentUpdated", element);
              }
            });
        };

        /***************************************************************
        BUSINESS LOGIC
        TODO: Refactor into separate service
        ***************************************************************/
        this.RemapComponentVisualProperties = function (template, resolution) {
          _.forEach(template.Components, function (component) {
            component.VisualProperties = resolution.ComponentVisualProperties[component.Id] || "";
          });
        };

        this.SetComponentVisualProperties = function (template, resolution, component) {
          if (resolution.ComponentVisualProperties[component.Id]) {
            resolution.ComponentVisualProperties[component.Id] = component.VisualProperties;
            return;
          }

          //there was no visualproperties available for this specific component so we add it
          _.forEach(template.Resolutions, function (resolution) {
            resolution.ComponentVisualProperties[component.Id] = component.VisualProperties;
          });
        };

        this.RemoveComponentFromResolutions = function (template, component) {
          _.forEach(template.Resolutions, function (resolution) {
            delete resolution.ComponentVisualProperties[component.Id];
          });
        };
      }
    ]);
})(window.angular);