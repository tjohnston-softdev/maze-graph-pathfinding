const valuePrep = require("../../common/value-prep");


// Image options validation result.
function defineValidationResultObject()
{
	var defineRes = {};
	
	defineRes["overallValid"] = false;
	defineRes["errorMessage"] = "";
	
	return defineRes;
}


// Colour preperation result.
function defineColourResultObject()
{
	var defineRes = {};
	
	defineRes["wallRGB"] = {};
	defineRes["floorRGB"] = {};
	defineRes["successful"] = false;
	defineRes["errorMessage"] = "";
	
	return defineRes;
}



// Checks whether image config load path has been specified.
function decideConfigFileLoadRequired(entryItem)
{
	var stringUsed = valuePrep.checkStringType(entryItem);
	var requireOutcome = false;
	
	if (stringUsed === true && entryItem.length > 0)
	{
		requireOutcome = true;
	}
	
	return requireOutcome;
}


// Applies loaded image config properties to final arguments.
function applyExternalObjectProperties(entryInput, loadedConfig)
{
	var objectLoaded = valuePrep.checkObjectType(loadedConfig);
	
	if (objectLoaded === true)
	{
		useExternalValue(entryInput, loadedConfig, "wallColour", "wall");
		useExternalValue(entryInput, loadedConfig, "floorColour", "floor");
		useExternalValue(entryInput, loadedConfig, "tolerancePercent", "tolerance");
		useExternalValue(entryInput, loadedConfig, "tileSize", "tileSize");
		useExternalValue(entryInput, loadedConfig, "originX", "x");
		useExternalValue(entryInput, loadedConfig, "originY", "y");
	}
	
}


// Applies entered image config options to final arguments. This overrides values loaded from file.
function overrideInternalPropertyValues(entryInput, optObj)
{
	useInternalValue(entryInput, optObj.wall, "wallColour");
	useInternalValue(entryInput, optObj.floor, "floorColour");
	useInternalValue(entryInput, optObj.tolerance, "tolerancePercent");
	useInternalValue(entryInput, optObj.size, "tileSize");
	useInternalValue(entryInput, optObj.startX, "originX");
	useInternalValue(entryInput, optObj.startY, "originY");
}



// Reads loaded image config property.
function useExternalValue(entryObj, loadObj, internalName, externalName)
{
	var loadPropertyExists = valuePrep.checkPropertyExists(loadObj, externalName);
	
	if (loadPropertyExists === true)
	{
		entryObj[internalName] = loadObj[externalName];
	}
	
}



// Reads entered image config option.
function useInternalValue(entryObj, optValue, internalName)
{
	var stringTypeUsed = valuePrep.checkStringType(optValue); 
	
	if (stringTypeUsed === true && optValue.length > 0)
	{
		entryObj[internalName] = optValue;
	}
	
}




module.exports =
{
	defineValidationResult: defineValidationResultObject,
	defineColourResult: defineColourResultObject,
	decideLoadRequired: decideConfigFileLoadRequired,
	applyExternalProperties: applyExternalObjectProperties,
	overrideInternalProperties: overrideInternalPropertyValues
};