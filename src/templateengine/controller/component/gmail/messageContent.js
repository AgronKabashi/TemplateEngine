(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Gmail.MessageContent", [
      "$scope",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.Gmail",
      MessageContentController
    ]);

  function MessageContentController($scope, EventService, GmailService) {
    EventService.subscribe("Gmail.ViewMessage", onViewMessage);

    $scope.$on("$destroy", function () {
      EventService.unsubscribe("Gmail.ViewMessage", onViewMessage);
    });

    function onViewMessage(messageId) {
      if (messageId === undefined) {
        $scope.message = undefined;
        return;
      }

      GmailService.getMessage(messageId).then(function (message) {
        $scope.message = message;
      });
    }
  }
})(window.angular);