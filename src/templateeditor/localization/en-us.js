(function (angular) {
  "use strict";

  angular
    .module("Cerberus.TemplateEditor")
    .factory("Cerberus.TemplateEditor.Localization", function () {
      return {
        generic: {
          back: "Back",

          restore: "Restore to Default",
          save: "Save",
          saveExit: "Save and Exit",
          cancel: "Cancel",

          yes: "Yes",
          no: "No",

          exit: "Exit",

          editSettings: "Edit Settings",

          add: "Add",
          edit: "Edit",
          update: "Update",
          remove: "Remove",

          apply: "Apply"
        },

        remplateResolutions: {
          reachedMaximumResolutions: "MAXRESOLUTIONS REACHED",
          notEnoughSpace: "NOT ENOUGH SPACE"
        },

        componentActions: {
          removeSelectedComponents: "Remove selected component(s)",
          distributeVisualPropertiesToAllResolutions: "Distribute visual properties across all resolutions",
          distributeVisualPropertiesToLowerResolutions: "Distribute visual properties to lower resolutions",
          distributeVisualPropertiesToHigherResolutions: "Distribute visual properties to higher resolutions",
          distributeVisualPropertiesToResolutions: "Distribute visual properties to resolution...",
          showHiddenControls: "Show Hidden Elements"
        },
        componentProperties: {
          class: "Class",
          visible: "Visible",
          renderAs: "Render",
          hidden: "Hidden",
          generic: "Generic",
          zIndex: "Render Order",
          componentName: "Name",
          layout: "Layout",
          transform: "Transform",
          left: "Left",
          top: "Top",
          right: "Right",
          bottom: "Bottom",
          width: "Width",
          height: "Height",
          min: "Min",
          max: "Max",
          center: "Center",

          rotateZ: "Rotate",
          rotateZPlaceHolder: "Specify in deg, turn or rad",
          transformOrigin: "Transform Origin",

          fontAndColors: "Font and Colors",
          fontface: "Fontface",
          size: "Size",
          color: "Color",
          textAlign: "Text Align",
          textTransform: "Text Transform",
          noWrap: "Don't wrap",
          scrollable: "Enable scroll",

          background: "Background",
          image: "Image",
          imageRepeat: "Image Repeat",
          imagePosition: "Image Position",

          border: "Border",
          borderRadius: "Border Radius",
          radius: "Radius",
          padding: "Padding",
          topLeft: "Top Left",
          topRight: "Top Right",
          bottomRight: "Bottom Right",
          bottomLeft: "Bottom Left",

          textShadow: "Text Shadow",
          boxShadow: "Box Shadow",
          noxShadow: "Box",
          horizontalOffset: "Horizontal Offset",
          verticalOffset: "Vertical Offset",
          innerShadow: "Inner Shadow",
          blurRadius: "Blur Radius",
          spreadRadius: "Spread Radius",
          shadowType: "Shadow Type",

          opacity: "Opacity",
          opacityPlaceHolder: "Range: 0.0 - 1.0",
          imageSource: "Image Source",
          imageSize: "Image Size",
          imageSourcePlaceHolder: "Path to image",

          content: "Content",

          browserDefault: "Browser Default",
          borderSolid: "Solid",
          borderDashed: "Dashed",
          borderDotted: "Dotted",
          borderGroove: "Groove",
          borderDouble: "Double",
          borderInset: "Inset",
          borderOutset: "Outset",
          repeat: "Repeat",
          repeatHorizontally: "Repeat Horizontally",
          repeatVertically: "Repeat Vertically",
          dontRepeat: "Do not Repeat",

          contain: "Contain",
          cover: "Cover",

          misc: "Misc",
          itemSpacing: "Item Spacing",
          itemSpacingPlaceHolder: "Specify in pixels"
        },

        componentPluginNames: {
          text: "Text",
          link: "Link",
          sharer: "Sharer",
          youTube: "YouTube",
          rtf: "Rich Text Format",
          rss: "RSS",
          video: "Video",
          labelList: "Gmail Labels",
          messageList: "Gmail Messages",
          messageContent: "Gmail Message",
          authorization: "Gmail Authorization Handler"
        },

        // Editor localizations for the components
        component: {
          link: {
            text: "Content",
            tooltip: "Tooltip",
            url: "Url",
            target: "Target",

            newWindow: "New Window",
            sameWindow: "Same Window",

            tooltipPlaceHolder: "Enter a descriptive text",
            textPlaceHolder: "Enter text",
            urlPlaceHolder: "Enter a link to navigate to"
          },
          messageLink: {
            emptyMessagePlaceHolder: "Text to show when there are no messages",
            loadingClass: "CSS class to apply when fetching messages",
            loadingPlaceHolder: "Text to show when fetching messages"
          },
          rss: {
            url: "Url",
            showTitle: "Title",
            showDescription: "Description",
            showStoryDescription: "Story Description",
            showStoryDate: "Story Date",
            maxStories: "Max Stories"
          },
          tableOfContents: {
            source: "Source"
          },
          video: {
            mp4Source: "MP4 Source",
            oggSource: "Ogg Source",
            autoPlay: "Autoplay",
            loop: "Loop",
            showControls: "Show Controls"
          },
          youTube: {
            videoId: "Video Id",
            videoIdPlaceHolder: "Video Id",
            autoPlay: "Autoplay",
            startTime: "Start Time",
            loopInfinitely: "Loop",
            showControls: "Show player controls",
            disableKeyboard: "Disable keyboard shortcuts",
            hideYouTubeBrand: "Hide YouTube Brand",
            showInfo: "Show Video Info"
          },
          messageList: {
            loadingMessage: "Loading Message",
            emptyListMessage: "Empty List Message"
          }
        }
      };
    });
})(window.angular);