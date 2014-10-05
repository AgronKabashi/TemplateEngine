namespace("Cerberus.Tool.TemplateEngine.Model")
	.Resolution = function (resolutionValue)
	{
		this.Id = 0;
		this.ResolutionValue = ~~resolutionValue || 10000;
		this.TemplateControlVisualProperties = [];
	};