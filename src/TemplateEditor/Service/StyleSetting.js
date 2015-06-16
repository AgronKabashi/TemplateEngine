(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.StyleSetting", [
      "Cerberus.TemplateEditor.Localization",
      function (Localization) {
        this.GetAvailableFontFamilies = function () {
          return [
            "Arial",
            "Courier New",
            "Impact",
            "Lucida Console",
            "Tahoma",
            "Times New Roman",
            "Verdana",
            "Roboto",
            "Ropa Sans",
            "Droid Sans",
            "Rouge Script"
          ];
        };

        this.GetBorderStyles = function () {
          return [
            { Name: Localization.ComponentProperties.BrowserDefault, Value: undefined },
            { Name: Localization.ComponentProperties.BorderSolid, Value: "solid" },
            { Name: Localization.ComponentProperties.BorderDashed, Value: "dashed" },
            { Name: Localization.ComponentProperties.BorderDotted, Value: "dotted" },
            { Name: Localization.ComponentProperties.BorderGroove, Value: "groove" },
            { Name: Localization.ComponentProperties.BorderDouble, Value: "double" },
            { Name: Localization.ComponentProperties.BorderInset, Value: "inset" },
            { Name: Localization.ComponentProperties.BorderOutset, Value: "outset" }
          ];
        };

        this.GetBackgroundImageRepeatOptions = function () {
          return [
            { Name: Localization.ComponentProperties.BrowserDefault, Value: undefined },
            { Name: Localization.ComponentProperties.Repeat, Value: "repeat" },
            { Name: Localization.ComponentProperties.RepeatHorizontally, Value: "repeat-x" },
            { Name: Localization.ComponentProperties.RepeatVertically, Value: "repeat-y" },
            { Name: Localization.ComponentProperties.DontRepeat, Value: "no-repeat" }
          ];
        };

        this.GetBackgroundPositionHorizontalOptions = function () {
          return [
            { Name: Localization.ComponentProperties.BrowserDefault, Value: undefined },
            { Name: Localization.ComponentProperties.Left, Value: "0%" },
            { Name: Localization.ComponentProperties.Center, Value: "50%" },
            { Name: Localization.ComponentProperties.Right, Value: "100%" }
          ];
        };

        this.GetBackgroundPositionVerticalOptions = function () {
          return [
            { Name: Localization.ComponentProperties.BrowserDefault, Value: undefined },
            { Name: Localization.ComponentProperties.Top, Value: "0%" },
            { Name: Localization.ComponentProperties.Center, Value: "50%" },
            { Name: Localization.ComponentProperties.Bottom, Value: "100%" }
          ];
        };

        this.GetBackgroundSizeOptions = function () {
          return [
            { Name: Localization.ComponentProperties.BrowserDefault, Value: undefined },
            { Name: Localization.ComponentProperties.Contain, Value: "contain" },
            { Name: Localization.ComponentProperties.Cover, Value: "cover" }
          ];
        };
      }
    ]);
})(window.angular);