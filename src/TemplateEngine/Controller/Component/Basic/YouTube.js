(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Basic.YouTube", [
      "$scope",
      "$sce",
      function ($scope, $sce) {
        var youTubeBaseUrl = "http://www.youtube.com/embed/{0}?wmode=transparent&start={1}&autoplay={2}&controls={3}&disablekb={4}&loop={5}&modestbranding={6}&showinfo={7}";

        var defaultContent = new Cerberus.TemplateEngine.Model.Component.Basic.YouTube();

        //Ensures that whenever content is updated, so is the view
        //$scope.$watch("Component.Content", function () {
        //  $scope.ControlData = JSON.tryParse($scope.Component.Content, defaultContent);
        //  $scope.SafeVideoUrl = GenerateYouTubeUrl();
        //});
      }
    ]);
})(angular);