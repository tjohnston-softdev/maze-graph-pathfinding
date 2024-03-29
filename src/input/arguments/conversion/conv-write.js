const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const defaultValues = require("../../../common/sub-input/default-values");
const errorText = require("../../../common/sub-input/error-text");


// Validates entered output path for conversion commands.
function validateWriteFilePathString(writeStr, resObject, defaultPathString)
{
	var stringTypeUsed = valuePrep.checkStringType(writeStr);
	var validationResult = false;
	
	if (stringTypeUsed === true)
	{
		// Use string.
		validationResult = handleStringEntry(writeStr, resObject);
	}
	else
	{
		// Use default.
		resObject.writeFilePath = defaultPathString
		validationResult = true;
	}
	
	
	return validationResult;
}



// Validate path string.
function handleStringEntry(wStr, rObject, dPathStr)
{
	var preparedPath = valuePrep.sanitizeString(wStr);
	var handleSuccessful = false;
	var invalidMessage = "";
	
	if (preparedPath.length > 0 && preparedPath.length <= valueLimits.maxPathLength)
	{
		// Valid.
		rObject.writeFilePath = preparedPath;
		handleSuccessful = true;
	}
	else if (preparedPath.length > valueLimits.maxPathLength)
	{
		// Too long.
		handleSuccessful = false;
		invalidMessage = errorText.writeStringTooLong("Output file path", valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		// Empty - Use default.
		handleSuccessful = true;
		rObject.writeFilePath = dPathStr;
	}
	
	
	return handleSuccessful;
}



module.exports =
{
	validateWriteFilePath: validateWriteFilePathString
};