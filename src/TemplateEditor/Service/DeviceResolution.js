(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .service("Cerberus.TemplateEditor.Service.DeviceResolution", function () {
      var availableResolutions = [{
        Name: "640px - Apple iPhone 4&5",
        Value: 640
      },
			{
			  Name: "768px - Apple iPad 1&2",
			  Value: 768
			}];

      this.GetResolutions = function () {
        return _.clone(availableResolutions); //clone to prevent outside manipulation
      };
    });
})(window.angular, window._);