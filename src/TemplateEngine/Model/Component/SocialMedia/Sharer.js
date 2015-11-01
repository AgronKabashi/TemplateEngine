(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.SocialMedia.Sharer", function () {
      this.Facebook = true;
      this.Twitter = true;
      this.GooglePlus = true;
    });
})(window.angular);