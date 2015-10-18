(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Basic.Video", [angular.noop])
    .directive("csVideo", [
      function () {
        return {
          restrict: "A",
          link: function (/*scope, element*/) {
            //var video = element.get(0);
            //scope.$parent.$watch("Component.Content", function () {
            //  var controlData = JSON.tryParse(scope.$parent.Component.Content, defaultContent);
            //
            //  video.autoplay = controlData.AutoPlay;
            //  video.loop = controlData.LoopInfinitely;
            //  video.controls = controlData.ShowControls;
            //  video.preload = controlData.AutoPlay ? "auto" : "none";
            //
            //  element.empty();
            //  if (controlData.Mp4SourceUrl) {
            //    element.append(String.format("<source type='video/mp4' src='{0}' />", controlData.Mp4SourceUrl));
            //  }
            //
            //  if (controlData.OggSourceUrl) {
            //    element.append(String.format("<source type='video/ogg' src='{0}' />", controlData.OggSourceUrl));
            //  }
            //
            //  if (controlData.AutoPlay) {
            //    video.play();
            //  }
            //  else {
            //    video.pause();
            //    if (video.currentTime > 0) {
            //      video.currentTime = 0;
            //    }
            //  }
            //});
          }
        };
      }
    ]);
})(window.angular);