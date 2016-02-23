(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .controller("Cerberus.TemplateEngine.Controller.Component.Gmail.LabelList", [
      "$scope",
      "Cerberus.TemplateEngine.Constant.Gmail.Labels",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.Gmail",
      LabelListController
    ]);

  function LabelListController($scope, labels, EventService, GmailService) {
    refreshLabels();

    $scope.selectedLabel = {
      name: "Inbox",
      id: labels.INBOX
    };

    $scope.onClickLabel = function (label) {
      $scope.selectedLabel = label;
      EventService.notify("Gmail.ViewLabel", label);
    };

    EventService.subscribe("Gmail.Reauthorized", refreshLabels);

    $scope.$on("$destroy", function () {
      EventService.unsubscribe("Gmail.Reauthorized", refreshLabels);
    });

    function refreshLabels() {
      GmailService.getUserLabels().then(function (userLabels) {
        $scope.labels = GmailService.getSystemLabels().concat(userLabels);
      });
    }
  }
})(window.angular);