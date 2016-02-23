(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.StyleSetting", [
      "Cerberus.TemplateEditor.Localization",
      function (localization) {
        this.getVisibilityOptions = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: undefined },
            { name: localization.componentProperties.hidden, value: "none" }
          ];
        };

        this.getShadowOptions = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: false },
            { name: localization.componentProperties.innerShadow, value: true }
          ];
        };

        this.getAvailableFontFamilies = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: undefined },
            { name: "Arial", value: "Arial" },
            { name: "Courier New", value: "Courier New" },
            { name: "Droid Sans", value: "Droid Sans" },
            { name: "Impact", value: "Impact" },
            { name: "Lucida Console", value: "Lucida Console" },
            { name: "Roboto", value: "Roboto" },
            { name: "Ropa Sans", value: "Ropa Sans" },
            { name: "Rouge Script", value: "Rouge Script" },
            { name: "Sans-serif", value: "sans-serif" },
            { name: "Tahoma", value: "Tahoma" },
            { name: "Times New Roman", value: "Times New Roman" },
            { name: "Verdana", value: "Verdana" }
          ];
        };

        this.getBorderStyles = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: undefined },
            { name: localization.componentProperties.borderSolid, value: "solid" },
            { name: localization.componentProperties.borderDashed, value: "dashed" },
            { name: localization.componentProperties.borderDotted, value: "dotted" },
            { name: localization.componentProperties.borderGroove, value: "groove" },
            { name: localization.componentProperties.borderDouble, value: "double" },
            { name: localization.componentProperties.borderInset, value: "inset" },
            { name: localization.componentProperties.borderOutset, value: "outset" }
          ];
        };

        this.getBackgroundImageRepeatOptions = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: undefined },
            { name: localization.componentProperties.repeat, value: "repeat" },
            { name: localization.componentProperties.repeatHorizontally, value: "repeat-x" },
            { name: localization.componentProperties.repeatVertically, value: "repeat-y" },
            { name: localization.componentProperties.dontRepeat, value: "no-repeat" }
          ];
        };

        this.getBackgroundPositionHorizontalOptions = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: undefined },
            { name: localization.componentProperties.left, value: "0%" },
            { name: localization.componentProperties.center, value: "50%" },
            { name: localization.componentProperties.right, value: "100%" }
          ];
        };

        this.getBackgroundPositionVerticalOptions = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: undefined },
            { name: localization.componentProperties.top, value: "0%" },
            { name: localization.componentProperties.center, value: "50%" },
            { name: localization.componentProperties.bottom, value: "100%" }
          ];
        };

        this.getBackgroundSizeOptions = function () {
          return [
            { name: localization.componentProperties.browserDefault, value: undefined },
            { name: localization.componentProperties.contain, value: "contain" },
            { name: localization.componentProperties.cover, value: "cover" }
          ];
        };
      }
    ]);
})(window.angular);