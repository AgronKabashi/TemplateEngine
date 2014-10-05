namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.SocialMedia")
	.RSS = function ()
	{
		this.RSSFeedUrl = "";
		this.ShowTitle = true;
		this.ShowDescription = true;
		this.ShowStoryDescription = true;
		this.ShowStoryDate = true;
		this.MaxStories = 5;
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.SocialMedia.RSS",
	[
		"$scope",
		"$http",
		function ($scope, $http)
		{
			//testfeed: http://feeds.idg.se/CsAffrssystem
			var googleXMLToJSONPUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q={0}";
			var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.SocialMedia.RSS();

			function FetchRSS()
			{
				$http
					.jsonp(String.format(googleXMLToJSONPUrl, encodeURIComponent($scope.ControlData.RSSFeedUrl)))
					.then(function (result)
					{
						if (result.data.responseData == null)
						{
							return;
						}

						$scope.RSSFeed = result.data.responseData.feed;
						$scope.Stories = $scope.RSSFeed.entries;
					});
			}

			//Ensures that whenever content is updated, so is the view
			$scope.$watch("TemplateControl.Content", function ()
			{
				var oldControlData = $scope.ControlData || defaultContent;
				$scope.ControlData = JSON.tryParse($scope.TemplateControl.Content, defaultContent);

				if ($scope.ControlData.RSSFeedUrl === "")
				{
					//Clear the stories if no Url is specified
					$scope.RSSFeed = null;
					$scope.Stories = [];
				}
				else if (oldControlData.RSSFeedUrl !== $scope.ControlData.RSSFeedUrl && $scope.ControlData.RSSFeedUrl.length)
				{
					$scope.RSSFeed = null;
					$scope.Stories = [];
					FetchRSS();
				}
			});
		}
	]);