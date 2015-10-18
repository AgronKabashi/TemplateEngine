(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .service("Cerberus.TemplateEngine.Service.Event", ["$rootScope", EventService]);

  function EventService($rootScope) {
    var events = {};
    var isProcessingEvents = false;

    this.subscribe = function (eventType, callback, context) {
      // Ensure we are working with collections only
      var eventTypes = _.isArray(eventType) ? eventType : [eventType];
      var eventCollection;

      _.forEach(eventTypes, function (e) {
        eventCollection = events[e] || (events[e] = []);

        if (context) {
          callback = callback.bind(context);
        }

        eventCollection.push(callback);
      });
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