/*eslint strict:0*/
namespace("Cerberus.TemplateEngine.Model.Resolution", function (resolutionValue) {
  this.Id = 0;
  this.ResolutionValue = ~~resolutionValue || 10000;
  this.ComponentVisualProperties = {};
});