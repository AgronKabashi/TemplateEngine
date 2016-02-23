(function (angular, _) {
  "use strict";

  var clientId = "847658075745-leq2ks7v2ambuq8tj18v4c7qpkg17mln.apps.googleusercontent.com";
  var scopes = [
    "https://www.googleapis.com/auth/gmail.readonly"
  ];

  angular.module("Cerberus.TemplateEngine")
    .constant("Cerberus.TemplateEngine.Constant.Gmail.Labels", {
      INBOX: "INBOX",
      SENT: "SENT",
      DRAFT: "DRAFT",
      TRASH: "TRASH"
    })
    .service("Cerberus.TemplateEngine.Service.Gmail", [
      "$q",
      "Cerberus.TemplateEngine.Constant.Gmail.Labels",
      "Google.API",
      "Cerberus.TemplateEngine.Service.Event",
      function ($q, labels, GoogleApiService, EventService) {
        // Let the API know what scopes we need for using the GMAIL features
        GoogleApiService.whenIsReady().then(function () {
          GoogleApiService.authorize({
            clientId: clientId,
            scopes: scopes,
            immediate: true
          });
        });

        this.authorizeUser = function () {
          GoogleApiService.authorize({
            clientId: clientId,
            scopes: scopes,
            reissuePromise: true
          });

          GoogleApiService.whenIsAuthorized()
            .then(function () {
              EventService.notify("Gmail.Reauthorized");
            }, onRequestFailed);
        };

        this.getSystemLabels = function () {
          return [
            {
              id: labels.INBOX,
              name: "Inbox"
            },
            {
              id: labels.SENT,
              name: "Sent"
            },
            {
              id: labels.DRAFT,
              name: "Draft"
            },
            {
              id: labels.TRASH,
              name: "Trash"
            }];
        };

        this.getUserLabels = function () {
          return this.whenIsAuthorized().then(function () {
            return GoogleApiService
              .request("/gmail/v1/users/me/labels")
              .then(function (response) {
                // Filter out labels that are not visible
                return _.filter(response.result.labels, function (label) {
                  return label.type === "user" &&
                    (label.labelListVisibility === undefined ||
                      label.labelListVisibility === "labelShow");
                });
              }, onRequestFailed);
          });
        };

        this.getMessage = function (messageId) {
          return this.whenIsAuthorized().then(function () {
            return GoogleApiService
              .request("/gmail/v1/users/me/messages/" + messageId, {
                params: {
                  format: "full"
                }
              })
              .then(function (response) {
                return getMessageDetails(response.result.id, response.result);
              }, onRequestFailed);
          });
        };

        this.getMessages = function (labelIds, options) {
          options = options || {};
          return this.whenIsAuthorized().then(function () {
            return GoogleApiService
              .request("/gmail/v1/users/me/messages", {
                params: {
                  labelIds: labelIds,
                  maxResults: options.maxResults,
                  pageToken: options.pageToken,
                  query: options.query
                }
              })
              .then(batchMessageFetch, onRequestFailed);
          });
        };

        this.whenIsAuthorized = function () {
          return $q.all([GoogleApiService.whenIsReady(), GoogleApiService.whenIsAuthorized()]);
        };

        // Batches several message requests into one
        function batchMessageFetch(response) {
          var messages = response.result.messages;
          if (response.result.resultSizeEstimate === 0) {
            return [];
          }

          var batch = GoogleApiService.createBatch();
          var messageParams = {
            isBatchRequest: true,
            params: {
              format: "metadata"
            }
          };

          messages.forEach(function (message) {
            batch.add(GoogleApiService.request("/gmail/v1/users/me/messages/" + message.id, messageParams), { id: message.id });
          });

          return batch.then(function (batchResponse) {
            var batchMessages = [];
            for (var i in batchResponse.result) {
              batchMessages.push(getMessageDetails(i, batchResponse.result[i].result));
            }

            return batchMessages;
          });
        }

        function onRequestFailed(error) {
          GoogleApiService.dropAuthorization();
          EventService.notify("Gmail.RequestFailed", error);
        }

        function getMessageDetails(messageId, rawMessage) {
          var payload = rawMessage.payload;
          var message = {
            id: messageId,
            plainText: "",
            htmlText: "",
            snippet: rawMessage.snippet,
            isRead: rawMessage.labelIds.indexOf("UNREAD") < 0,
            isStarred: rawMessage.labelIds.indexOf("STARRED") >= 0
          };

          var i;
          if (payload.parts) {
            for (i = 0; i < payload.parts.length; i++) {
              if (payload.parts[i].mimeType === "text/plain") {
                message.plainText += payload.parts[i].body.data;
              }

              if (payload.parts[i].mimeType === "text/html") {
                message.htmlText += payload.parts[i].body.data;
              }
            }
          }
          else if (payload.body) {
            message.htmlText = payload.body.data;
          }

          if (message.htmlText) {
            message.htmlText = message.htmlText.replace(/-/g, "+").replace(/_/g, "/");
            message.htmlText = decodeURIComponent(escape(window.atob(message.htmlText)));
            var contentStartIndex = message.htmlText.indexOf("<body");
            if (contentStartIndex >= 0) {
              contentStartIndex += 5;
              message.htmlText = "<div" + message.htmlText.substring(contentStartIndex);
              message.htmlText = message.htmlText.substring(0, message.htmlText.indexOf("</body")) + "</div>";
            }
          }

          var header;
          for (i = 0; i < payload.headers.length; i++) {
            header = payload.headers[i];

            switch (header.name) {
              case "Subject":
                message.subject = header.value;
                break;

              case "Received":
                message.received = header.value;
                break;

              case "Date":
                message.date = new Date(header.value).toLocaleString();
                break;

              case "From":
                message.from = parseEmailInfo(header.value);
                break;

              case "To":
                message.to = parseEmailInfo(header.value);
                break;
            }
          }

          return message;
        }

        function parseEmailInfo(emailString) {
          var leftTagIndex = emailString.indexOf("<");
          return {
            address: emailString.substring(leftTagIndex, emailString.length - 1),
            name: emailString.substring(0, leftTagIndex)
          };
        }
      }
    ]);
})(window.angular, window._);