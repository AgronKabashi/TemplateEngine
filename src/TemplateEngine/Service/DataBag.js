(function (angular) {
  angular
			.module("Cerberus.TemplateEngine")
			.service("Cerberus.TemplateEngine.Service.DataBag", function () {
			  var dataBag = {};

			  this.AddData = function (id, value) {
			    dataBag[id.toLowerCase()] = value;
			  };

			  this.GetData = function (id) {
			    return dataBag[id.toLowerCase()];
			  };

			  this.RemoveData = function (id) {
			    delete dataBag[id.toLowerCase()];
			  };
			});
})(angular);