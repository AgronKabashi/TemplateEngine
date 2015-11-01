(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.Basic.YouTube", function () {
      this.VideoId = "";
      this.StartTime = "";
      this.AutoPlay = false;
      this.ShowControls = true;
      this.DisableKeyboard = false;
      this.LoopInfinitely = false;
      this.HideYouTubeBrand = false;
      this.ShowVideoInfo = true;
    });
})(window.angular);