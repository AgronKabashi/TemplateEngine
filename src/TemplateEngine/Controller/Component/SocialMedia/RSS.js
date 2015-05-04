(function (angular) {
  "use strict";

  angular
  .module("Cerberus.TemplateEngine")
  .controller("Cerberus.TemplateEngine.Controller.Component.SocialMedia.RSS", [
		"$scope",
		"$http",
		function ($scope, $http) {
		  //testfeed: http://feeds.idg.se/CsAffrssystem
		  var googleXMLToJSONPUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q={0}";
		  var defaultContent = new Cerberus.TemplateEngine.Model.Component.SocialMedia.RSS();

		  function FetchRSS() {
		    $http
					.jsonp(String.format(googleXMLToJSONPUrl, encodeURIComponent($scope.Content.RSSFeedUrl)))
					.then(function (result) {
					  if (result.data.responseData == null) {
					    return;
					  }

					  $scope.RSSFeed = result.data.responseData.feed;
					  $scope.Stories = $scope.RSSFeed.entries;
					});
		  }

		  $scope.Content = $scope.Component.Content;

		  //Ensures that whenever content is updated, so is the view
		  //$scope.$watch("Component.Content", function () {
		  //  var oldControlData = $scope.ControlData || defaultContent;
		  //  $scope.ControlData = JSON.tryParse($scope.Component.Content, defaultContent);
		  //
		  //  if ($scope.ControlData.RSSFeedUrl === "") {
		  //    //Clear the stories if no Url is specified
		  //    $scope.RSSFeed = null;
		  //    $scope.Stories = [];
		  //  }
		  //  else if (oldControlData.RSSFeedUrl !== $scope.ControlData.RSSFeedUrl && $scope.ControlData.RSSFeedUrl.length) {
		  //    $scope.RSSFeed = null;
		  //    $scope.Stories = [];
		  //    FetchRSS();
		  //  }
		  //});
		}
  ]);
})(angular);