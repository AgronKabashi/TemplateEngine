(function (angular, $, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Helper.TemplateEditor", [
      "Cerberus.TemplateEngine.Service.Event",
      TemplateEditorHelper
    ]);

  function TemplateEditorHelper(EventService) {
    // Properties that are not on this list will be stripped away
    // TODO: Refactor into Cerberus.TemplateEditor.Helper.CSS
    // TODO: Use hashmap instead to reduce lookup time
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
      "transform-origin",
      "z-index"
    ];

    /***************************************************************
    PRESENTATION LOGIC
    ***************************************************************/
    //TODO: Remove - should be handled by Cerberus.TemplateEditor.Helper.CSS
    function extractVisualProperties(style) {
      var result = [];
      var propertyName = "",
        sanitizedPropertyName = "",
        propertyValue = "";

      for (var i = 0, length = validProperties.length; i < length; i++) {
        propertyName = validProperties[i];
        sanitizedPropertyName = propertyName.replace(/-([A-Z])/gi, function (v) {
          return v[1].toUpperCase();
        });

        propertyValue = style[sanitizedPropertyName];

        if (propertyValue !== "") {
          result.push(String.format("{0}:{1}", propertyName, propertyValue));
        }
      }

      return result.join(";");
    }

    function storeDragResizeSettings(element) {
      var style = element.get(0).style;
      var isTransposedHorizontal = style.right.length > 0,
        isTransposedVertical = style.bottom.length > 0,
        horizontalUnitName = isTransposedHorizontal ? "right" : "left",
        verticalUnitName = isTransposedVertical ? "bottom" : "top",
        isWidthInPercent = !isNaN(parseInt(style.width)) && style.width.indexOf("%") >= 0,
        isHeightInPercent = !isNaN(parseInt(style.height)) && style.height.indexOf("%") >= 0,
        isHorizontalInPercent = !isNaN(parseInt(style[horizontalUnitName])) && style[horizontalUnitName].indexOf("%") >= 0,
        isVerticalInPercent = !isNaN(parseInt(style[verticalUnitName])) && style[verticalUnitName].indexOf("%") >= 0;

      element.data("dragResizeSettings", {
        isTransposedHorizontal: isTransposedHorizontal,
        isTransposedVertical: isTransposedVertical,
        isHorizontalInPercent: isHorizontalInPercent,
        isVerticalInPercent: isVerticalInPercent,
        isWidthInPercent: isWidthInPercent,
        isHeightInPercent: isHeightInPercent
      });
    }

    function sanitizeDragValues(element) {
      // TODO: Clean up
      var nativeElement = element.get(0);
      var template = element.parent(),
        templateWidth = template.width(),
        templateHeight = template.height();

      var value,
        horizontal = 0,
        vertical = 0,
        dragResizeSettings = element.data("dragResizeSettings"),
        isTransposedVertical = dragResizeSettings.isTransposedVertical,
        isTransposedHorizontal = dragResizeSettings.isTransposedHorizontal,
        isHorizontalInPercent = dragResizeSettings.isHorizontalInPercent,
        isVerticalInPercent = dragResizeSettings.isVerticalInPercent,
        elementWidth = element.outerWidth(),
        elementHeight = ~~element.outerHeight();

      //jQuery draggable can't handle positioning types other than left/top
      //Since left/top have higher priority than their transposed counterparts, we can set the values for the counterparts if needed
      //without any repercussions.

      //Horizontal Positioning
      if (isHorizontalInPercent) {
        //Percentage based positioning
        horizontal = tryParseFloat(element.css("left"));
        element.css("left", String.format("{0}%", (100.0 * horizontal / templateWidth).toFixed(1)));

        if (isTransposedHorizontal) {
          nativeElement.style.right = String.format("{0}%", 100 - 100.0 * (horizontal / templateWidth + elementWidth / templateWidth)).toFixed(1);
        }
        else {
          nativeElement.style.right = "";
        }
      }
      else {
        //Pixel based positioning
        value = tryParseFloat(nativeElement.style.left);
        nativeElement.style.left = value + "px";

        if (isTransposedHorizontal) {
          nativeElement.style.right = templateWidth - value - elementWidth + "px";
        }
        else {
          nativeElement.style.right = "";
        }
      }

      //Vertical Positioning
      if (isVerticalInPercent) {
        //Percentage based positioning
        vertical = tryParseFloat(element.css("top"));
        element.css("top", String.format("{0}%", (100.0 * vertical / templateHeight).toFixed(1)));

        if (isTransposedVertical) {
          nativeElement.style.bottom = String.format("{0}%", 100 - 100.0 * (vertical / templateHeight + elementHeight / templateHeight)).toFixed(1);
        }
        else {
          nativeElement.style.bottom = "";
        }
      }
      else {
        //Pixel based positioning
        value = tryParseFloat(nativeElement.style.top);
        nativeElement.style.top = value + "px";

        if (isTransposedVertical) {
          nativeElement.style.bottom = templateHeight - value - elementHeight + "px";
        }
        else {
          nativeElement.style.bottom = "";
        }
      }
    }

    function sanitizeResizeValues(element) {
      var template = element.parent(),
        templateWidth = template.width(),
        templateHeight = template.height();

      var width = 0,
        height = 0,
        dragResizeSettings = element.data("dragResizeSettings"),
        isWidthInPercent = dragResizeSettings.isWidthInPercent,
        isHeightInPercent = dragResizeSettings.isHeightInPercent;

      //Dimensions
      if (isWidthInPercent) {
        width = tryParseFloat(element.css("width"));
        element.css("width", String.format("{0}%", (100.0 * width / templateWidth).toFixed(1)));
      }

      if (isHeightInPercent) {
        height = tryParseFloat(element.css("height"));
        element.css("height", String.format("{0}%", (100.0 * height / templateHeight).toFixed(1)));
      }
    }

    this.updateVisualProperties = function (eventId, element) {
      var scope = element.scope();
      var nativeElement = element.get(0);

      var removePropertyMethod = nativeElement.style.removeProperty ? nativeElement.style.removeProperty : nativeElement.style.removeAttribute;

      //resizable adds position:absolute even though it's already in the applied class
      removePropertyMethod.call(nativeElement.style, "position");
      scope.component.visualProperties = extractVisualProperties(nativeElement.style);
      EventService.notify(eventId, scope.component);
    };

    this.enableDraggable = function (componentElement) {
      var self = this;
      var table = {};
      var selectedElements;

      componentElement
        .draggable({
          snap: true,
          snapTolerance: 10,
          start: function (e) {
            var allowDrag = componentElement.hasClass("selected");

            selectedElements = $("cs-component.selected");
            componentElement.draggable("option", "snap", e.ctrlKey);

            if (allowDrag) {
              selectedElements
                .each(function () {
                  var element = $(this);
                  storeDragResizeSettings(element);

                  table[this.id] = {
                    startPosition: element.position()
                  };
                })
                .addClass("ui-draggable-dragging");
            }

            return allowDrag;
          },

          drag: function (e, ui) {
            var elementData,
              offsetLeft = ui.originalPosition.left - ui.position.left,
              offsetTop = ui.originalPosition.top - ui.position.top;

            componentElement.draggable("option", "snap", e.ctrlKey);

            selectedElements.each(function () {
              var element = $(this);

              elementData = table[this.id];
              element.css({
                left: elementData.startPosition.left - offsetLeft,
                top: elementData.startPosition.top - offsetTop
              });

              sanitizeDragValues(element);
            });

            // TODO: Optimize by reducing notification frequency
            self.updateVisualProperties("ComponentUpdating", componentElement);
          },

          stop: function (e, ui) {
            var dragResizeSettings = componentElement.data("dragResizeSettings"),
              offsetLeft = ui.originalPosition.left - ui.position.left,
              offsetTop = ui.originalPosition.top - ui.position.top,
              elementData;

            selectedElements.each(function () {
              var element = $(this);
              var nativeElement = element.get(0);

              elementData = table[this.id];
              element.css({
                left: elementData.startPosition.left - offsetLeft,
                top: elementData.startPosition.top - offsetTop
              });

              sanitizeDragValues(element);

              var removePropertyMethod = nativeElement.style.removeProperty ? nativeElement.style.removeProperty : nativeElement.style.removeAttribute;
              var isTransposedHorizontal = dragResizeSettings.IsTransposedHorizontal;
              var isTransposedVertical = dragResizeSettings.IsTransposedVertical;

              removePropertyMethod.call(nativeElement.style, isTransposedHorizontal ? "left" : "right");
              removePropertyMethod.call(nativeElement.style, isTransposedVertical ? "top" : "bottom");

              delete nativeElement.style.right;

              element.data("dragResizeSetting", undefined);
            })
            .removeClass("ui-draggable-dragging");

            self.updateVisualProperties("ComponentPositionUpdated", componentElement);
          }
        });
    };

    this.enableResizable = function (element) {
      var self = this;
      element.resizable({
        start: function () {
          storeDragResizeSettings(element);
        },

        resize: function () {
          sanitizeResizeValues(element);
          self.updateVisualProperties("ComponentUpdating", element);
        },

        stop: function () {
          sanitizeResizeValues(element);
          element.data("dragResizeSetting", undefined);
          self.updateVisualProperties("ComponentSizeUpdated", element);
        }
      });
    };

    /***************************************************************
    BUSINESS LOGIC
    TODO: Refactor into separate service
    ***************************************************************/
    this.remapComponentVisualProperties = function (template, resolution) {
      _.forEach(template.components, function (component) {
        component.visualProperties = resolution.componentVisualProperties[component.id] || "";
      });
    };

    this.setComponentVisualProperties = function (template, resolution, component, populateIfNeeded) {
      var hasComponent = resolution.componentVisualProperties[component.id] !== undefined;

      resolution.componentVisualProperties[component.id] = component.visualProperties;

      if (!hasComponent && populateIfNeeded) {
        //there was no visualproperties available for this specific component so we add it
        _.forEach(template.resolutions, function (res) {
          res.componentVisualProperties[component.id] = component.visualProperties;
        });
      }
    };

    this.removeComponentsFromTemplate = function (template, components) {
      _.forEach(components, function (component) {
        _.remove(template.components, { id: component.id });
        _.forEach(template.resolutions, function (resolution) {
          delete resolution.componentVisualProperties[component.id];
        });
      });
    };
  }
})(window.angular, window.jQuery, window._);