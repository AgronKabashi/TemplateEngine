(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEngine.Model.Component.SocialMedia.RSS", function () {
      this.RSSFeedUrl = "";
      this.ShowTitle = true;
      this.ShowDescription = true;
      this.ShowStoryDescription = true;
      this.ShowStoryDate = true;
      this.MaxStories = 5;
    });
})(window.angular);