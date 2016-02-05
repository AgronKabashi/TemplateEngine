(function (angular) {
  "use strict";

  angular.module("Cerberus.TemplateEngine")
    .service("Google.API", [
      "$q",
      "Cerberus.TemplateEngine.Service.AsyncLoader",
      function ($q, AsyncLoaderService) {
        var apiUrl = "https://apis.google.com/js/client.js?onload=googleApiLoaderHook";
        var isAuthorized = $q.defer();
        var isReady = $q.defer();

        // Global hook for the Google API loaded event
        window.googleApiLoaderHook = function () {
          isReady.resolve();

          // Since the client library has been loaded we no longer need the global hook
          delete window.googleApiLoaderHook;
        };

        // Authorizes the user by calling the Google API
        this.authorize = function (options) {
          if (options.reissuePromise) {
            isAuthorized.reject();
            isAuthorized = $q.defer();
          }

          window.gapi.auth.authorize({
            client_id: options.clientId,
            scope: options.scopes,
            immediate: options.immediate
          }, onAuthorize);
        };

        // Prepares a batch of Google API requests
        this.createBatch = function () {
          return window.gapi.client.newBatch();
        };

        this.request = function (path, options) {
          options = options || {};
          var apiRequest = window.gapi.client.request({
            path: path,
            method: options.body ? "POST" : "GET",
            params: options.params,
            body: options.body
          });

          // We can't attach an error handler for the request
          // if it is part of a batch. The .then method triggers
          // an actual request. An error handler is attached
          // to the batch request instead
          if (!options.isBatchRequest) {
            apiRequest.then(null, onRequestFailed);
          }

          return apiRequest;
        };

        // Reports whether the API is loaded or not
        this.whenIsReady = function () {
          return isReady.promise;
        };

        // Puts the service in an unauthorized state
        this.dropAuthorization = function () {
          isAuthorized && isAuthorized.reject();
          isAuthorized = $q.defer();
          isAuthorized.reject({
            status: 401,
            statusText: "Authorization failed. Could not authorize user."
          });
        };

        // Used for determining when the API is loaded and the user is authorized
        this.whenIsAuthorized = function () {
          return isAuthorized.promise;
        };

        // Load the Google API
        AsyncLoaderService.load(apiUrl, null, function () {
          isReady.reject({
            status: -1,
            statusMessage: "Network unavailable. Check your internet connection."
          });
        });

        // Callback method for handling the authorization result
        function onAuthorize(result) {
          if (result && !result.error) {
            isAuthorized.resolve(window.gapi);
          }
          else {
            isAuthorized.reject({
              status: 401,
              statusText: "Authorization failed. Could not authorize user."
            });
          }
        }

        function onRequestFailed(response) {
          var status = response.result.error.code;
          var statusMessage = response.result.error.message;

          // Since we want to pass on the error to the caller without exposing
          // the raw response we mutate it by clearing and reforming it to our
          // structure
          Object.getOwnPropertyNames(response).forEach(function (propertyName) {
            delete response[propertyName];
          });

          angular.extend(response, {
            status: status,
            statusMessage: statusMessage
          });
        }
      }
    ]);
})(window.angular);