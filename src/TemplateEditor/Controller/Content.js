// (function (angular) {
//   "use strict";
//
//   angular
//     .module("Cerberus.TemplateEngine")
//     .controller("Cerberus.TemplateEditor.Controller.Content", [
//       "$scope",
//       "Cerberus.TemplateEditor.Localization",
//       "Cerberus.TemplateEngine.Service.Template",
//       "Cerberus.TemplateEditor.Service.History",
//       "Cerberus.TemplateEngine.Service.DataBag",
//       function ($scope, Localization, TemplateEngineService, HistoryService, DataBagService) {
//         $scope.Localization = Localization;
//
//         DataBagService.AddData("TemplateMode", Cerberus.TemplateEngine.TemplateMode.EditContent);
//
//         $scope.Save = function (successCallback) {
//           return TemplateEngineService.SaveDocument(DataBagService.GetData("Template"),
//               documentId,
//               documentTypeId);
//         };
//
//         $scope.Exit = function () {
//           var exitUrl = "/";
//           window.location.href = exitUrl;
//         };
//
//         $scope.SaveExit = function () {
//           this
//             .Save()
//             .then(function () {
//               $scope.Exit();
//             });
//         };
//       }
//     ]);
// })(window.angular);