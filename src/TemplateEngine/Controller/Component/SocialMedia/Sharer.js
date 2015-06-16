(function (angular) {
  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.SocialMedia.Sharer", [
      "$scope",
      "$http",
      function ($scope, $http) {
        var defaultContent = new Cerberus.TemplateEngine.Model.Component.SocialMedia.Sharer();
        var url = document.location.href;

        $scope.Content = $scope.Component.Content;

        $scope.SocialMedia = {
          Facebook: String.format("http://www.facebook.com/sharer/sharer.php?u={0}", url),
          Twitter: String.format("http://twitter.com/intent/tweet?url={0}", url),
          GooglePlus: String.format("https://plus.google.com/share?url={0}", url)
        };
      }
    ]);
})(angular);