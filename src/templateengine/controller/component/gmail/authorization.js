(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Gmail.Authorization", [
      "$scope",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.Gmail",
      AuthorizationController
    ]);

  function AuthorizationController($scope, EventService, GmailService) {
    var hasBeenLoggedInOnce = false;
    refresh();

    EventService.subscribe(["Gmail.Reauthorized", "Gmail.RequestFailed"], refresh);

    $scope.authorize = function () {
      GmailService.authorizeUser();
    };

    $scope.$on("$destroy", function () {
      EventService.unsubscribe("Gmail.Reauthorized", refresh);
      EventService.unsubscribe("Gmail.RequestFailed", refresh);
    });

    function refresh() {
      GmailService.whenIsAuthorized()
        .then(function () {
          hasBeenLoggedInOnce = true;
          $scope.authorizationFailed = false;
        })
        .catch(function (error) {
          $scope.authorizationFailed = true;
          setErrorMessage(error);
        });
    }

    function setErrorMessage(error) {
      var status = error.status;
      $scope.isAuthorizationError = false;

      if (status <= 0) {
        $scope.message = "There seems to be a problem with your internet connection.";
      }
      else if (status >= 400 && status < 500) {
        $scope.isAuthorizationError = true;
        $scope.message = hasBeenLoggedInOnce ? "You seem to have been logged out due to inactivity." : "You need to be signed in to use Gmail features.";
      }
    }
  }
})(window.angular);