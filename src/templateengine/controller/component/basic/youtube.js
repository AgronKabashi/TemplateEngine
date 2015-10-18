(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Basic.YouTube", [
      "$scope",
      function ($scope) {
        //var youTubeBaseUrl = "http://www.youtube.com/embed/{0}?wmode=transparent&start={1}&autoplay={2}&controls={3}&disablekb={4}&loop={5}&modestbranding={6}&showinfo={7}";
        $scope.Content = $scope.Component.Content;
      }
    ]);
})(window.angular);