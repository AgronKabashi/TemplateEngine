(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.SocialMedia.Rss", [
      "$scope",
      "$http",
      function ($scope, $http) {
        //testfeed: http://feeds.idg.se/CsAffrssystem
        var googleXMLToJSONPUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q={0}";

        function fetchRSS(url) {
          if (!url) {
            $scope.rssFeed = $scope.stories = undefined;
            return;
          }

          $http
            .jsonp(String.format(googleXMLToJSONPUrl, encodeURIComponent(url)))
            .then(function (result) {
              $scope.rssFeed = $scope.stories = undefined;

              if (!result.data.responseData) {
                return;
              }

              $scope.rssFeed = result.data.responseData.feed;
              $scope.stories = $scope.rssFeed.entries;
            });
        }

        var watch = $scope.$watch("component.content", function () {
          fetchRSS($scope.component.content.rssFeedUrl);
        }, true);

        // Cleanup
        $scope.$on("$destroy", watch);
      }
    ]);
})(window.angular);