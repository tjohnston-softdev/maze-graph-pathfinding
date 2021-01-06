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
		validationResult = handleStringEntry(saveNameStr, resObject);
	}
	else
	{
		resObject.saveConfigName = "";
		validationResult = true;
	}
	
	return validationResult;
}



function handleStringEntry(sName, rObj)
{
	var preparedString = valuePrep.sanitizeString(sName);
	var validLength = checkFileNameLength(preparedString.length);
	
	var handleRes = false;
	
	if (validLength === true)
	{
		rObj.saveConfigName = preparedString;
		handleRes = true;
	}
	
	return handleRes;
}


function checkFileNameLength(lengthNum)
{
	var checkRes = false;
	var lengthMessage = "";
	
	if (lengthNum >= 0 && lengthNum <= valueLimits.maxFileNameLength)
	{
		checkRes = true;
	}
	else
	{
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