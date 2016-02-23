"use strict";

describe("Cerberus.TemplateEngine.Service.Event", function () {
  var eventManager;
  var target = {
    callback: function () {
    }
  };

  beforeEach(module("Cerberus.TemplateEngine"));
  beforeEach(inject(function($injector) {
    eventManager = $injector.get("Cerberus.TemplateEngine.Service.Event");
  }));

  describe("subscribe()", function () {
    it("should subscribe to an event", function () {
      eventManager.subscribe("eventId", target.callback);
      expect(eventManager.hasEventsOfType("eventId")).toBeTruthy();
    });

    it("should subscribe to multiple events", function () {
      eventManager.subscribe(["eventId1", "eventId2", "eventId3"], target.callback);
      expect(eventManager.hasEventsOfType("eventId1")).toBeTruthy();
      expect(eventManager.hasEventsOfType("eventId2")).toBeTruthy();
      expect(eventManager.hasEventsOfType("eventId3")).toBeTruthy();
    });
  });

  describe("unSubscribe()", function () {
    it("should unsubscribe from an event registered with a specific callback method", function () {
      eventManager.subscribe("eventId", target.callback);
      eventManager.unsubscribe("eventId", target.callback);
      expect(eventManager.hasEventsOfType("eventId")).toBeFalsy();
    });
  });

  describe("unSubscribeAll()", function () {
    it("should unsubscribe from all events of a certain type", function () {
      eventManager.subscribe(["eventId", "eventId", "eventId"], target.callback);
      eventManager.unsubscribe("eventId", target.callback);
      expect(eventManager.hasEventsOfType("eventId")).toBeFalsy();
    });
  });

  describe("notify()", function () {
    it("should notify a callback method when an event is triggered", function () {
      spyOn(target, "callback");
      eventManager.subscribe("eventId", target.callback);
      eventManager.notify("eventId", 1, this);
      expect(target.callback).toHaveBeenCalled();
      expect(target.callback).toHaveBeenCalledWith(1, this);
    });
  });
});