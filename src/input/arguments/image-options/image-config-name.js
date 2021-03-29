const valuePrep = require("../../../common/value-prep");
const exitProgram = require("../../../common/exit-program");
const valueLimits = require("../../../common/value-limits");
const defaultValues = require("../../../common/sub-input/default-values");
const errorText = require("../../../common/sub-input/error-text");


// Validates image config name for 'map-image'
function validateSaveConfigNameString(saveNameStr, resObject)
{
	var stringTypeUsed = valuePrep.checkStringType(saveNameStr);
	var validationResult = false;
	
	if (stringTypeUsed === true)
	{
		// Read string.
		validationResult = handleStringEntry(saveNameStr, resObject);
	}
	else
	{
		// Empty default.
		resObject.saveConfigName = "";
		validationResult = true;
	}
	
	return validationResult;
}



// Validate and sanitize string.
function handleStringEntry(sName, rObj)
{
	var preparedString = valuePrep.sanitizeString(sName);
	var validLength = checkFileNameLength(preparedString.length);
	
	var handleRes = false;
	
	if (validLength === true)
	{
		// Save
		rObj.saveConfigName = preparedString;
		handleRes = true;
	}
	
	return handleRes;
}


// Validate length.
function checkFileNameLength(lengthNum)
{
	var checkRes = false;
	var lengthMessage = "";
	
	if (lengthNum >= 0 && lengthNum <= valueLimits.maxFileNameLength)
	{
		// Valid length.
		checkRes = true;
	}
	else
	{
		// Too long.
		checkRes = false;
		lengthMessage = errorText.writeStringTooLong("Save Config file name", valueLimits.maxFileNameLength);
		exitProgram.callExit(lengthMessage);
	}
	
	return checkRes;
}




module.exports =
{
	validateSaveConfigName: validateSaveConfigNameString
};