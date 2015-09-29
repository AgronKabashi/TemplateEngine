(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .service("Cerberus.TemplateEngine.Service.Event", ["$rootScope", EventService]);

  function EventService($rootScope) {
    var events = {};
    var isProcessingEvents = false;

    this.subscribeMultiple = function (eventTypes, callback, context) {
      _.forEach(eventTypes, function (eventType) {
        this.subscribe(eventType, callback, context);
      }, this);
    },

    this.subscribe = function (eventType, callback, context) {
      var eventCollection = events[eventType];
      if (!eventCollection) {
        eventCollection = events[eventType] = [];
      }

      eventCollection.push(callback.bind(context));
    };

    this.unSubscribe = function (eventType, callback) {
      var eventCollection = events[eventType];
      if (!eventCollection) {
        return;
      }

      _.remove(eventCollection, function (c) {
        return c === callback;
      });

      if (!eventCollection.length) {
        delete events[eventType];
      }
    };

    this.notify = function (eventType, data, source) {
      var doDigest = false;
      if (!isProcessingEvents) {
        isProcessingEvents = true;
        doDigest = true;
      }

      //console.log("Notifying: %o", eventType);
      var eventCollection = events[eventType];

      _.forEach(eventCollection, function (callback) {
        if (callback) {
          callback(data, source);
        }
      });

      //console.log("NotifyEnd");

      if (doDigest) {
        setTimeout(function () {
          isProcessingEvents = false;
          //console.log("Digest");
          $rootScope.$digest();
        });
      }
    };

    this.clear = function () {
      events = {};
    };
  }
})(window.angular, window._);