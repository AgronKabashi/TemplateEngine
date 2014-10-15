namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation")
	.Link = function ()
	{
		this.Url = "";
		this.Tooltip = "";
		this.Text = "";
		this.Target = "";
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Navigation.Link",
	[
		"$scope",
		function ($scope)
		{
			var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.Link();

			//Ensures that whenever content is updated, so is the view
			$scope.$watch("TemplateControl.Content", function ()
			{
				$scope.ControlData = JSON.tryParse($scope.TemplateControl.Content, defaultContent);
			});
		}
	]);