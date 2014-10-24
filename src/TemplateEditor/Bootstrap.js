require(
	[
		"angular",

		"./App.js",
		"./Routing.js",
		
		//Directives
		"./Directive/DraggableResizableSelectable.js",
		"./Directive/MessageDialog.js",
		"./Directive/ControlPluginFilter.js",
		"./Directive/ControlPlugins.js",
		"./Directive/TemplateResolutions.js",
		"./Directive/TemplateControlActions.js",
		"./Directive/TemplateControlProperties.js",
		"./Directive/TemplateControlSelection.js",
		"./Directive/ToggleHiddenElements.js",
		"./Directive/Droppable.js",
		"./Directive/AutosizeTemplate.js",
		"./Directive/ButtonDropdown.js"
	],
	function (angular)
	{
		require(["domReady!"], function (document)
		{
			angular.bootstrap(document, ["Cerberus.Tool.TemplateEditor"]);
		});
	});