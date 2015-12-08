"use strict";

describe("Cerberus.TemplateEditor.Service.TemplateResolution", function () {
  var templateResolutionService;
  var template;
  var maxResolutionDifference;
  var maxResolutionCount;
  var ModelFactory;

  beforeEach(module("Cerberus.TemplateEditor"));
  beforeEach(inject(function ($injector) {
    templateResolutionService = $injector.get("Cerberus.TemplateEditor.Service.TemplateResolution");
    maxResolutionDifference = $injector.get("maxResolutionDifference");
    maxResolutionCount = $injector.get("maxResolutionCount");
    ModelFactory = $injector.get("Cerberus.ModelFactory");
  }));

  beforeEach(function () {
    template = angular.module("Cerberus.ModelFactory").instantiateModel("Cerberus.TemplateEngine.Model.Template");
  })

  describe("addResolution()", function () {
    it("should increase total resolutions by one", function () {
      templateResolutionService.addResolution(template, 640);
      expect(template.resolutions.length).toBe(1);
    });

    it("should not add a resolution if it is outside the acceptable range", function () {
      templateResolutionService.addResolution(template, 100);
      templateResolutionService.addResolution(template, 200);

      templateResolutionService.addResolution(template, 100 + maxResolutionDifference);
      expect(template.resolutions.length).toBe(2);

      templateResolutionService.addResolution(template, 200 - maxResolutionDifference);
      expect(template.resolutions.length).toBe(2);
    });

    it("should not allow total resolutions to exceed the maximum limit", function () {
      for (var i = 0; i < maxResolutionCount; i++) {
        templateResolutionService.addResolution(template, i * (maxResolutionDifference + 1));
      }

      templateResolutionService.addResolution(template, maxResolutionCount * (maxResolutionDifference + 1));
      expect(template.resolutions.length).toBe(maxResolutionCount);
    });

    it("should keep resolutions sorted", function () {
      templateResolutionService.addResolution(template, 200);
      templateResolutionService.addResolution(template, 100);
      expect(template.resolutions[0].resolutionValue).toBe(100);
      expect(template.resolutions[1].resolutionValue).toBe(200);
    });
  });

  describe("removeResolution()", function () {
    it("should remove a resolution", function () {
      var resolution = templateResolutionService.addResolution(template, 640);

      templateResolutionService.removeResolution(template, resolution);
      expect(template.resolutions.length).toBe(0);
    });
  });

  describe("findResolutionIndex()", function () {
    it("should return a resolution index encompasses the specified resolutionValue", function () {
      templateResolutionService.addResolution(template, 640);
      templateResolutionService.addResolution(template, 768);

      expect(templateResolutionService.findResolutionIndex(template, 700)).toBe(1);
    });

    it("should return -1 if no resolution is found", function () {
      templateResolutionService.addResolution(template, 640);
      expect(templateResolutionService.findResolutionIndex(template, 768)).toBe(-1);
    });
  });

  describe("findResolution()", function () {
    it("should return a resolution that encompasses the specified resolutionValue", function () {
      templateResolutionService.addResolution(template, 640);
      templateResolutionService.addResolution(template, 768);

      var resolution = templateResolutionService.findResolution(template, 640);
      expect(resolution).toBeDefined();
      expect(resolution.resolutionValue).toBe(640);

      resolution = templateResolutionService.findResolution(template, 650);
      expect(resolution).toBeDefined();
      expect(resolution.resolutionValue).toBe(768);
    });
  });

  describe("distributeResolutions", function () {
    var resolution1, resolution2, resolution3;
    var component1, component2;

    beforeEach(function () {
      resolution1 = templateResolutionService.addResolution(template, 640);
      resolution2 = templateResolutionService.addResolution(template, 768);
      resolution3 = templateResolutionService.addResolution(template, 1024);

      component1 = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Component");
      component2 = ModelFactory.instantiateModel("Cerberus.TemplateEngine.Model.Component");

      component1.id = 1;
      component1.visualProperties = "color: red;";
      component2.id = 2;
      component2.visualProperties = "color: blue;";
    });

    describe("distributeResolutionPropertiesToAllResolutions()", function () {
      it("should copy the visual styles for the selected components to all resolutions", function () {
        templateResolutionService.distributeResolutionPropertiesToAllResolutions(template, resolution2, [component1, component2]);

        expect(Object.getOwnPropertyNames(resolution1.componentVisualProperties).length).toBe(2);
        expect(resolution1.componentVisualProperties).toEqual({
          1: component1.visualProperties,
          2: component2.visualProperties
        });

        expect(Object.getOwnPropertyNames(resolution3.componentVisualProperties).length).toBe(2);
        expect(resolution3.componentVisualProperties).toEqual({
          1: component1.visualProperties,
          2: component2.visualProperties
        });
      });
    });

    describe("distributeResolutionPropertiesToLowerResolutions()", function () {
      it("should copy the visual styles for the selected components to lower resolutions", function () {
        templateResolutionService.distributeResolutionPropertiesToLowerResolutions(template, resolution2, [component1, component2]);

        expect(Object.getOwnPropertyNames(resolution1.componentVisualProperties).length).toBe(2);
        expect(resolution1.componentVisualProperties).toEqual({
          1: component1.visualProperties,
          2: component2.visualProperties
        });

        //expect(Object.getOwnPropertyNames(resolution3.componentVisualProperties).length).toBe(0);
      });
    });

    describe("distributeResolutionPropertiesToHigherResolutions()", function () {
      it("should copy the visual styles for the selected components to higher resolutions", function () {
        templateResolutionService.distributeResolutionPropertiesToHigherResolutions(template, resolution2, [component1, component2]);

        expect(Object.getOwnPropertyNames(resolution1.componentVisualProperties).length).toBe(0);

        expect(Object.getOwnPropertyNames(resolution3.componentVisualProperties).length).toBe(2);
        expect(resolution3.componentVisualProperties).toEqual({
          1: component1.visualProperties,
          2: component2.visualProperties
        });
      });
    });
  });
});