"use strict";

describe("Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider", function () {
  var localStorageProvider;
  var ModelFactory;
  var injector;
  var $rootScope;
  var initialTemplate;

  beforeEach(module("Cerberus.TemplateEngine"));

  beforeEach(inject(function ($injector) {
    injector = $injector;
    $rootScope = $injector.get("$rootScope");
    ModelFactory = $injector.get("Cerberus.ModelFactory")

    localStorage.clear();
    initialTemplate = _.assign(ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Template"), {
      id: 1,
      name: "Template Name"
    });

    localStorage.setItem("TemplateRepository", JSON.stringify({
      templates: {
        1: initialTemplate
      }
    }));

    localStorageProvider = injector.instantiate(ModelFactory.getModelType("Cerberus.TemplateEngine.Service.TemplateLocalStorageProvider"));
  }));

  it("should deserialize the localstorage into a template repository when initialized", function () {
    var templateRepository = JSON.parse(localStorage.getItem("TemplateRepository"));
    expect(templateRepository.templates[1]).toBeDefined();
  });

  describe("getTemplate()", function () {
    it("should return undefined if the template does not exist", function () {
      var template;
      localStorageProvider.getTemplate(0).then(function (t) {
        template = t;
      });

      $rootScope.$apply();
      expect(template).toBeUndefined();
    });

    it("should fetch a template by id from localStorage", function () {
      var template;
      localStorageProvider.getTemplate(initialTemplate.id).then(function (t) {
        template = t;
      });

      $rootScope.$apply();
      expect(template).toBeDefined();
      expect(template.id).toBe(initialTemplate.id);
      expect(template.name).toBe(initialTemplate.name);
    });
  });

  describe("saveTemplate()", function () {
    var saveTemplate;
    var templateRepository;
    beforeAll(function () {
      saveTemplate = _.assign(ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Template"), {
        id: 100,
        name: "Saved Template",
        components: [{
          id: -1,
          name: "Component 1",
          visualProperties: "left: 1px"
        },
        {
          id: -2,
          name: "Component 2",
          visualProperties: "left: 2px"
        }],
        resolutions: [{
          id: 0,
          resolutionValue: 10000,
          componentVisualProperties: {
            "-1": "left: 1px",
            "-2": "left: 2px"
          }
        }]
      });

      localStorageProvider.saveTemplate(saveTemplate);
      $rootScope.$apply();
      templateRepository = JSON.parse(localStorage.getItem("TemplateRepository"));
    });

    it("should save a template to localStorage", function () {
      expect(templateRepository.templates[saveTemplate.id]).toBeDefined();
    });

    it("should generate component ids for new components", function () {
      expect(templateRepository.templates[saveTemplate.id].components[0].id).toBe(1);
      expect(templateRepository.templates[saveTemplate.id].components[1].id).toBe(2);
    });

    it("should remap component ids for new components", function () {
      expect(templateRepository.templates[saveTemplate.id].resolutions[0].componentVisualProperties[1]).toBeDefined();
      expect(templateRepository.templates[saveTemplate.id].resolutions[0].componentVisualProperties[2]).toBeDefined();
    });

    it("should increment resolution ids for new resolutions", function () {
      expect(templateRepository.templates[saveTemplate.id].resolutions[0].id).toBe(1);
    });
  });

  describe("removeTemplate()", function () {
    it("should remove a template by id from localstorage", function () {
      localStorageProvider.removeTemplate(1);

      var templateRepository = JSON.parse(localStorage.getItem("TemplateRepository"));
      expect(templateRepository.templates[1]).toBeUndefined();
    });
  });
});