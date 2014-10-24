define(
	[
		"angular",

		"../Model/TemplateMode.js",
		"../Model/Template.js",
		"../Model/TemplateControl.js",
		"../Model/Resolution.js",

		"./TemplateLocalStorageProvider.js",
		"./TemplateRestProvider.js"
	],
	function (angular)
	{
		return angular
			.module("Cerberus.Tool.TemplateEngine.Service.Template", [])
			.provider("Cerberus.Tool.TemplateEngine.Service.Template",
			[
				function ()
				{
					var templateProvider = null,
						templateProviderParameters = null;

					this.SetProvider = function (provider, parameters)
					{
						templateProvider = provider;
						templateProviderParameters = parameters;
					};

					this.$get =
					[
						"$injector",
						function ($injector)
						{
							var templateProviderInstance = $injector.instantiate(templateProvider);
							if (templateProviderParameters)
							{
								templateProviderInstance.Configure(templateProviderParameters);
							}

							return templateProviderInstance;
						}
					];
				}
			]);
	});