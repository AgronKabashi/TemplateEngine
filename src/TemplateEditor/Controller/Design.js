(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .controller("Cerberus.TemplateEditor.Controller.Design", [
			"$scope",
      "TemplateEditorPath",
			"Cerberus.TemplateEditor.Localization",
			"Cerberus.TemplateEngine.Service.Template",
      "Cerberus.TemplateEngine.Service.Event",
			"Cerberus.TemplateEngine.Service.DataBag",
			function ($scope, TemplateEditorPath, Localization, TemplateService, EventService, DataBagService) {
			  var componentIdCounter = 0;

			  function GenerateComponentId() {
			    return --componentIdCounter;
			  }

			  this.InitializeScope = function () {
          DataBagService.AddData("TemplateMode", Cerberus.TemplateEngine.TemplateMode.EditDesign);

			    $scope.Localization = Localization;
			    $scope.ApplicationBasePath = TemplateEditorPath;

			    $scope.AddComponent = function (componentInfo) {
			      var component = angular.extend(new Cerberus.TemplateEngine.Model.Component(), componentInfo);
			      component.Id = component.CreationGUID = GenerateComponentId();

			      DataBagService.GetData("Template").Components.push(component);
			      EventService.Notify("ComponentAdded", component);
			    };

			    $scope.$on("$destroy", function () {
			      EventService.Clear();
			    });

			    $scope.Save = function () {
			      return TemplateService.SaveTemplate(DataBagService.GetData("Template"))
              .then(function (template) {
                DataBagService.AddData("Template", template);
                EventService.Notify("InitializeTemplate", template);
              });
			    };

			    $scope.Exit = function () {
			      var exitUrl = "/";
			      window.location.href = exitUrl;
			    };

			    $scope.SaveExit = function () {
			      this.Save()
              .then(function () {
                $scope.Exit()
              });
			    };

			  };

        this.InitializeEvents = function () {
          EventService.Subscribe("AddComponent", $scope.AddComponent.bind(this));
        };

        this.InitializeScope();
        this.InitializeEvents();
			}
    ]);
})(window.angular);