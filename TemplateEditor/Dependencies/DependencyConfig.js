var require =
{
	paths:
	{
		"Cerberus.Extensions": "Dependencies/Extensions",

		"jquery": "Dependencies/jQuery/v2.1.1/jquery.min",
		"jquery-ui": "Dependencies/jQueryUI/v1.11/jquery-ui.min",
		"jquery-ui-resizable-fix": "Dependencies/jQueryUI/v1.11/jquery-ui-resizable",

		"lodash": "Dependencies/lodash/lodash.min",

		"angular": "Dependencies/angularJS/angular.min",
		"angular-sanitize": "Dependencies/angularJS/angular-sanitize.min",

		"angular-ui-router": "Dependencies/angularJS/Modules/AngularUI/angular-ui-router.min",

		"Cerberus.Service.HttpPost": "Dependencies/angularJS/HttpPost",

		"domReady": "Dependencies/requireJS/v2.1.11/domReady.min",

		"jquery-mousewheel": "Dependencies/jQuery/v2.1.1/Plugins/jquery.mousewheel.min",
		"jquery-mCustomScrollbar": "Dependencies/jQuery/v2.1.1/Plugins/jquery.mCustomScrollbar.min"
	},

	shim:
	{
		"angular":
		{
			exports: "angular",
			deps: ["jquery", "lodash"]
		},

		"angular-ui-router":
		{
			deps: ["angular"]
		},

		"angular-sanitize":
		{
			deps: ["angular"]
		},

		"Cerberus.Service.HttpPost":
		{
			deps: ["angular"]
		},

		"jquery-ui-resizable-fix":
		{
			deps: ["jquery", "jquery-ui"]
		},

		"jquery-mousewheel":
		{
			deps: ["jquery"]
		},

		"jquery-mCustomScrollbar":
		{
			deps: ["jquery", "jquery-mousewheel"]
		}
	},

	deps:
	[
		"domReady",
		"Cerberus.Extensions"
	]
};