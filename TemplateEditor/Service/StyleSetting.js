define(
	[
		"angular"
	],
	function (angular)
	{
		return angular
			.module("Cerberus.Tool.TemplateEditor.Service.StyleSetting", [])
			.service("Cerberus.Tool.TemplateEditor.Service.StyleSetting",
			[
				"Cerberus.Tool.TemplateEditor.Localization",
				function (Localization)
				{
					this.GetAvailableFontFamilies = function ()
					{
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

					this.GetBorderStyles = function ()
					{
						return [
							{ Name: Localization.TemplateControlProperties.BrowserDefault, Value: undefined },
							{ Name: Localization.TemplateControlProperties.BorderSolid, Value: "solid" },
							{ Name: Localization.TemplateControlProperties.BorderDashed, Value: "dashed" },
							{ Name: Localization.TemplateControlProperties.BorderDotted, Value: "dotted" },
							{ Name: Localization.TemplateControlProperties.BorderGroove, Value: "groove" },
							{ Name: Localization.TemplateControlProperties.BorderDouble, Value: "double" },
							{ Name: Localization.TemplateControlProperties.BorderInset, Value: "inset" },
							{ Name: Localization.TemplateControlProperties.BorderOutset, Value: "outset" }
						];
					};

					this.GetBackgroundImageRepeatOptions = function ()
					{
						return [
							{ Name: Localization.TemplateControlProperties.BrowserDefault, Value: undefined },
							{ Name: Localization.TemplateControlProperties.Repeat, Value: "repeat" },
							{ Name: Localization.TemplateControlProperties.RepeatHorizontally, Value: "repeat-x" },
							{ Name: Localization.TemplateControlProperties.RepeatVertically, Value: "repeat-y" },
							{ Name: Localization.TemplateControlProperties.DontRepeat, Value: "no-repeat" }
						];
					};

					this.GetBackgroundPositionHorizontalOptions = function ()
					{
						return [
							{ Name: Localization.TemplateControlProperties.BrowserDefault, Value: undefined },
							{ Name: Localization.TemplateControlProperties.Left, Value: "0%" },
							{ Name: Localization.TemplateControlProperties.Center, Value: "50%" },
							{ Name: Localization.TemplateControlProperties.Right, Value: "100%" }
						];
					};

					this.GetBackgroundPositionVerticalOptions = function ()
					{
						return [
							{ Name: Localization.TemplateControlProperties.BrowserDefault, Value: undefined },
							{ Name: Localization.TemplateControlProperties.Top, Value: "0%" },
							{ Name: Localization.TemplateControlProperties.Center, Value: "50%" },
							{ Name: Localization.TemplateControlProperties.Bottom, Value: "100%" }
						];
					};

					this.GetBackgroundSizeOptions = function ()
					{
						return [
							{ Name: Localization.TemplateControlProperties.BrowserDefault, Value: undefined },
							{ Name: Localization.TemplateControlProperties.Contain, Value: "contain" },
							{ Name: Localization.TemplateControlProperties.Cover, Value: "cover" }
						];
					};
				}
			]);
	});