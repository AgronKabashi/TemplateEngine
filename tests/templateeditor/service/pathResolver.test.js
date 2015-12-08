"use strict";

describe("Cerberus.TemplateEditor.Service.PathResolver", function () {
  var pathResolverService;
  var templateEditorPath;

  beforeEach(module("Cerberus.TemplateEditor"));
  beforeEach(inject(function($injector) {
    pathResolverService = $injector.get("Cerberus.TemplateEditor.Service.PathResolver");
    templateEditorPath = $injector.get("templateEditorPath");
  }));

  describe("resolve()", function () {
    it("should resolve paths relative to templateeditor", function () {
      var path = "view/template.html";
      expect(pathResolverService.resolve(path)).toBe(templateEditorPath + path);
    });
  });
});