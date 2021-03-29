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
		// Read string.
		validationResult = handleStringEntry(loadFileStr, resObject);
	}
	else
	{
		// Use empty.
		resObject.loadConfigPath = "";
		validationResult = true;
	}
	
	return validationResult;
}



// Sanitize string and check length.
function handleStringEntry(sFile, rObj)
{
	var preparedPath = valuePrep.sanitizeString(sFile);
	var handleRes = false;
	var invalidMessage = "";
	
	if (preparedPath.length >= 1 && preparedPath.length <= valueLimits.maxPathLength)
	{
		// Safe length.
		rObj.loadConfigPath = preparedPath;
		handleRes = true;
	}
	else if (preparedPath.length > valueLimits.maxPathLength)
	{
		// Too long.
		handleRes = false;
		invalidMessage = errorText.writeStringTooLong("Load config file path", valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		// Empty.
		rObj.loadConfigPath = "";
		handleRes = true;
	}
	
	return handleRes;
}



module.exports =
{
	validateLoadConfigPath: validateLoadConfigPathString
};