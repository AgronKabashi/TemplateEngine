namespace("Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation")
	.TableOfContents = function ()
	{
	  this.SourceTemplateControlId = 0;
	};

angular
  .module("Cerberus.Tool.TemplateEngine")
  .controller("Cerberus.Tool.TemplateEngine.Controller.ControlPlugin.Navigation.TableOfContents",
  [
			"$scope",
			function ($scope)
			{
			  var defaultContent = new Cerberus.Tool.TemplateEngine.Model.ControlPlugin.Navigation.TableOfContents();

			  //Ensures that whenever content is updated, so is the view
			  $scope.$watch("TemplateControl.Content", function ()
			  {
			    $scope.ControlData = JSON.tryParse($scope.TemplateControl.Content, defaultContent);
			  });
			}
  ])
	.directive("tableofcontents",
		[
			"$timeout",
			"Cerberus.Tool.TemplateEngine.Service.DataBag",
			function ($timeout, DataBagService)
			{
			  function RebuildTableOfContents(scope, element)
			  {
			    element.empty();

			    if (scope.ControlData.SourceTemplateControlId <= 0)
			    {
			      return;
			    }

			    var hashList = [];
			    var headerElements = $("h1,h2,h3,h4,h5", $(String.format("#TC{0}", scope.ControlData.SourceTemplateControlId)));
			    var currentElement = element;
			    var lastHeaderRank = 0;

			    headerElements.each(function ()
			    {
			      var headerRank = ~~this.tagName.substring(1);

			      if (headerRank > lastHeaderRank)
			      {
			        //currentElement = header;
			      }
			      else
			      {
			        //currentElement = currentElement.parent();
			      }

			      lastHeaderRank = headerRank;

			      var header = $(String.format("<h{0}>", headerRank));
			      header.text($(this).text())
			      currentElement.append(header);

			      //generate hash
			      //attach to element
			      //generate header in TOC
			    });
					
			    var templateControlElement = element.closest(".template-control");
			    var templateRenderer = $("templaterenderer");
			    var top = tryParseInt(templateControlElement.position().top);

			    templateRenderer.scroll(function ()
			    {
			      if (templateRenderer.get(0).scrollTop > top)
			      {
			        templateControlElement.addClass("fixed");
			      }
			      else
			      {
			        var body = $("body");
			        body.removeClass("animatable");

			        templateControlElement.removeClass("fixed");

			        setTimeout(function ()
			        {
			          body.addClass("animatable");
			        }, 0);
			      }
			    });
			  }

			  return {
			    restrict: "A",
			    link: function (scope, element, attributes)
			    {
			      scope.$parent.$watch("ControlData", function ()
			      {						
			        $timeout(function ()
			        {
			          RebuildTableOfContents(scope, element);
			        });
			      });
			    }
			  };
			}
		]
});