define(function ()
{
	return function (appId)
	{
		return [
			"$controllerProvider",
			"$compileProvider",
			"$filterProvider",
			"$provide",
			function ($controllerProvider, $compileProvider, $filterProvider, $provide)
			{
				var app = angular.module(appId);

				app.value = function (id, args)
				{
					$provide.value(id, args);
					return app;
				};

				app.constant = function (id, args)
				{
					$provide.constant(id, args);
					return app;
				};

				app.service = function (id, args)
				{
					$provide.service(id, args);
					return app;
				};

				app.factory = function (id, args)
				{
					$provide.factory(id, args);
					return app;
				};

				app.controller = function (id, args)
				{
					$controllerProvider.register(id, args);
					return app;
				};

				app.directive = function (id, args)
				{
					$compileProvider.directive(id, args);
					return app;
				};

				app.provider = function (id, args)
				{
					$provide.provider(id, args);
					return app;
				};
			}
		];
	};
});