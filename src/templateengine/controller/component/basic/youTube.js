(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Basic.YouTube", [
      "$scope",
      "$sce",
      function ($scope, $sce) {
        var youTubeBaseUrl = "http://www.youtube.com/embed/{0}?wmode=transparent&start={1}&autoplay={2}&controls={3}&disablekb={4}&loop={5}&modestbranding={6}&showinfo={7}";

        var watch = $scope.$watch("component", function () {
          var content = $scope.component.content;
          if (!content.videoId) {
            $scope.safeVideoUrl = $sce.trustAsResourceUrl("");
            return;
          }

          $scope.safeVideoUrl = $sce.trustAsResourceUrl(String.format(youTubeBaseUrl,
            content.videoId,
            ~~content.startTime,
            ~~content.autoPlay,
            ~~content.showControls,
            ~~content.disableKeyboard,
            ~~content.loopInfinitely,
            ~~content.hideYouTubeBrand,
            ~~content.showVideoInfo));
        }, true);

        // Cleanup
        $scope.$on("$destroy", watch);
      }
    ]);
})(window.angular, window._);