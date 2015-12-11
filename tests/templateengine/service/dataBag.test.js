"use strict";

describe("Cerberus.TemplateEngine.Service.DataBag", function () {
  var databag;
  beforeEach(module("Cerberus.TemplateEngine"));

  beforeEach(inject(function($injector) {
    databag = $injector.get("Cerberus.TemplateEngine.Service.DataBag");
  }));

  describe("addData()", function () {
    it("should be able store data using a key", function () {
      databag.addData("key", "value");
      expect(databag.getData("key")).toBeDefined();
    });

    it("should overwrite data if key already exists", function () {
      databag.addData("key", "value");
      databag.addData("key", "value2");
      expect(databag.getData("key")).toBe("value2");
    });
  });

  describe("getData()", function () {
    it("should return undefined if key doesn't exist", function () {
      expect(databag.getData("key")).toBeUndefined();
    });

    it("should return data if key exists", function () {
      databag.addData("key", "value");
      expect(databag.getData("key")).toBe("value");
    });
  });

  describe("removeData()", function () {
    it("should remove data using a key", function () {
      databag.addData("key", "value");
      expect(databag.getData("key")).toBeDefined();
      databag.removeData("key");
      expect(databag.getData("key")).toBeUndefined();
    });
  });
});