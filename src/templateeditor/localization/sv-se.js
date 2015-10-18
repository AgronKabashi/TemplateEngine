//(function (angular) {
//  "use strict";

//  angular
//    .module("Cerberus.TemplateEditor")
//		.factory("Cerberus.TemplateEditor.Localization", function () {
//		  return {
//		    Generic: {
//		      Back: "Tillbaka",

//		      Restore: "Återställ",
//		      Save: "Spara",
//		      SaveExit: "Spara och avsluta",
//		      Cancel: "Avbryt",

//		      Yes: "Ja",
//		      No: "Nej",

//		      Exit: "Avsluta",

//		      EditSettings: "Redigera inställningar",

//		      Add: "Skapa",
//		      Edit: "Redigera",
//		      Update: "Uppdatera",
//		      Remove: "Ta bort",

//		      Apply: "Applicera"
//		    },

//		    TemplateResolutions: {
//		      ReachedMaximumResolutions: "MAXRESOLUTIONS REACHED",
//		      NotEnoughSpace: "NOT ENOUGH SPACE"
//		    },

//		    ComponentActions: {
//		      RemoveSelectedComponents: "Ta bort vald(a) mallkontroll(er)",
//		      DistributeVisualPropertiesToAllResolutions: "Distribuera visuella egenskaper till alla upplösningar",
//		      DistributeVisualPropertiesToLowerResolutions: "Distribuera visuella egenskaper till lägre upplösningar",
//		      DistributeVisualPropertiesToHigherResolutions: "Distribuera visuella egenskaper till högre upplösningar",
//		      DistributeVisualPropertiesToResolutions: "Distribuera visuella egenskaper till upplösning...",
//		      ShowHiddenControls: "Visa dolda element"
//		    },
//		    ComponentProperties: {
//		      Class: "Class",
//		      Visible: "Synlig",
//		      Hidden: "Dold",
//		      Generic: "Generiskt",
//		      ZIndex: "Renderingsordning",
//		      ComponentName: "Namn",
//		      Layout: "Layout",
//		      Left: "Vänster",
//		      Top: "Topp",
//		      Right: "Höger",
//		      Bottom: "Botten",
//		      Width: "Bredd",
//		      Height: "Höjd",
//		      MinWidth: "Minimibredd",
//		      MinHeight: "Minimihöjd",
//		      Center: "Center",

//		      RotateZ: "Rotate",
//		      RotateZPlaceHolder: "Ange i deg, turn eller rad",

//		      FontAndColors: "Typsnitt och färger",
//		      Typeface: "Typsnitt",
//		      Size: "Storlek",
//		      Color: "Färg",
//		      TextAlign: "Textjustering",
//		      TextTransform: "Textformat",
//		      NoWrap: "Radbryt ej",
//		      Scrollable: "Aktivera skroll",

//		      Background: "Bakgrund",
//		      Image: "Bildkälla",
//		      ImageRepeat: "Bildrepetering",
//		      ImagePosition: "Bildjustering",

//		      Border: "Ram",
//		      BorderRadius: "Radie",
//		      Padding: "Inre marginal",
//		      TopLeft: "Övre vänstra",
//		      TopRight: "Övre högra",
//		      BottomRight: "Nedre högra",
//		      BottomLeft: "Nedre vänstra",

//		      Shadows: "Skuggor",
//		      BoxShadow: "Box",
//		      TextShadow: "Text",
//		      HorizontalOffset: "Horisontell offset",
//		      VerticalOffset: "Vertikal offset",
//		      InnerShadow: "Inner Shadow",
//		      BlurRadius: "Suddighetsradie",
//		      SpreadRadius: "Spridningsradie",

//		      Opacity: "Genomskinlighet",
//		      OpacityPlaceHolder: "Intervall: 0.0 - 1.0",
//		      ImageSource: "Bildkälla",
//		      ImageSize: "Bildstorlek",
//		      ImageSourcePlaceHolder: "Sökväg till bild",

//		      Content: "Innehåll",

//		      BrowserDefault: "Standardvärde",
//		      BorderSolid: "Heldragen",
//		      BorderDashed: "Streckad",
//		      BorderDotted: "Punkter",
//		      BorderGroove: "Nedsänkt",
//		      BorderDouble: "Dubbel heldragen",
//		      BorderInset: "Infälld",
//		      BorderOutset: "Utfälld",
//		      Repeat: "Repetera",
//		      RepeatHorizontally: "Repetera horisontellt",
//		      RepeatVertically: "Repetera vertikalt",
//		      DontRepeat: "Repetera ej",

//		      Contain: "Rym område",
//		      Cover: "Täck område",

//		      Misc: "Diverse",
//		      ItemSpacing: "Objektavstånd"
//		    },

//		    ComponentPluginNames: {
//		      Text: "Text",
//		      Link: "Länk",
//		      Menu: "Meny",
//		      Sharer: "Sharer",
//		      TableOfContents: "Tabellinnehåll",
//		      YouTube: "YouTube",
//		      RTF: "Formaterad text",
//		      RSS: "RSS",
//		      ArticleList: "Article List",
//		      Video: "Video"
//		    },

//		    Component: {
//		      Link: {
//		        Text: "Innehåll",
//		        Tooltip: "Tooltip",
//		        Url: "Url",
//		        Target: "Mål",

//		        TooltipPlaceHolder: "Beskrivande text",
//		        TextPlaceHolder: "Ange innehåll",
//		        UrlPlaceHolder: "Länk att navigera till vid klick"
//		      },
//		      YouTube: {
//		        VideoId: "Video Id",
//		        VideoIdPlaceHolder: "Video Id",
//		        AutoPlay: "Spela upp automatiskt",
//		        StartTime: "Starttid",
//		        LoopInfinitely: "Repetera",
//		        ShowControls: "Visa spelknappar",
//		        DisableKeyboard: "Inaktivera tangentbordsgenvägar",
//		        HideYouTubeBrand: "Dölj YouTube logga",
//		        ShowInfo: "Visa videoinfo"
//		      },
//		      TableOfContents: {
//		        Source: "Source"
//		      },
//		      RSS: {
//		        Url: "Url",
//		        ShowTitle: "Titel",
//		        ShowDescription: "Beskrivning",
//		        ShowStoryDescription: "Nyhetsbeskrivning",
//		        ShowStoryDate: "Nyhetsdatum",
//		        MaxStories: "Antal nyheter"
//		      }
//		    }
//		  }
//		});
//})(window.angular);