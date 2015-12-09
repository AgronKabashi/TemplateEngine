"use strict";

describe("csTemplate", function () {
  var compile;
  var rootScope;
  var templateEnginePath;
  var DataBagService;
  var EventService;
  var ModelFactory;

  function compileDirective(scope) {
    var compiledElement = compile(angular.element("<cs-template template-mode='editDesign'></cs-template>"))(scope);
    scope.$digest();

    return compiledElement;
  }

  beforeEach(module("Cerberus.TemplateEngine"));

  beforeEach(inject(function ($injector, $rootScope, $compile) {
    compile = $compile;
    rootScope = $rootScope;
    ModelFactory = $injector.get("Cerberus.ModelFactory");
    EventService = $injector.get("Cerberus.TemplateEngine.Service.Event");
    DataBagService = $injector.get("Cerberus.TemplateEngine.Service.DataBag");
    templateEnginePath = $injector.get("templateEnginePath");
  }));

  // The beforeEachs above will not run unless there's atleast one spec defined
  it("noop", angular.noop);

  describe("controller", function () {
    var template;
    var compiledDirective;
    var scope;

    beforeEach(function () {
      template = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Template");
      DataBagService.addData("Template", template);
      compiledDirective = compileDirective(rootScope.$new());
      scope = compiledDirective.scope().$$childHead;
    });

    it("should update template reference when notified about InitializeTemplate", function () {
      var newTemplate = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Template");
      newTemplate.name = "test";
      EventService.notify("InitializeTemplate", newTemplate);
      expect(scope.template.name).toBe(newTemplate.name);
    });

    describe("getComponentPath", function () {
      it("should be defined", function () {
        expect(scope.getComponentPath).toBeDefined();
      });

      it("should fetch the correct component view", function () {
        expect(scope.getComponentPath({
          name: "text",
          category: "basic"
        })).toBe(templateEnginePath + "view/component/basic/text.html");
      });
    });

    describe("rendering", function () {
      beforeEach(function () {
        var component;
        for (var i = 0; i < 5; i++) {
          component = _.assign(ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Component"), {
            id: i,
            name: "text",
            componentType: "Cerberus.TemplateEngine.Controller.Component.Basic.Text"
          });

          template.components.push(component);
        }

        DataBagService.addData("Template", template);
        compiledDirective = compileDirective(rootScope.$new());
        scope = compiledDirective.scope().$$childHead;
      });

      it("should render a <cs-component>", function () {
        expect(compiledDirective.find("cs-component").length).toBe(5);
      });
    });
  });
});