(function (angular, _) {
  "use strict";

  var componentIdCounter = 0;

  function generateComponentId() {
    return --componentIdCounter;
  }

  angular
    .module("Cerberus.TemplateEditor")
    .controller("Cerberus.TemplateEditor.Controller.Design", [
      "$scope",
      "templateEditorPath",
      "Cerberus.TemplateEditor.Localization",
      "Cerberus.TemplateEngine.Service.Template",
      "Cerberus.TemplateEngine.Service.Event",
      "Cerberus.TemplateEngine.Service.DataBag",
      "Cerberus.TemplateEngine.TemplateMode",
      "Cerberus.ModelFactory",
      EditDesignController
    ]);

  function EditDesignController($scope, templateEditorPath, Localization, TemplateService, EventService, DataBagService, TemplateModes, ModelFactory) {
    DataBagService.addData("TemplateMode", TemplateModes.editDesign);

    _.assign($scope, {
      localization: Localization,
      applicationBasePath: templateEditorPath,

      addComponent: function (componentInfo) {
        var component = angular.extend(ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Component"), componentInfo);
        component.id = component.creationGUID = generateComponentId();

        DataBagService.getData("Template").components.push(component);
        EventService.notify("ComponentAdded", component);
      },

      exit: function () {
        EventService.notify("ExitTemplateEditor");
      },

      save: function () {
        return TemplateService.saveTemplate(DataBagService.getData("Template"))
          .then(function (template) {
            DataBagService.addData("Template", template);
            EventService.notify("InitializeTemplate", template);
          });
      },

      saveExit: function () {
        this.save()
          .then(function () {
            $scope.exit();
          });
      }
    });

    $scope.$on("$destroy", EventService.clear.bind(EventService));

    EventService.subscribe("AddComponent", $scope.addComponent);
  }
})(window.angular, window._);