const path = require("path");
const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const defaultValues = require("../../../common/sub-input/default-values");
const errorText = require("../../../common/sub-input/error-text");


// Validates output path for 'create-image-config' command.
function validateConfigWritePathString(writeStr, resObject)
{
	var preparedPath = preparePathString(writeStr);
	
	var validationResult = false;
	var invalidMessage = "";
	
	
	if (preparedPath.length >= 1 && preparedPath.length <= valueLimits.maxPathLength)
	{
		resObject.enteredTargetPath = preparedPath;
		validationResult = true;
	}
	else if (preparedPath.length > valueLimits.maxPathLength)
	{
		validationResult = false;
		invalidMessage = errorText.writeStringTooLong("Target file path", valueLimits.maxPathLength);
		exitProgram.callExit(invalidMessage);
	}
	else
	{
		resObject.enteredTargetPath = defaultValues.imageConfigPath;
		validationResult = true;
	}
	
	
	return validationResult;
}


// Parses entry into full file path.
function parseEnteredTargetPath(resObject)
{
	var absPath = path.resolve(resObject.enteredTargetPath);
	resObject.resolvedTargetPath = preparePathString(absPath);
}




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




module.exports =
{
	validateConfigPath: validateConfigWritePathString,
	parseEntry: parseEnteredTargetPath,
};