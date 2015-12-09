// TODO: Make it work
// (function (angular) {
//   "use strict";
//
//   angular
//     .module("Cerberus.TemplateEditor")
//     .service("Cerberus.TemplateEditor.Service.History", [
//       "Cerberus.TemplateEditor.Helper.TemplateEditor",
//       "Cerberus.TemplateEngine.Service.DataBag",
//       function (TemplateEditorHelper, DataBagService) {
//         //	var history = [];
//         //	var historyIndex = -1;
//         //	var initialVisualProperties = null;
//
//         //	function TakeSnapshot(visualProperties)
//         //	{
//         //		initialVisualProperties = visualProperties;
//         //	}
//
//         //	function CommitSnapshot(resolution, changedVisualProperties)
//         //	{
//         //		if (!initialVisualProperties)
//         //		{
//         //			return;
//         //		}
//
//         //		history.push(
//         //		{
//         //			Resolution: resolution,
//         //			Id: 0,
//         //			InitialVisualProperties: initialVisualProperties,
//         //			ChangedVisualProperties: changedVisualProperties
//         //		});
//         //	}
//
//         //	function ApplyChanges(index, propertyName)
//         //	{
//         //		var snapShot = history[index];
//         //		historyIndex = index;
//
//         //		DataBagService.GetData("Template")
//         //			.then(function (template)
//         //			{
//         //				TemplateEditorHelper.SetComponentVisualProperties(
//         //					template,
//         //					snapShot.Resolution,
//         //					{
//         //						Id: snapShot.Id,
//         //						VisualPropertes: snapShot[propertyName]
//         //					});
//         //			});
//         //	}
//
//         //	this.Undo = function ()
//         //	{
//         //		ApplyChanges(historyIndex - 1);
//         //	};
//
//         //	this.Redo = function ()
//         //	{
//         //		ApplyChanges(historyIndex + 1);
//         //	};
//
//         //	this.Clear = function ()
//         //	{
//         //		history = [];
//         //		historyIndex = -1;
//         //		initialData = null;
//         //	};
//       }
//     ]);
// })(window.angular);