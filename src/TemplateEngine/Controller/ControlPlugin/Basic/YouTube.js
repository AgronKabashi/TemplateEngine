namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Basic")
	.YouTube = function ()
	{
		this.VideoId = "";
		this.StartTime = "";
		this.AutoPlay = false;
		this.ShowControls = true;
		this.DisableKeyboard = false;
		this.LoopInfinitely = false;
		this.HideYouTubeBrand = false;
		this.ShowVideoInfo = true;
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Basic.YouTube",
	[
		"$scope",
		"$sce",
		function ($scope, $sce)
		{
			function GenerateYouTubeUrl()
			{
				var url = "";
				var youTubeBaseUrl = "http://www.youtube.com/embed/{0}?wmode=transparent&start={1}&autoplay={2}&controls={3}&disablekb={4}&loop={5}&modestbranding={6}&showinfo={7}";

				$scope.IsValidLink = $scope.ControlData.VideoId && $scope.ControlData.VideoId.length > 0;
				if ($scope.IsValidLink)
				{
					url = String.format(youTubeBaseUrl,
						$scope.ControlData.VideoId,
						~~$scope.ControlData.StartTime,
						~~$scope.ControlData.AutoPlay,
						~~$scope.ControlData.ShowControls,
						~~$scope.ControlData.DisableKeyboard,
						~~$scope.ControlData.LoopInfinitely,
						~~$scope.ControlData.HideYouTubeBrand,
						~~$scope.ControlData.ShowVideoInfo);
				}

				return $sce.trustAsResourceUrl(url);
			}
			
			var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Basic.YouTube();
			
			//Ensures that whenever content is updated, so is the view
			$scope.$watch("TemplateControl.Content", function ()
			{
				$scope.ControlData = JSON.tryParse($scope.TemplateControl.Content, defaultContent);
				$scope.SafeVideoUrl = GenerateYouTubeUrl();
			});
		}
	]);