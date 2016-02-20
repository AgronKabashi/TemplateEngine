(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Gmail.MessageList", [
      "$scope",
      "Cerberus.TemplateEngine.Constant.Gmail.Labels",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.Gmail",
      MessageListController
    ]);

  function MessageListController($scope, labels, EventService, GmailService) {
    refreshMessages(labels.INBOX);

    EventService.subscribe("Gmail.ViewLabel", onViewLabel);
    EventService.subscribe("Gmail.Reauthorized", refreshMessages);

    $scope.onClickMessage = function (message) {
      EventService.notify("Gmail.ViewMessage", message && message.id);
    };

    $scope.$on("$destroy", function () {
      EventService.unsubscribe("Gmail.Reauthorized", refreshMessages);
      EventService.unsubscribe("Gmail.ViewLabel", onViewLabel);
    });

    function refreshMessages(labelId) {
      $scope.isLoading = true;
      GmailService.getMessages(labelId)
        .then(function (messages) {
          $scope.isLoading = false;
          $scope.messages = messages;
          messages && $scope.onClickMessage(messages[0]);
        })
        .catch(function () {
          $scope.isLoading = false;
        });
    }

    function onViewLabel(label) {
      refreshMessages(label.id);
    }
  }
})(window.angular);