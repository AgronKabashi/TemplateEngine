define(["require"], function (require)
{
	return function (controllerId, stateUrl, name, modulePath)
	{
		console.log("Registering " + controllerId);
		return {
			url: stateUrl,
			templateUrl: String.format("{0}View/{1}.html", modulePath, name, "html"),
			controller: controllerId,
			resolve:
			{
				lazyLoad: function ($q)
				{
					console.log("Lazyload initiated for " + name);
					var defer = $q.defer();

					require([String.format("{0}Controller/{1}.js", modulePath, name)], function ()
					{
						defer.resolve();
						console.log("Lazyload completed for " + name);
					});

					return defer.promise;
				}
			}
		};
	};
});