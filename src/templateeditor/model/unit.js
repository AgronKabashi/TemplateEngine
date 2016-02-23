(function (angular) {
  "use strict";

  angular
    .module("Cerberus.ModelFactory")
    .registerModel("Cerberus.TemplateEditor.Model.Unit", function (value) {
      this.value = parseFloat(value);
      this.unitType = undefined;

      if (isNaN(this.value)) {
        this.value = value;
      }
      else {
        this.unitType = value.substring(this.value.toString().length);
      }
    });

})(window.angular);