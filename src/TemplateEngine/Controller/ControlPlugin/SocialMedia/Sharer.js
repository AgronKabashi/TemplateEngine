namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.SocialMedia")
	.Sharer = function ()
	{
		this.Facebook = true;
		this.Twitter = true;
		this.GooglePlus = true;
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.SocialMedia.Sharer",
	[
		"$scope",
		"$http",
		function ($scope, $http)
		{
			var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.SocialMedia.Sharer();
			var url = document.location.href;
			
			$scope.SocialMedia =
			{
				Facebook:
				{
					ShareUrl: String.format("http://www.facebook.com/sharer/sharer.php?u={0}", url),
					Count: 0
				},
				Twitter:
				{
					ShareUrl: String.format("http://twitter.com/intent/tweet?url={0}", url),
					Count: 0
				},
				GooglePlus:
				{
					ShareUrl: String.format("https://plus.google.com/share?url={0}", url),
					Count: 0
				}
			};

			//Ensures that whenever content is updated, so is the view
			$scope.$watch('TemplateControl.Content', function ()
			{
				$scope.ControlData = JSON.tryParse($scope.TemplateControl.Content, defaultContent);
			});

			////
			//$http
			//	.get(String.format("http://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{0}%22", url))
			//	.success(function (response)
			//	{
			//		if (response.data.length > 0)
			//		{						
			//			$scope.SocialMedia.Facebook.Count = response.data[0].total_count;
			//		}
			//	});

			//$http
			//	.get(String.format("http://urls.api.twitter.com/1/urls/count.json?callback=?&url={0}", url))
			//	.success(function (response)
			//	{
			//		if (response.data.length > 0)
			//		{
			//			$scope.SocialMedia.Facebook.Count = response.data[0].count;
			//		}
			//	});

			//$.ajax(
			//{
			//	url: String.format("http://urls.api.twitter.com/1/urls/count.json?callback=?&url={0}", url),
			//	dataType: "jsonp",
			//	success: function (response)
			//	{
			//		if (response)
			//		{
			//			$scope.SocialMedia.Twitter.Count = response.count;
			//		}
			//	}
			//});
		}
	]);