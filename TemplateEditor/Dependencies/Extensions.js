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
}

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
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}

/*******************************
****Get/Set Property Pattern****
	
	Usage:
		SomeFunction = function() { return PropertyPattern(arguments, "PropertyId"); }
		
	Creates a get/set for the specified property
	
	Passing in a parameter to SomeFunction will set the value for that property. Calling the method without any parameters
	will return the value for that property.
*******************************/
function PropertyPattern(args, propertyId)
{
	if (args.length > 0)
	{
		eval(propertyId + '=args[0]');
		return this;
	}

	return eval(propertyId);
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