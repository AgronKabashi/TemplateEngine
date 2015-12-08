"use strict";

describe("Cerberus.TemplateEditor.Service.Template", function () {
  var templateService;

  beforeEach(module("Cerberus.TemplateEditor"));
  beforeEach(inject(function ($injector) {
    templateService = $injector.get("Cerberus.TemplateEditor.Service.Template");
  }));

  describe("removeComponentsFromTemplate()", function () {
    it("should remove specified components from the template", function () {
      var template = {
        components: [
          { id: 1 },
          { id: 2 },
          { id: 3 }
        ],
        resolutions: [{
          componentVisualProperties: {
            "1": "",
            "2": "",
            "3": ""
          }
        }]
      };

      templateService.removeComponentsFromTemplate(template, [
        { id: 1 },
        { id: 2 }
      ]);

      expect(template.components.length).toBe(1);
      expect(Object.getOwnPropertyNames(template.resolutions[0].componentVisualProperties).length).toBe(1);
    });
  });
});