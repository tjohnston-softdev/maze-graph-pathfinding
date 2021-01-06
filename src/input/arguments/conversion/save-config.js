const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const errorText = require("../../../common/sub-input/error-text");


// Validates image config save path for conversion commands.
function validateSaveConfigPathString(saveFileStr, resObject)
{
	var stringTypeUsed = valuePrep.checkStringType(saveFileStr);
	var validationResult = false;
	
	if (stringTypeUsed === true)
	{
		validationResult = handleStringEntry(saveFileStr, resObject);
	}
	else
	{
		resObject.saveConfigPath = "";
		validationResult = true;
	}
	
	return validationResult;
}



function handleStringEntry(sFileStr, rObject)
{
	var preparedPath = valuePrep.sanitizeString(sFileStr);
	var handleRes = false;
	var invalidMessage = "";
	
	if (preparedPath.length >= 1 && preparedPath.length <= valueLimits.maxPathLength)
	{
		rObject.saveConfigPath = preparedPath;
		handleRes = true;
	}
	else if (preparedPath.length > valueLimits.maxPathLength)
	{
		handleRes = false;
		invalidMessage = errorText.writeStringTooLong("Save config file path", valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		handleRes = true;
		rObject.saveConfigPath = "";
	}
	
	return handleRes;
}




module.exports =
{
	validateSaveConfigPath: validateSaveConfigPathString
};