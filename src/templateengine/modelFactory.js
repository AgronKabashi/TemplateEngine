(function (angular) {
  "use strict";

  var _models = {};

  var ModelFactory = {
    registerModel: function (id, model) {
      _models[id] = model;
    },

    getModelType: function (id) {
      return _models[id];
    },

    instantiateModel: function (id, args) {
      return new _models[id](args);
    }
  };

  angular
    .module("Cerberus.ModelFactory", [])
    .factory("Cerberus.ModelFactory", function () {
      return ModelFactory;
    });

  angular.extend(angular.module("Cerberus.ModelFactory"), ModelFactory);
})(window.angular);