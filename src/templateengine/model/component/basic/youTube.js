(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.Basic.YouTube", function () {
      this.videoId = "";
      this.startTime = "";
      this.autoPlay = false;
      this.showControls = true;
      this.disableKeyboard = false;
      this.loopInfinitely = false;
      this.hideYouTubeBrand = false;
      this.showVideoInfo = true;
      this.videoIdQueryParameter = "";
    });
})(window.angular);