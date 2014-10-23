define(
	[
		"angular"
	],
	function (angular)
	{
		return angular
			.module("Cerberus.Tool.TemplateEditor.Service.History", [])
			.service("Cerberus.Tool.TemplateEditor.Service.History",
			[
				"Cerberus.Tool.TemplateEditor.Helper.TemplateEditor",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				function (TemplateEditorHelper, DataBagService)
				{
					var history = [];
					var historyIndex = -1;
					var initialVisualProperties = null;

					function TakeSnapshot(visualProperties)
					{
						initialVisualProperties = visualProperties;
					}

					function CommitSnapshot(resolution, changedVisualProperties)
					{
						if (!initialVisualProperties)
						{
							return;
						}

						history.push(
						{
							Resolution: resolution,
							Id: 0,
							InitialVisualProperties: initialVisualProperties,
							ChangedVisualProperties: changedVisualProperties
						});
					}

					function ApplyChanges(index, propertyName)
					{
						var snapShot = history[index];
						historyIndex = index;

						DataBagService.GetData("Template")
							.then(function (template)
							{
								TemplateEditorHelper.SetTemplateControlVisualProperties(
									template,
									snapShot.Resolution,
									{
										Id: snapShot.Id,
										VisualPropertes: snapShot[propertyName]
									});
							});
					}

					this.Undo = function ()
					{
						ApplyChanges(historyIndex - 1);
					};

					this.Redo = function ()
					{
						ApplyChanges(historyIndex + 1);
					};

					this.Clear = function ()
					{
						history = [];
						historyIndex = -1;
						initialData = null;
					};
				}
			]);
	});