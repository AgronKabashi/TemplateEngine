(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.Basic.Video", function () {
      this.mp4SourceUrl = "";
      this.oggSourceUrl = "";
      this.autoPlay = false;
      this.showControls = false;
      this.loopInfinitely = false;
      this.posterUrl = "";
    });
})(window.angular);