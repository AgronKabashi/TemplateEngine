(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.SocialMedia.Sharer", function () {
      this.facebook = true;
      this.twitter = true;
      this.googlePlus = true;
    });
})(window.angular);