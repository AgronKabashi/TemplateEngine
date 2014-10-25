var require =
{
	paths:
	{
		"Cerberus.Extensions": "TemplateEditor/Dependencies/Extensions",
		
		"lodash": "TemplateEditor/Dependencies/lodash/lodash.min",

		"angular": "TemplateEditor/Dependencies/angularJS/angular.min",
		
		"ResourceBuilder": "TemplateEditor/Dependencies/angularJS/ResourceBuilder",
		"LazyConfig": "TemplateEditor/Dependencies/angularJS/LazyConfig",
		"LazyController": "TemplateEditor/Dependencies/angularJS/LazyController",

		"domReady": "TemplateEditor/Dependencies/requireJS/v2.1.11/domReady.min"
	},

	shim:
	{
		"angular":
		{
			exports: "angular",
			deps: ["lodash"]
		}
	},

	deps:
	[
		"domReady",
		"Cerberus.Extensions"
	]
};