(function (angular, _) {
  "use strict";

  angular
    .module("Cerberus.TemplateEngine")
    .service("Cerberus.TemplateEngine.Service.Event", [
     "$rootScope",
      function ($rootScope) {
        var events = {};
        var isProcessingEvents = false;

        this.Subscribe = function (eventType, callback, context) {
          var eventCollection = events[eventType];
          if (!eventCollection) {
            eventCollection = events[eventType] = [];
          }

          eventCollection.push(callback.bind(context || window));
        };

        this.UnSubscribe = function (eventType, callback) {
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

        this.Notify = function (eventType, data, source) {
          var doDigest = false;
          if (!isProcessingEvents) {
            isProcessingEvents = true;
            doDigest = true;
          }

          console.log("Notifying: %o", eventType);
          var eventCollection = events[eventType];

          _.forEach(eventCollection, function (callback) {
            callback && callback(data, source);
          });

          //console.log("NotifyEnd");

          if (doDigest) {
            setTimeout(function () {
              isProcessingEvents = false;
              console.log("Digest");
              $rootScope.$digest();
            });
          }
        };

        this.Clear = function () {
          events = {};
        };
      }
    ]);
})(window.angular, window._);