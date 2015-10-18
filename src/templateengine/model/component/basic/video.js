(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.Basic.Video", function () {
      this.Mp4SourceUrl = "";
      this.OggSourceUrl = "";
      this.AutoPlay = false;
      this.ShowControls = false;
      this.LoopInfinitely = false;
    });
})(window.angular);