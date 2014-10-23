/******************************************
Date manipulations
******************************************/
Date.prototype.ToWcf = function ()
{
	return '\/Date(' + this.getTime() + '-0000)\/';
};

/******************************************
String manipulations
******************************************/
String.format = function ()
{
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++)
	{
		var reg = new RegExp("\\{" + i + "\\}", "gm");
		s = s.replace(reg, arguments[i + 1]);
	}

	return s;
};

String.getPath = function (value)
{
	var index = value.lastIndexOf("/");
	return value.substring(0, Math.min(value.length, index + 1));
};

function tryParseInt(value)
{
	var result = parseInt(value);
	return isNaN(result) ? 0 : result;
}

/******************************************
Array manipulations
******************************************/
Array.prototype.RemoveValue = function (itemName, value)
{
	var index = -1;
	for (var i = 0; i < this.length; i++)
	{
		if (this[i][itemName] == value)
		{
			index = i;
			break;
		}
	}

	if (index >= 0)
	{
		this.splice(index, 1);
	}
};

/******************************************
JSON
******************************************/
JSON.tryParse = function (value, fallbackObject)
{
	var result;

	try
	{
		result = this.parse(value);
	}
	catch (e)
	{
		result = fallbackObject;
	}

	return result;
};

/*******************************
	Namespacing
*******************************/
function namespace(namespaceString)
{
	var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';

	for (var i = 0, length = parts.length; i < length; i++)
	{
		currentPart = parts[i];
		parent[currentPart] = parent[currentPart] || {};
		parent = parent[currentPart];
	}

	return parent;
};

//Utility for reading queryparameter values
(function ()
{
	var urlParams = {};
	var queryParameters = window.location.search.substring(1).split("&");
	for (var i = 0; i < queryParameters.length; i++)
	{
		var queryParameter = queryParameters[i].split("=");
		if (queryParameter.length != 2 || !queryParameter[0] || !queryParameter[1])
		{
			continue;
		}

		urlParams[queryParameter[0].toLocaleLowerCase()] = queryParameter[1].toString();
	}

	window.GetQueryParameter = function (queryParameterName)
	{
		return urlParams[queryParameterName.toLowerCase()];
	};
})();