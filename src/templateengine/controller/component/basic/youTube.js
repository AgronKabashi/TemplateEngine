(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Basic.YouTube", [
      "$scope",
      function ($scope) {
        var youTubeBaseUrl = "http://www.youtube.com/embed/{0}?wmode=transparent&start={1}&autoplay={2}&controls={3}&disablekb={4}&loop={5}&modestbranding={6}&showinfo={7}";

        var watch = $scope.$watch("component.content", function () {
          var content = $scope.component.content;
          if (!content.videoId) {
            $scope.videoUrl = "about:blank";
            return;
          }

          $scope.videoUrl = String.format(youTubeBaseUrl,
            content.videoId,
            ~~content.startTime,
            ~~content.autoPlay,
            ~~content.showControls,
            ~~content.disableKeyboard,
            ~~content.loopInfinitely,
            ~~content.hideYouTubeBrand,
            ~~content.showVideoInfo);
        }, true);

        // Cleanup
        $scope.$on("$destroy", watch);
      }
    ]);
})(window.angular);