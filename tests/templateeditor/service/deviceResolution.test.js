"use strict";

describe("Cerberus.TemplateEditor.Service.DeviceResolution", function () {
  var deviceResolutionService;

  beforeEach(module("Cerberus.TemplateEditor"));
  beforeEach(inject(function($injector) {
    deviceResolutionService = $injector.get("Cerberus.TemplateEditor.Service.DeviceResolution");
  }));

  describe("getResolutions()", function () {
    it("should return a list of preset resolutions", function () {
      expect(_.pluck(deviceResolutionService.getResolutions(), "value")).toEqual([640, 768]);
    });
  });
});