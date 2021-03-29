const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const defaultValues = require("../../../common/sub-input/default-values");
const errorText = require("../../../common/sub-input/error-text");


// Validates entered output folder string for map and 'test-export' commands.
function validateOutputFolderPathString(folderStr, resObject)
{
	var stringTypeUsed = valuePrep.checkStringType(folderStr);
	var validationResult = false;
	
	if (stringTypeUsed === true)
	{
		// Read string.
		validationResult = handleStringEntry(folderStr, resObject);
	}
	else
	{
		// Use default.
		resObject.outputFolderPath = defaultValues.outputFolderPath;
		validationResult = true;
	}
	
	
	return validationResult;
}


// Coordinate validation.
function handleStringEntry(sFolder, rObj)
{
	var preparedPath = valuePrep.sanitizeString(sFolder);
	var handleSuccessful = false;
	var invalidMessage = "";
	
	if (preparedPath.length >= 1 && preparedPath.length <= valueLimits.maxPathLength)
	{
		// Length valid.
		rObj.outputFolderPath = preparedPath;
		handleSuccessful = true;
	}
	else if (preparedPath.length > valueLimits.maxPathLength)
	{
		// Too long.
		handleSuccessful = false;
		invalidMessage = errorText.writeStringTooLong("Output folder path", valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		// Empty - use default.
		rObj.outputFolderPath = defaultValues.outputFolderPath;
		handleSuccessful = true;
	}
	
	return handleSuccessful;
}




module.exports =
{
	validateOutputFolderPath: validateOutputFolderPathString
};