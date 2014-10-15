namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Basic")
	.Video = function ()
	{
		this.Mp4SourceUrl = "";
		this.OggSourceUrl = "";
		this.AutoPlay = false;
		this.ShowControls = false;
		this.LoopInfinitely = false;
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Basic.Video",
  [
		"$scope",
		function ($scope)
		{
		}
  ])
  .directive("csVideo",
	[
		"$sce",
		function ($sce)
		{
			return {
				restrict: "A",
				link: function (scope, element, attributes)
				{
					var video = element.get(0);

					var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Basic.Video();
					scope.$parent.$watch("TemplateControl.Content", function ()
					{
						var controlData = JSON.tryParse(scope.$parent.TemplateControl.Content, defaultContent);

						video.autoplay = controlData.AutoPlay;
						video.loop = controlData.LoopInfinitely;
						video.controls = controlData.ShowControls;
						video.preload = controlData.AutoPlay ? "auto" : "none";

						element.empty();
						if (controlData.Mp4SourceUrl)
						{
							element.append(String.format("<source type='video/mp4' src='{0}' />", controlData.Mp4SourceUrl));
						}

						if (controlData.OggSourceUrl)
						{
							element.append(String.format("<source type='video/ogg' src='{0}' />", controlData.OggSourceUrl));
						}

						if (controlData.AutoPlay)
						{
							video.play();
						}
						else
						{
							video.pause();
							if (video.currentTime > 0)
							{
								video.currentTime = 0;
							}
						}
					});
				}
			};
		}
	]);