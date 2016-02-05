(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .service("Cerberus.TemplateEngine.Service.Event", ["$rootScope", EventService]);

  function EventService($rootScope) {
    var events = {};
    var isProcessingEvents = false;

    this.hasEventsOfType = function (eventType) {
      return events[eventType] !== undefined;
    },

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

    this.unsubscribe = function (eventType, callback) {
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

    this.unsubscribeAll = function (eventType) {
      delete events[eventType];
    };

    this.notify = function (eventType, data, source) {
      var doDigest = false;
      if (!isProcessingEvents) {
        isProcessingEvents = true;
        doDigest = true;
      }

      var eventCollection = events[eventType];

      _.forEach(eventCollection, function (callback) {
        if (callback) {
          callback(data, source);
        }
      });

      if (doDigest) {
        // TODO: This needs optimization, digest from the rootScope is wasteful of resources
        setTimeout(function () {
          isProcessingEvents = false;
          $rootScope.$digest();
        });
      }
    };

    this.clear = function () {
      events = {};
    };
  }
})(window.angular, window._);