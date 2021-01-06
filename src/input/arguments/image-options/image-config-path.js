const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const errorText = require("../../../common/sub-input/error-text");


// Validates load image config path for map and conversion commands.
function validateLoadConfigPathString(loadFileStr, resObject)
{
	var stringTypeUsed = valuePrep.checkStringType(loadFileStr);
	var validationResult = false;
	
	if (stringTypeUsed === true)
	{
		validationResult = handleStringEntry(loadFileStr, resObject);
	}
	else
	{
		resObject.loadConfigPath = "";
		validationResult = true;
	}
	
	return validationResult;
}



function handleStringEntry(sFile, rObj)
{
	var preparedPath = valuePrep.sanitizeString(sFile);
	var handleRes = false;
	var invalidMessage = "";
	
	if (preparedPath.length >= 1 && preparedPath.length <= valueLimits.maxPathLength)
	{
		rObj.loadConfigPath = preparedPath;
		handleRes = true;
	}
	else if (preparedPath.length > valueLimits.maxPathLength)
	{
		handleRes = false;
		invalidMessage = errorText.writeStringTooLong("Load config file path", valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		rObj.loadConfigPath = "";
		handleRes = true;
	}
	
	return handleRes;
}



module.exports =
{
	validateLoadConfigPath: validateLoadConfigPathString
};