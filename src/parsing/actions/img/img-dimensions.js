const parseObjects = require("../../../common/sub-parse/parse-objects");
const imageHelpTasks = require("../../../common/sub-parse/image-help-tasks");
const valueLimits = require("../../../common/value-limits");


// Validates input image file dimensions and entered origin coordinates.
function verifyImageDimensions(imgObject, imgSettings, dimensionCallback)
{
	var dimensionResults = parseObjects.defineLineOutcome();
	
	var imageDimensionsValid = callDimensionCheck(imgObject.bitmap.width, imgObject.bitmap.height, dimensionResults);
	var originCoordinatesValid = false;
	
	if (imageDimensionsValid === true)
	{
		originCoordinatesValid = callOriginCheck(imgSettings, imgObject.bitmap.width, imgObject.bitmap.height, dimensionResults);
	}
	
	if (originCoordinatesValid === true)
	{
		dimensionResults.valid = true;
	}
	
	
	
	if (dimensionResults.valid === true)
	{
		return dimensionCallback(null, true);
	}
	else
	{
		return dimensionCallback(new Error(dimensionResults.messageText), null);
	}
	
}


// Checks image dimensions.
function callDimensionCheck(pWidth, pHeight, dRes)
{
	var dValid = imageHelpTasks.checkImageDimensionsValid(pWidth, pHeight, valueLimits.minImageDimension, valueLimits.maxImageDimension, dRes);
	return dValid;
}



// Checks origin coordinates.
function callOriginCheck(setObj, pWidth, pHeight, dRes)
{
	var oValid = imageHelpTasks.checkOriginPointExists(setObj.originX, setObj.originY, pWidth, pHeight, dRes);
	return oValid;
}




module.exports =
{
	verifyDimensions: verifyImageDimensions
};