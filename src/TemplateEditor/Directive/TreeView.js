(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
		.directive("treeview", [
				"Cerberus.Module.CMS.Service.Folder",
				function (FolderService) {
				  return {
				    restrict: "A",
				    scope: {
				      ngModel: "="
				    },
				    template:
							'<li ng-repeat="folder in Folders" treeviewitem="{{folder.Id}}" ng-class="{ expanded: IsExpanded, selected: ngModel.FolderId == folder.Id }">\
								<span ng-bind="folder.Name" ng-click="Expand(folder.Id)" />\
							</li>',

				    link: function (scope, element, attributes) {
				      function Populate() {
				        var folderId = ~~attributes.folderid;
				        scope.Folders = FolderService.GetFolders(folderId);

				        var index = scope.ngModel.ExpandFolderList.indexOf(scope.ngModel.FolderId);
				      }

				      var clearWatch = scope.$watch("ngModel.ExpandFolderList", function () {
				        if (!scope.ngModel.ExpandFolderList) {
				          return;
				        }

				        clearWatch();
				        Populate();
				      });
				    }
				  };
				}
		])
		.directive("treeviewitem", [
			"$compile",
			function ($compile) {
			  return {
			    restrict: "A",
			    link: function (scope, element, attributes) {
			      scope.Expand = function (folderId, isAutoExpanding) {
			        scope.IsExpanded = !scope.IsExpanded;

			        if (!isAutoExpanding) {
			          scope.ngModel.FolderId = folderId;
			        }

			        if (!scope.IsCached) {
			          scope.IsCached = true;

			          var compile = $compile(String.format('<ul data-treeview folderid="{0}" ng-model="ngModel"></ul>', folderId));
			          element.append(compile(scope));
			        }
			      };

			      //Autoexpand
			      //TODO: Can be optimized
			      if (scope.ngModel.ExpandFolderList.indexOf(~~attributes.treeviewitem) >= 0) {
			        scope.Expand(~~attributes.treeviewitem, true);
			      }
			    }
			  };
			}
		]);
})(window.angular);