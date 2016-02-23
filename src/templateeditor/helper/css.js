(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Helper.CSS", ["Cerberus.ModelFactory", CSSHelperService]);

  var propertiesWithUnits = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    width: true,
    height: true,
    maxHeight: true,
    maxWidth: true,
    minHeight: true,
    minWidth: true,
    fontSize: true,
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomLeftRadius: true,
    borderBottomRightRadius: true,
    borderTopWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true
  };

  function CSSHelperService(ModelFactory) {
    // Creates a JSON object from a CSS declaration
    this.fromCss = function (css) {
      var properties = css.split(";");
      var result = {};

      // Process any default CSS attributes
      _.forEach(properties, function (property) {
        var propertyName = property.split(":", 1)[0];

        if (propertyName && property.length > propertyName.length) {
          var propertyValue = property.substring(propertyName.length + 1).trim();
          // Converts hyphenated properties into camelcaseproperties
          //  text-align => textAlign
          //  border-top-left-radius => borderTopLeftRadius
          propertyName = _.camelCase(propertyName);

          result[propertyName] = !isUnitProperty(propertyName) ? propertyValue : ModelFactory.instantiateModel("Cerberus.TemplateEditor.Model.Unit", propertyValue);
        }
      });

      // TODO: Refactor special post-processing into a more generic solution
      // Special post-processing for background-image
      if (result.backgroundImage) {
        var backgroundImage = result.backgroundImage;
        backgroundImage = backgroundImage.replace(/^url\(/i, "");
        if (backgroundImage[backgroundImage.length - 1] === ")") {
          backgroundImage = backgroundImage.substring(0, backgroundImage.length - 1);
        }

        result.backgroundImage = backgroundImage;
      }

      // Special post-processing for box shadow
      if (result.boxShadow) {
        result.boxShadow = processShadowData(result.boxShadow, "hShadow", "vShadow", "blurRadius", "spreadRadius");
      }

      // Special post-processing for text shadow
      if (result.textShadow) {
        result.textShadow = processShadowData(result.textShadow, "hShadow", "vShadow", "blurRadius");
      }

      // Special post-processing for transform
      if (result.transform) {
        result.transform = processTransform(result.transform);
      }

      // Special post-processing for transform-origin
      if (result.transformOrigin) {
        result.transformOrigin = processTransformOrigin(result.transformOrigin);
      }

      return result;
    };

    this.toCss = function (value) {
      var result = [];

      var propertyName = "";
      var propertyValue = "";
      var color;

      for (var i in value) {
        //Converts camelcase properties into hyphenated properties
        //textAlign => text-align
        //borderTopLeftRadius => border-top-left-radius
        propertyName = i.replace(/([A-Z])/g, "-$1").toLowerCase();
        propertyValue = "";

        //Custom preprocessing
        //TODO: Needs refactoring
        switch (propertyName) {
          case "background-image":
            if (value[i].length > 0) {
              propertyValue = String.format("url({0})", value[i]);
            }
            break;

          case "box-shadow":
            color = value[i].color;

            if (color) {
              propertyValue = String.format("{0} {1} {2} {3} {4} {5}",
                color,
                unitToString(value[i].hShadow, "0px"),
                unitToString(value[i].vShadow, "0px"),
                unitToString(value[i].blurRadius, "0px"),
                unitToString(value[i].spreadRadius, "0px"),
                ~~value[i].inset ? "inset" : "");
            }
            break;

          case "text-shadow":
            color = value[i].color;

            if (color) {
              propertyValue = String.format("{0} {1} {2} {3}",
                color,
                unitToString(value[i].hShadow, "0px"),
                unitToString(value[i].vShadow, "0px"),
                unitToString(value[i].blurRadius, "0px"));
            }
            break;

          case "transform":
            propertyValue = String.format("rotateZ({0})", unitToString(value[i].rotateZ, 0));
            break;

          case "transform-origin":
            if (value[i].x || value[i].y) {
              propertyValue = [unitToString(value[i].x, "left"), unitToString(value[i].y, "top")].join(" ");
              // Special case, do not save if we have default values
              if (propertyValue === "left top") {
                propertyValue = undefined;
              }
            }
            break;

          default:
            propertyValue = isUnitProperty(i) ? unitToString(value[i], "") : value[i];
        }

        if (propertyValue && propertyValue.length > 0) {
          result.push(String.format("{0}:{1}", propertyName, propertyValue));
        }
      }

      return result.join(";");
    };

    function processShadowData(shadowData) {
      var rgbaColorMatchPattern = /rgba?\([^\)]+\)/i,
        hexColorMatchPattern = /#[0-9a-f]{0,6}/i,
        namedColorMatchPattern = /\b[a-z]+/i,
        insetMatchPattern = /inset/i;

      var shadowLayers = shadowData.trim().split(/,(?![^\(]*\))/);
      var result;

      if (shadowLayers.length) {
        var shadow = shadowLayers[0];

        var color = shadow.match(rgbaColorMatchPattern) || shadow.match(hexColorMatchPattern) || shadow.match(namedColorMatchPattern);
        var inset = shadow.match(insetMatchPattern);

        var valuesExcludingColorAndInset = shadow
          .replace(color, "")
          .replace(inset, "")
          .trim()
          .split(" ");

        result = {
          color: color[0],
          inset: inset !== null && inset.length > 0
        };

        for (var i = 1; i <= Math.min(arguments.length, valuesExcludingColorAndInset.length); i++) {
          result[arguments[i]] = ModelFactory.instantiateModel("Cerberus.TemplateEditor.Model.Unit", valuesExcludingColorAndInset[i - 1] || "0");
        }
      }

      return result;
    }

    function processTransform(transformData) {
      var result;
      var rotateZ = transformData.match(/rotateZ\([^\)]+\)/i);

      if (rotateZ.length > 0) {
        rotateZ = rotateZ[0].toLowerCase().replace("rotatez(", "").replace(")", "");

        result = {
          rotateZ: ModelFactory.instantiateModel("Cerberus.TemplateEditor.Model.Unit", rotateZ)
        };
      }

      return result;
    }

    function processTransformOrigin(transformOriginData) {
      var result = {};

      var transformOrigin = transformOriginData.split(" ");
      if (transformOrigin[0] && transformOrigin[0] !== "left") {
        result.x = ModelFactory.instantiateModel("Cerberus.TemplateEditor.Model.Unit", transformOrigin[0]);
      }

      if (transformOrigin[1] && transformOrigin[1] !== "top") {
        result.y = ModelFactory.instantiateModel("Cerberus.TemplateEditor.Model.Unit", transformOrigin[1]);
      }

      return result;
    }

    function isUnitProperty(propertyName) {
      return propertiesWithUnits[propertyName] !== undefined;
    }

    function unitToString(unit, defaultValue) {
      return unit && unit.value ? [unit.value, unit.unitType].join("") : defaultValue;
    }
  }
})(window.angular, window._);