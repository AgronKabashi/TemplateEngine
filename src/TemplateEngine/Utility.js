(function () {
  "use strict";

  /******************************************
  String manipulations
  ******************************************/
  String.format = function () {
    var args = arguments;
    var str = args[0];
    return str.replace(/{(\d+)}/g, function (match, number) {
      number = ~~number + 1;
      return typeof args[number] !== "undefined" ? args[number] : match;
    });
  };

  window.tryParseInt = function (value) {
    var result = parseInt(value);
    return isNaN(result) ? 0 : result;
  };

  /******************************************
  JSON
  ******************************************/
  JSON.tryParse = function (value, fallbackObject) {
    var result;

    try {
      result = this.parse(value);
    }
    catch (e) {
      result = fallbackObject;
    }

    return result;
  };

  /*******************************
    Namespacing
  *******************************/
  window.namespace = function (namespaceString, data) {
    var parts = namespaceString.split("."),
      parent = window,
      currentPart = "",
      length = parts.length - 1;

    for (var i = 0; i < length; i++) {
      currentPart = parts[i];
      parent[currentPart] = parent[currentPart] || {};
      parent = parent[currentPart];
    }

    parent[parts[length]] = data;
  };
})();