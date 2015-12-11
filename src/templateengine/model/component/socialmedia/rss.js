(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.SocialMedia.RSS", function () {
      this.rssFeedUrl = "";
      this.showTitle = true;
      this.showDescription = true;
      this.showStoryDescription = true;
      this.showStoryDate = true;
      this.maxStories = 5;
    });
})(window.angular);