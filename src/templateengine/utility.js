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

  window.tryParseFloat = function (value) {
    var result = parseFloat(value);
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
})();