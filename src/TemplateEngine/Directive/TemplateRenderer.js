define(
	[
		"../App.js",

		//Controllers
		"../Controller/ControlPlugin/Base.js"
	],
	function (templateEngineModule)
	{
		return templateEngineModule
			.directive("templaterenderer",
			[
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				function (DataBagService)
				{
					return {
						restrict: "E",
						scope: {},
						template: function (element, attributes)
						{
							var isEditMode = (attributes.templateMode || "View") != "View";
							var nameAttribute = "",
								styleAttribute = "",
								directiveAttrute = "";

							if (isEditMode)
							{
								nameAttribute = 'data-friendly-name="{{TemplateControl.FriendlyName}}" data-control-name="{{TemplateControl.ControlName}}"';
								styleAttribute = 'ng-attr-style="{{TemplateControl.VisualProperties}}"';
								directiveAttrute = "cs-draggable-selectable-resizable";
							}

							return String.format(
								'<div class="template" \
									ng-controller="Cerberus.Tool.TemplateEngine"> \
									<div ng-repeat="TemplateControl in Template.TemplateControls track by TemplateControl.Id" \
										{0} {1} {2} \
										ng-attr-id="TC{{TemplateControl.Id}}"\
										class="template-control" \
										ng-class="TemplateControl.Class" \
										ng-include="BaseControlPath" \
										ng-controller="Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Base"> \
									</div> \
								</div>', nameAttribute, styleAttribute, directiveAttrute)
						}
					};
				}
			]);
	});