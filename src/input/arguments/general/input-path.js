const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const errorText = require("../../../common/sub-input/error-text");


// Validates entered input file path for map and conversion commands.
function validateInputFilePathString(fileStr, resObject)
{
	var preparedPath = preparePathString(fileStr);
	var safeLength = checkPathLength(preparedPath.length);
	
	var validationResult = false;
	
	if (safeLength === true)
	{
		resObject.inputFilePath = preparedPath;
		validationResult = true;
	}
	
	return validationResult;
}

// Validate and sanitize string.
function preparePathString(origStr)
{
	var stringTypeUsed = valuePrep.checkStringType(origStr);
	var prepRes = "";
	
	if (stringTypeUsed === true)
	{
		prepRes = valuePrep.sanitizeString(origStr);
	}
	
	return prepRes;
}



// Validate length.
function checkPathLength(pLength)
{
	var lengthRes = false;
	var lengthMessage = "";
	
	if (pLength >= 1 && pLength <= valueLimits.maxPathLength)
	{
		// Valid length.
		lengthRes = true;
	}
	else if (pLength > valueLimits.maxPathLength)
	{
		// Too long.
		lengthMessage = errorText.writeStringTooLong("Input file path", valueLimits.maxPathLength);
		exitProgram.callExit(lengthMessage);
	}
	else
	{
		// Empty.
		lengthMessage = errorText.writeMissing("Input file path");
		exitProgram.callExit(lengthMessage);
	}
	
	return lengthRes;
}






module.exports =
{
	validateInputFilePath: validateInputFilePathString
};