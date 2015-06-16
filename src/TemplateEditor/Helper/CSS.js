(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
		.service("Cerberus.TemplateEditor.Helper.CSS", function () {
		  function ProcessShadowData(shadowData) {
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
		        color: color,
		        inset: inset
		      };

		      for (var i = 1; i <= Math.min(arguments.length, valuesExcludingColorAndInset.length) ; i++) {
		        result[arguments[i]] = valuesExcludingColorAndInset[i - 1] || "0";
		      }
		    }

		    return result;
		  }

		  //Creates a JSONP object from a CSS declaration
		  this.FromCss = function (css) {
		    var properties = css.split(";");
		    var result = {};
		    for (var i = 0; i < properties.length; i++) {
		      var propertyName = properties[i].split(":", 1)[0];

		      if (propertyName && properties[i].length > propertyName.length) {
		        var propertyValue = properties[i].substring(propertyName.length + 1);
		        //converts hyphenated properties into camelcaseproperties
		        //	text-align => textAlign
		        //	border-top-left-radius => borderTopLeftRadius
		        propertyName = propertyName.toLowerCase().replace(/-([A-Z])/gi, function (v) { return v[1].toUpperCase(); });

		        result[propertyName.trim()] = propertyValue.trim();
		      }
		    }

		    //Special processing for background-image
		    if (result["backgroundImage"] !== undefined) {
		      var backgroundImage = result["backgroundImage"];
		      backgroundImage = backgroundImage.replace(/url\(/i, "");
		      if (backgroundImage[backgroundImage.length - 1] == ')') {
		        backgroundImage = backgroundImage.substr(0, backgroundImage.length - 1);
		      }

		      result["backgroundImage"] = backgroundImage;
		    }

		    //Special processing for box shadow
		    if (result["boxShadow"] !== undefined) {
		      result.boxShadow = ProcessShadowData(result["boxShadow"], "hShadow", "vShadow", "blurRadius", "spreadRadius");
		    }

		    //Special processing for text shadow
		    if (result["textShadow"] !== undefined) {
		      result.textShadow = ProcessShadowData(result["textShadow"], "hShadow", "vShadow", "blurRadius");
		    }

		    //Special processing for transform
		    if (result["transform"] || result["WebkitTransform"]) {
		      var transforms = (result["transform"] == "undefined" ? result["WebkitTransform"] : result["transform"]) || "";
		      result.transform = {
		        rotateZ: ""
		      };

		      if (transforms) {
		        var rotateZ = transforms.match(/rotateZ\([^\)]+\)/i);
		        if (rotateZ.length > 0) {
		          result.transform.rotateZ = rotateZ[0].toLowerCase().replace("rotatez(", "").replace(")", "");
		        }
		      }
		    }

		    return result;
		  };

		  this.ToCss = function (value) {
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
		        case "box-shadow":
		          color = value[i]["color"];

		          if (color) {
		            propertyValue = String.format("{0} {1} {2} {3} {4} {5}",
                  color || "",
                  value[i]["hShadow"] || "0px",
                  value[i]["vShadow"] || "0px",
                  value[i]["blurRadius"] || "0px",
                  value[i]["spreadRadius"] || "0px",
                  ~~value[i]["inset"] ? "inset" : "");
		          }

		          break;

		        case "background-image":
		          if (value[i].length > 0) {
		            propertyValue = String.format("url({0})", value[i]);
		          }
		          break;

		        case "text-shadow":
		          color = value[i]["color"];

		          if (color) {
		            propertyValue = String.format("{0} {1} {2} {3}",
                  color,
                  value[i]["hShadow"] || "0px",
                  value[i]["vShadow"] || "0px",
                  value[i]["blurRadius"] || "0px");
		          }

		          break;

		        default:
		          propertyValue = value[i];
		          break;
		      }

		      if (propertyValue && propertyValue.length > 0) {
		        result.push(String.format("{0}:{1}", propertyName, propertyValue));
		      }
		    }

		    return result.join(";");
		  };
		});
})(window.angular);