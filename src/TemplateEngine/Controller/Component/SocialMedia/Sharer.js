(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.SocialMedia.Sharer", [
      "$scope",
      function ($scope) {
        var url = window.location.href;

        $scope.Content = $scope.Component.Content;

        $scope.SocialMedia = {
          Facebook: String.format("http://www.facebook.com/sharer/sharer.php?u={0}", url),
          Twitter: String.format("http://twitter.com/intent/tweet?url={0}", url),
          GooglePlus: String.format("https://plus.google.com/share?url={0}", url)
        };
      }
    ]);
})(window.angular);