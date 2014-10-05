namespace("Cerberus.Service")
	.HttpPostOptions = function ()
	{
		this.Url = "";								//Url to service
		this.Parameters = null;						//parameters to the service
		this.DefaultValue = [];						//default type and value
		this.SuccessCallback = null;				//method to call on success
		this.ErrorCallback = null;					//method to call on error
		this.MergeResultWithDefaultValue = false;	//merge the defaultvalue with the result from the service
	};

angular
	.module("ng")
	.service("Cerberus.Service.HttpPost",
	[
		"$http",
		function ($http)
		{
			this.ExecuteCommand = function (options)
			{
				options = angular.extend(new Cerberus.Service.HttpPostOptions(), options);

				var object = options.DefaultValue;

				$http
					.post(options.Url, options.Parameters)
					.success(function (response)
					{
						if (typeof object === "object" && options.MergeResultWithDefaultValue)
						{
							angular.extend(object, response.d);
						}
						else
						{
							object = response.d;
						}

						if (options.SuccessCallback)
						{
							options.SuccessCallback(object, response);
						}
					})
					.error(function (response)
					{
						if (options.ErrorCallback)
						{
							options.ErrorCallback(object, response);
						}
					});

				return object;
			}
		}
	]);