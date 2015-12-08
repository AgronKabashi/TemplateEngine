"use strict";

describe("csTemplate", function () {
  var compile;
  var rootScope;
  var DataBagService;
  var ModelFactory;

  function compileDirective(scope) {
    var compiledElement = compile(angular.element("<cs-template></cs-template>"))(scope);
    scope.$digest();

    return compiledElement;
  }

  //beforeEach(module("templateengine/view/component/basic/text.html"));
  beforeEach(module("Cerberus.TemplateEngine"));

  beforeEach(inject(function($injector, $rootScope, $compile, $templateCache) {
    compile = $compile;
    rootScope = $rootScope;
    ModelFactory = $injector.get("Cerberus.ModelFactory");
    DataBagService = $injector.get("Cerberus.TemplateEngine.Service.DataBag");
    $templateCache.put('base/dest/templateengine/view/component/basic/text.html', '<div>test</div>');
  }));

  it("should render a <cs-component>", function () {
    var template = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Template");
    var component = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Component");
    component.name = "text";
    template.components.push(component);
    DataBagService.addData("Template", template);

    var scope = rootScope.$new();
    var directive = compileDirective(scope);

    //expect(directive.find("cs-component").length).toBe(1);
    expect(scope.templates).toBeDefined();
  });
});