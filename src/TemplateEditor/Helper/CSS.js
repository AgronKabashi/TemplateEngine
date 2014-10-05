define(
	[
		"angular"
	],
	function (angular)
	{
		return angular
			.module("Cerberus.Tool.TemplateEditor.Helper.CSS", [])
			.service("Cerberus.Tool.TemplateEditor.Helper.CSS", function ()
			{
				//Creates a JSONP object from a CSS declaration
				this.FromCss = function (css)
				{
					var properties = css.split(";");
					var result = {};
					for (var i = 0; i < properties.length; i++)
					{
						var propertyName = properties[i].split(":", 1)[0];

						if (propertyName && properties[i].length > propertyName.length)
						{
							var propertyValue = properties[i].substring(propertyName.length + 1);
							//converts hyphenated properties into camelcaseproperties
							//	text-align => textAlign
							//	border-top-left-radius => borderTopLeftRadius
							propertyName = propertyName.toLowerCase().replace(/-([A-Z])/gi, function (v) { return v[1].toUpperCase(); });

							result[propertyName.trim()] = propertyValue.trim();
						}
					}

					//Special processing for background-image
					if (result["backgroundImage"] != null)
					{
						var backgroundImage = result["backgroundImage"];
						backgroundImage = backgroundImage.replace(/url\(/i, "");
						if (backgroundImage[backgroundImage.length - 1] == ')')
						{
							backgroundImage = backgroundImage.substr(0, backgroundImage.length - 1);
						}

						result["backgroundImage"] = backgroundImage;
					}

					//Special processing for box shadow
					if (result["boxShadow"] != null)
					{
						var boxShadowLayers = result["boxShadow"].trim().split(/,(?![^\(]*\))/);
						if (boxShadowLayers.length > 0)
						{
							var firstBoxShadow = boxShadowLayers[0];

							var color = firstBoxShadow.match(/^rgba?\([^\)]+\)/i) || firstBoxShadow.match(/^#[0-9a-f]+/i) || firstBoxShadow.match(/^[a-z]+/i);

							var valuesExclColors = firstBoxShadow
								.replace(/^rgba?\([^\)]+\)/i, "")	//strips rgb/rgba color data
								.replace(/^#[0-9a-f]+/i, "")		//strips hex color data
								.replace(/^[a-z]+/i, "")			//strips named color data (eg. red)
								.trim()
								.split(" ");

							result.boxShadow = {};
							result.boxShadow.color = color;
							result.boxShadow.hShadow = valuesExclColors[0] || "";
							result.boxShadow.vShadow = valuesExclColors[1] || "";
							result.boxShadow.blurRadius = valuesExclColors[2] || "";
							result.boxShadow.spreadRadius = valuesExclColors[3] || "";
							result.boxShadow.inset = valuesExclColors[4] && valuesExclColors[4].length > 0;
						}
					}

					//Special processing for text shadow
					if (result["textShadow"] != null)
					{
						var textShadowLayers = result["textShadow"].trim().split(/,(?![^\(]*\))/);
						if (textShadowLayers.length > 0)
						{
							var firstTextShadow = textShadowLayers[0];

							var color = firstTextShadow.match(/^rgba?\([^\)]+\)/i) || firstTextShadow.match(/^#[0-9a-f]+/i) || firstTextShadow.match(/^[a-z]+/i);

							var valuesExclColors = firstTextShadow
								.replace(/^rgba?\([^\)]+\)/i, "")	//strips rgb/rgba color data
								.replace(/^#[0-9a-f]+/i, "")		//strips hex color data
								.replace(/^[a-z]+/i, "")			//strips named color data (eg. red)
								.trim()
								.split(" ");

							result.textShadow = {};
							result.textShadow.color = color;
							result.textShadow.hShadow = valuesExclColors[0] || "";
							result.textShadow.vShadow = valuesExclColors[1] || "";
							result.textShadow.blurRadius = valuesExclColors[2] || "";
						}
					}

					//Special processing for transform
					if (result["transform"] || result["WebkitTransform"])
					{
						var transforms = (result["transform"] == "undefined" ? result["WebkitTransform"] : result["transform"]) || "";
						result.transform =
						{
							rotateZ: ""
						};

						if (transforms)
						{
							var rotateZ = transforms.match(/rotateZ\([^\)]+\)/i);
							if (rotateZ.length > 0)
							{
								result.transform.rotateZ = rotateZ[0].toLowerCase().replace("rotatez(", "").replace(")", "");
							}
						}
					}

					return result;
				};

				this.ToCss = function (value)
				{
					var result = [];

					var propertyName = "";
					var propertyValue = "";
					for (var i in value)
					{
						//Converts camelcase properties into hyphenated properties
						//textAlign => text-align
						//borderTopLeftRadius => border-top-left-radius
						propertyName = i.replace(/([A-Z])/g, "-$1").toLowerCase();

						propertyValue = "";

						//Custom preprocessing
						//TODO: Needs refactoring
						switch (propertyName)
						{
							case "box-shadow":
								var color = value[i]["color"];

								if (color)
								{
									propertyValue = String.format("{0} {1} {2} {3} {4} {5}",
										color,
										value[i]["hShadow"] || "0px",
										value[i]["vShadow"] || "0px",
										value[i]["blurRadius"] || "0px",
										value[i]["spreadRadius"] || "0px",
										~~value[i]["inset"] ? "inset" : "");
								}

								break;

							case "background-image":
								if (value[i].length > 0)
								{
									propertyValue = String.format("url({0})", value[i]);
								}
								break;

							case "text-shadow":
								var color = value[i]["color"];

								if (color)
								{
									propertyValue = String.format("{0} {1} {2} {3}",
										color,
										value[i]["hShadow"] || "0px",
										value[i]["vShadow"] || "0px",
										value[i]["blurRadius"] || "0px");
								}

								break;

							case "transform":
								if (value[i]["rotateZ"])
								{
									propertyValue = String.format("rotateZ({0})", value[i]["rotateZ"]);
									result.push(String.format("-webkit-transform:{0}", propertyValue));
								}
								break;

							case "-webkit-transform":
								if (value[i]["rotateZ"])
								{
									propertyValue = String.format("rotateZ({0})", value[i]["rotateZ"]);
									result.push(String.format("transform:{0}", propertyValue));
								}
								break;

							default:
								propertyValue = value[i];
								break;
						}

						if (propertyValue && propertyValue.length > 0)
						{
							result.push(String.format("{0}:{1}", propertyName, propertyValue));
						}
					}

					return result.join(";");
				};
			});
	});