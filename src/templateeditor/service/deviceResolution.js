(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.DeviceResolution", function () {
      var availableResolutions = [
        {
          name: "640px - Apple iPhone 4&5",
          value: 640
        },
        {
          name: "768px - Apple iPad 1&2",
          value: 768
        }];

      this.getResolutions = function () {
        return _.clone(availableResolutions); //clone to prevent outside manipulation
      };
    });
})(window.angular, window._);