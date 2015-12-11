(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Basic.Video", [angular.noop])
    .directive("csVideo", [
      function () {
        return {
          restrict: "A",
          link: function (scope, element) {
            var video = element.get(0);
            var sources = video.getElementsByTagName("source");
            var mp4Source = sources[0];
            var oggSource = sources[1];

            var watch = scope.$watch("component.content", function () {
              var content = scope.component.content;
              var sourceChanged = false;
              var mp4SourceUrl = mp4Source.getAttribute("src") || undefined;
              var oggSourceUrl = oggSource.getAttribute("src") || undefined;

              video.preload = content.autoPlay ? "auto" : "metadata";
              video.loop = content.loopInfinitely;
              video.controls = content.showControls;
              video.autoplay = content.autoPlay;

              if (mp4SourceUrl !== content.mp4SourceUrl) {
                if (content.mp4SourceUrl) {
                  mp4Source.setAttribute("src", content.mp4SourceUrl);
                }
                else {
                  mp4Source.removeAttribute("src");
                }

                sourceChanged = true;
              }

              if (oggSourceUrl !== content.oggSourceUrl) {
                if (content.oggSourceUrl) {
                  oggSource.setAttribute("src", content.oggSourceUrl);
                }
                else {
                  oggSource.removeAttribute("src");
                }

                sourceChanged = true;
              }

              if (sourceChanged) {
                video.load();
              }
            }, true);

            // Cleanup
            scope.$on("$destroy", watch);
          }
        };
      }
    ]);
})(window.angular);